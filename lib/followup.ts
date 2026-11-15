import "server-only";

import { AiBusyError, getAiProvider } from "./ai";
import { buildFollowupSystemPrompt, buildFollowupUserText } from "./ai/followup-prompt";
import { CheckError } from "./check";
import { STRINGS } from "./i18n";
import { contactsIn } from "./links";
import { FOLLOWUP_JSON_SCHEMA, FollowupModelSchema, type FollowupAnswer, type FollowupRequest } from "./schema";

/** Phrases that would mean the answer calls the message safe or real, per language. */
const SAYS_SAFE: RegExp[] = [
  /\b(this|the|it)\s(message|text|email|call|letter)?\s?(is|looks|seems)\s(safe|legitimate|genuine|real|fine)\b/gi,
  /\b(es|parece)\s(seguro|legítimo|real)\b/gi,
  /(这条|该)(短信|信息|消息|邮件)(是|确实是)(安全|真|合法)的/g,
  /(là an toàn|là thật|là hợp pháp)/gi,
  /(ligtas ito|totoo ito)/gi,
  /(यह|ये|वह)\s(संदेश|मैसेज)\s(पूरी तरह\s)?(सुरक्षित|असली)\sहै(?!\sया\sनहीं)/g,
  /\b(est|semble)\s(sûr|fiable|légitime|authentique)\b/gi,
];

/**
 * Words just before a match that make it a denial or a report, not a claim:
 * "doesn't mean the message is real", "can't confirm it is safe", "they said it was real".
 */
const HEDGE =
  /\b(not|n't|never|no|cannot|mean|means|prove|proves|whether|if|confirm|sure|know|say|says|said|claim|claims|believe|think|pretend|pretends|seem to)\b|不能|无法|不|không|hindi|नहीं|ne\s|pas\b|no\s|sin\b/i;

function callsItSafe(text: string): boolean {
  return SAYS_SAFE.some((re) => {
    for (const m of text.matchAll(re)) {
      const before = text.slice(Math.max(0, (m.index ?? 0) - 40), m.index);
      if (!HEDGE.test(before)) return true;
    }
    return false;
  });
}

/** Answers one follow-up question about a checked message. Nothing is stored or logged. */
export async function answerFollowup(req: FollowupRequest): Promise<FollowupAnswer> {
  let raw: unknown;
  try {
    raw = await getAiProvider().generateJson({
      systemPrompt: buildFollowupSystemPrompt(req),
      userText: buildFollowupUserText(req),
      jsonSchema: FOLLOWUP_JSON_SCHEMA,
    });
  } catch (err) {
    if (err instanceof AiBusyError) throw new CheckError("busy");
    throw err;
  }

  const parsed = FollowupModelSchema.safeParse(raw);
  if (!parsed.success) throw new CheckError("failed");

  const t = STRINGS[req.language];
  let answer = parsed.data.answer.trim();
  let steps = parsed.data.steps.map((s) => s.trim()).filter(Boolean).slice(0, 6);

  // Guard 1: never call the message safe. Replace with the fixed, safe wording.
  if (callsItSafe([answer, ...steps].join(" "))) {
    answer = `${t.verdicts[req.check.verdict].sub} ${t.trustedStep}`;
    steps = [];
  }

  // Guard 2: never repeat a link or phone number from the scam message.
  const contacts = contactsIn(req.check.message);
  const scrub = (s: string) => contacts.reduce((acc, c) => acc.split(c).join("•••"), s);
  answer = scrub(answer);
  steps = steps.map(scrub);

  return { answer, steps };
}
