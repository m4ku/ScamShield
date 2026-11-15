import { CRITICAL_SIGNS, type ModelResult, type Sign, type Verdict } from "./schema";

/**
 * The verdict is decided here, from the signs found, never by the model.
 * - Likely scam: 2+ distinct sign types, or any critical sign.
 * - Be careful: 1 sign, or no signs but the message asks for money or details.
 * - Otherwise: no common warning signs found. (We never say "safe".)
 */
export function computeVerdict(signs: Pick<Sign, "type">[], asksForMoneyOrInfo: boolean): Verdict {
  const types = new Set(signs.map((s) => s.type));
  if (types.size >= 2 || [...types].some((t) => CRITICAL_SIGNS.has(t))) return "likely_scam";
  if (types.size === 1 || asksForMoneyOrInfo) return "careful";
  return "no_signs";
}

/** Characters treated as equal when matching quotes (smart quotes, dashes, odd spaces). */
const CHAR_MAP: Record<string, string> = {
  "‘": "'",
  "’": "'",
  "“": '"',
  "”": '"',
  "–": "-",
  "—": "-",
  " ": " ",
};

/**
 * Lowercases, unifies look-alike characters and collapses whitespace,
 * keeping a map from each normalized character back to its index in the original.
 */
function normalizeWithMap(text: string): { norm: string; map: number[] } {
  let norm = "";
  const map: number[] = [];
  let lastWasSpace = true; // trims leading whitespace
  for (let i = 0; i < text.length; i++) {
    let ch = CHAR_MAP[text[i]] ?? text[i];
    if (/\s/.test(ch)) {
      if (lastWasSpace) continue;
      ch = " ";
      lastWasSpace = true;
    } else {
      lastWasSpace = false;
    }
    const lower = ch.toLowerCase();
    // toLowerCase can change length for a few characters; keep one-to-one mapping.
    norm += lower.length === 1 ? lower : ch;
    map.push(i);
  }
  if (norm.endsWith(" ")) {
    norm = norm.slice(0, -1);
    map.pop();
  }
  return { norm, map };
}

function stripEdgePunctuation(s: string): string {
  return s.replace(/^[\s"'“”‘’.,…:;!?()\[\]-]+|[\s"'“”‘’.,…:;!?()\[\]-]+$/g, "");
}

/**
 * Drops any sign whose quote isn't really in the message (stops made-up evidence),
 * and records where each kept quote sits so the screen can highlight it.
 */
export function verifySigns(message: string, signs: ModelResult["signs"]): Sign[] {
  const { norm: hay, map } = normalizeWithMap(message);
  const kept: Sign[] = [];
  const seen = new Set<string>();

  for (const sign of signs) {
    const needle = normalizeWithMap(stripEdgePunctuation(sign.quote)).norm;
    if (needle.length < 2) continue;
    const at = hay.indexOf(needle);
    if (at === -1) continue;

    const key = `${sign.type}:${at}`;
    if (seen.has(key)) continue;
    seen.add(key);

    kept.push({
      type: sign.type,
      quote: sign.quote.trim(),
      explanation: sign.explanation.trim(),
      start: map[at],
      end: map[at + needle.length - 1] + 1,
    });
  }
  return kept;
}
