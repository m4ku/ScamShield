// Measures the iOS app's offline (on-device) checks with the same AI test cases as the website.
//
//   node scripts/ios-eval.mjs prepare /tmp/cases.json
//   SIMCTL_CHILD_SCAMSHIELD_EVAL_IN=/tmp/cases.json SIMCTL_CHILD_SCAMSHIELD_EVAL_OUT=/tmp/results.json \
//     xcrun simctl launch --terminate-running-process booted app.scamshield.ScamShield   (debug build)
//   node scripts/ios-eval.mjs score /tmp/cases.json /tmp/results.json
//
// Needs a simulator or iPhone with Apple Intelligence (iOS 26+). Text and call cases only.

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [cmd, casesPath, resultsPath] = process.argv.slice(2);
const root = join(import.meta.dirname, "..");

if (cmd === "prepare") {
  const all = readdirSync(join(root, "tests/ai")).flatMap((f) => JSON.parse(readFileSync(join(root, "tests/ai", f), "utf8")));
  const cases = all
    .filter((c) => c.text && (c.mode === "text" || c.mode === "call") && !c.endpoint)
    .map((c) => ({
      id: c.id,
      mode: c.mode,
      language: c.language,
      text: c.textRepeat ? c.text.repeat(c.textRepeat) : c.text,
      expect: c.expect,
      mustHave: c.mustHave ?? [],
      mustNotHave: c.mustNotHave ?? [],
    }));
  writeFileSync(casesPath, JSON.stringify(cases));
  console.log(`Wrote ${cases.length} cases to ${casesPath}`);
} else if (cmd === "score") {
  const cases = new Map(JSON.parse(readFileSync(casesPath, "utf8")).map((c) => [c.id, c]));
  const results = JSON.parse(readFileSync(resultsPath, "utf8"));
  let pass = 0;
  let errors = 0;
  let scams = 0;
  let warned = 0;
  let ordinary = 0;
  let calm = 0;
  const fails = [];
  for (const r of results) {
    const c = cases.get(r.id);
    if (!c.expect.includes("no_signs")) scams += 1;
    if (r.id.startsWith("legit") || r.id.endsWith("-legit")) ordinary += 1;
    if (r.error) {
      errors += 1;
      fails.push(`${r.id}: error ${r.error} ${r.detail ?? ""}`);
      continue;
    }
    if (!c.expect.includes("no_signs") && r.verdict !== "no_signs") warned += 1;
    if ((r.id.startsWith("legit") || r.id.endsWith("-legit")) && r.verdict !== "likely_scam") calm += 1;
    const problems = [];
    if (!c.expect.includes(r.verdict)) problems.push(`got ${r.verdict}, expected ${c.expect.join(" or ")}`);
    for (const t of c.mustHave) if (!r.signs.includes(t)) problems.push(`missing ${t}`);
    for (const t of c.mustNotHave) if (r.signs.includes(t)) problems.push(`unwanted ${t}`);
    if (problems.length) fails.push(`${r.id}: ${problems.join("; ")}`);
    else pass += 1;
  }
  const secs = results.reduce((a, r) => a + (r.seconds ?? 0), 0) / results.length;
  console.log(`Strict pass: ${pass}/${results.length} (errors: ${errors})`);
  console.log(`Scam cases that got a warning: ${warned}/${scams}`);
  console.log(`Ordinary messages not called "Very likely a scam": ${calm}/${ordinary}`);
  console.log(`Average time per check: ${secs.toFixed(1)}s`);
  if (fails.length) console.log("\n" + fails.join("\n"));
} else {
  console.log("usage: node scripts/ios-eval.mjs prepare <cases.json> | score <cases.json> <results.json>");
}
