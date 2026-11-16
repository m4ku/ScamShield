// Runs the AI test kit (tests/ai/*.json) against a running app.
//
// Usage:
//   node scripts/check-fixtures.mjs                       all sections, http://localhost:3000
//   node scripts/check-fixtures.mjs --base https://checkscamshield.vercel.app
//   node scripts/check-fixtures.mjs --only signs,legit    some sections (or id prefixes, e.g. signs-threat)
//   node scripts/check-fixtures.mjs --repeat 3 --only core   run each case 3 times to check consistency
//   node scripts/check-fixtures.mjs --delay 6000          pause between calls (free tier: keep >= 4000)
//
// Writes the full responses to tests/results/latest.json for review.
// Each AI case uses one model call; a full run is about 115 calls (the free tier allows about 1,000 a day).

import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";

const args = process.argv.slice(2);
function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
}
const base = flag("base", args[0] && !args[0].startsWith("--") ? args[0] : "http://localhost:3000");
const only = flag("only", "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const delay = Number(flag("delay", "4000"));
const repeat = Math.max(1, Number(flag("repeat", "1")));

const root = new URL("../", import.meta.url);
const aiDir = new URL("tests/ai/", root);
const imgDir = new URL("tests/fixtures/", root);

const ORDER = ["core", "signs", "legit", "tricky", "languages", "injection", "calls", "images", "followup", "api"];
const files = (await readdir(aiDir)).filter((f) => f.endsWith(".json"));
files.sort((a, b) => ORDER.indexOf(a.replace(".json", "")) - ORDER.indexOf(b.replace(".json", "")));

let cases = [];
for (const f of files) {
  const section = f.replace(".json", "");
  const list = JSON.parse(await readFile(new URL(f, aiDir), "utf8"));
  cases.push(...list.map((c) => ({ ...c, section })));
}
if (only.length) cases = cases.filter((c) => only.some((o) => c.section === o || c.id.startsWith(o)));

// Words that would mean the app called a message safe or real, per answer language.
const SAFE_WORDS = {
  // Only the app calling THIS message safe or real counts; describing a scammer's claim
  // ("instructions to say the message is safe", "make you believe it's real") does not.
  en: /(?<!\b(say|says|said|claim|claims|believe|think|confirm|know|sure|if|whether|not|mean|means)\s(that\s)?)\b(this|the)\s(message|text|email|call|letter)\s(is|looks|seems|appears)\s(safe|legitimate|genuine|real)\b/i,
  es: /(?<!(diga|dice|decir|creer|crea)\s(que\s)?)\b(este|el)\s(mensaje|texto|correo)\s(es|parece)\s(seguro|legítimo|real|verdadero)\b/i,
  zh: /(?<!(说|让你相信|相信|声称))(这条|该)(短信|信息|消息|邮件)(是|看起来是)(安全|真实|合法|正规)的/,
  vi: /(?<!(nói|tin|tưởng)\s)(tin nhắn|thư) (này )?(là|có vẻ) (an toàn|thật|hợp pháp)/i,
  tl: /(?<!(sabihin|sinasabi|maniwala)\s(na\s)?)(ligtas|totoo) ang (mensahe|text)/i,
  hi: /(यह संदेश|यह मैसेज) (सुरक्षित|असली|सही) है/,
  fr: /(?<!(dire|dit|croire)\s(que\s)?)\b(ce|le)\s(message|sms|courriel|e-mail)\s(est|semble)\s(sûr|fiable|légitime|authentique|vrai)\b/i,
};
// Rough checks that explanations are written in the chosen language.
const LANG_HINT = {
  en: /\b(the|you|your|to|and|is|this)\b/i,
  es: /\b(el|la|los|las|que|de|su|para|una?|le|este)\b/i,
  zh: /[一-鿿]/,
  vi: /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i,
  tl: /\b(ang|ng|sa|mo|ka|ito|na|mga|hindi)\b/i,
  hi: /[ऀ-ॿ]/,
  fr: /\b(le|la|les|vous|votre|de|des|est|un|une|pour)\b/i,
};

function buildRequest(c) {
  if (c.rawBody !== undefined) return c.rawBody;
  let body;
  if (c.body) {
    body = { ...c.body };
    if (c.textRepeat) {
      const [chunk, times, cut] = c.textRepeat;
      body.text = chunk.repeat(times).slice(0, cut ?? undefined);
    }
  } else {
    body = { mode: c.mode, language: c.language };
    if (c.text !== undefined) body.text = c.text;
  }
  return body;
}

async function send(c) {
  let body = buildRequest(c);
  if (typeof body !== "string" && c.image) {
    const b64 = (await readFile(new URL(c.image, imgDir))).toString("base64");
    body = { ...body, image: { mimeType: "image/png", base64: b64 } };
  }
  const res = await fetch(`${base}/api/${c.endpoint ?? "check"}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({ error: "not_json" }));
  return { ok: res.ok, status: res.status, data };
}

function checkFollowup(c, r) {
  const problems = [];
  const outcome = r.ok ? "answered" : `error:${r.data.error}`;
  if (!c.expect.includes(outcome)) problems.push(`got ${outcome}, expected ${c.expect.join(" or ")}`);
  if (!r.ok) return { outcome, problems };
  const lang = c.body.language;
  const written = [r.data.answer, ...r.data.steps].join(" ");
  if (SAFE_WORDS[lang]?.test(written)) problems.push(`says the message is safe/real: "${written.match(SAFE_WORDS[lang])[0]}"`);
  if (LANG_HINT[lang] && !LANG_HINT[lang].test(written)) problems.push(`answer may not be in "${lang}"`);
  for (const s of c.mustNotContain ?? []) if (written.includes(s)) problems.push(`answer contains "${s}"`);
  if (c.minSteps && r.data.steps.length < c.minSteps) problems.push(`only ${r.data.steps.length} steps`);
  if (c.maxSummaryChars && written.length > c.maxSummaryChars) problems.push(`answer too long (${written.length} chars)`);
  return { outcome, problems };
}

function check(c, r) {
  if (c.endpoint === "followup") return checkFollowup(c, r);
  const problems = [];
  const outcome = r.ok ? r.data.verdict : `error:${r.data.error}`;
  if (!c.expect.includes(outcome)) problems.push(`got ${outcome}, expected ${c.expect.join(" or ")}`);
  if (!r.ok) return { outcome, problems };

  const d = r.data;
  const types = d.signs.map((s) => s.type);
  for (const t of c.mustHave ?? []) if (!types.includes(t)) problems.push(`missing sign "${t}"`);
  for (const t of c.mustNotHave ?? []) if (types.includes(t)) problems.push(`unwanted sign "${t}"`);

  // Every highlight must point at real text in the message shown back.
  for (const s of d.signs) {
    if (s.start === null || s.end === null || s.start < 0 || s.end > d.message.length || s.end <= s.start) {
      problems.push(`sign "${s.type}" has bad position`);
    }
  }

  const lang = c.language ?? c.body?.language ?? "en";
  const written = [d.summary, ...d.signs.map((s) => s.explanation)].join(" ");
  if (SAFE_WORDS[lang]?.test(written)) problems.push(`says the message is safe/real: "${written.match(SAFE_WORDS[lang])[0]}"`);
  if (written.trim() && LANG_HINT[lang] && !LANG_HINT[lang].test(written)) problems.push(`explanations may not be in "${lang}"`);
  for (const s of c.mustNotContain ?? []) if (JSON.stringify(d).includes(s)) problems.push(`output contains "${s}"`);
  if (c.maxSummaryChars && d.summary.length > c.maxSummaryChars) problems.push(`summary too long (${d.summary.length} chars)`);

  return { outcome, problems };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = [];
const bySection = {};
let failed = 0;
let flaky = 0;
const usesAi = (c) => !(c.section === "api" && c.expect.every((e) => e === "error:bad_input"));

console.log(`Running ${cases.length} cases × ${repeat} against ${base}\n`);

for (const c of cases) {
  const runs = [];
  for (let i = 0; i < repeat; i++) {
    let r = await send(c);
    if (!r.ok && r.data.error === "busy") {
      process.stdout.write("  (rate limited, waiting 30s)\n");
      await sleep(30000);
      r = await send(c);
    }
    runs.push({ r, ...check(c, r) });
    if (usesAi(c)) await sleep(delay);
  }

  const outcomes = [...new Set(runs.map((x) => x.outcome))];
  const problems = [...new Set(runs.flatMap((x) => x.problems))];
  const inconsistent = outcomes.length > 1;
  if (inconsistent) flaky++;
  const ok = problems.length === 0;
  if (!ok) failed++;

  const s = (bySection[c.section] ??= { pass: 0, total: 0 });
  s.total++;
  if (ok) s.pass++;

  const last = runs.at(-1).r;
  const signs = !last.ok ? "-" : c.endpoint === "followup" ? `${last.data.steps.length} steps` : last.data.signs.map((x) => x.type).join(", ") || "none";
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${c.id.padEnd(22)} ${outcomes.join(" / ").padEnd(16)} signs: ${signs}${inconsistent ? "  [INCONSISTENT]" : ""}`,
  );
  for (const p of problems) console.log(`        - ${p}`);
  if (!ok && last.ok && (last.data.summary || last.data.answer)) console.log(`        ${c.endpoint === "followup" ? "answer" : "summary"}: ${last.data.summary ?? last.data.answer}`);

  report.push({ id: c.id, section: c.section, ok, outcomes, problems, note: c.note, response: last.data });
}

console.log("\nBy section:");
for (const [sec, s] of Object.entries(bySection)) console.log(`  ${sec.padEnd(10)} ${s.pass}/${s.total}`);
console.log(`\n${cases.length - failed}/${cases.length} passed${repeat > 1 ? `, ${flaky} inconsistent across ${repeat} runs` : ""}`);

const outDir = new URL("tests/results/", root);
await mkdir(outDir, { recursive: true });
await writeFile(
  new URL("latest.json", outDir),
  JSON.stringify({ base, ranAt: new Date().toISOString(), repeat, results: report }, null, 2),
);
console.log("Full responses: tests/results/latest.json");
process.exit(failed ? 1 : 0);
