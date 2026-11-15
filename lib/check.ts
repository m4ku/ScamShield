import "server-only";

import { AiBusyError, getAiProvider } from "./ai";
import { buildSystemPrompt, buildUserText } from "./ai/prompt";
import { FEATURES } from "./content/features";
import { fill } from "./content/site";
import { isBlankImage } from "./image-check";
import { checkLinks } from "./links";
import {
  MODEL_RESULT_JSON_SCHEMA,
  ModelResultSchema,
  type CheckErrorCode,
  type CheckRequest,
  type CheckResult,
} from "./schema";
import { computeVerdict, verifySigns } from "./verdict";

export class CheckError extends Error {
  constructor(public code: CheckErrorCode) {
    super(code);
    this.name = "CheckError";
  }
}

/** Runs one check. Nothing is stored or logged. */
export async function checkMessage(req: CheckRequest): Promise<CheckResult> {
  if (req.mode === "image" && (await isBlankImage(req.image.base64))) throw new CheckError("unreadable");

  const provider = getAiProvider();
  const text = req.mode === "image" ? undefined : req.text;

  let raw: unknown;
  try {
    raw = await provider.generateJson({
      systemPrompt: buildSystemPrompt(req.language),
      userText: buildUserText(req.mode, req.language, text),
      image: req.mode === "image" ? req.image : undefined,
      jsonSchema: MODEL_RESULT_JSON_SCHEMA,
    });
  } catch (err) {
    if (err instanceof AiBusyError) throw new CheckError("busy");
    throw err;
  }

  const parsed = ModelResultSchema.safeParse(raw);
  if (!parsed.success) throw new CheckError("failed");
  const result = parsed.data;

  if (req.mode === "image" && (!result.readable || !result.messageText.trim())) {
    throw new CheckError("unreadable");
  }

  // For text and calls we check quotes against what the user gave us.
  // For images, the only text we have is the model's transcription.
  const message = req.mode === "image" ? result.messageText.trim() : req.text;
  const signs = verifySigns(message, result.signs);

  // Link check in code: if the model missed a look-alike or shortened link, add it ourselves.
  if (!signs.some((s) => s.type === "suspicious_link")) {
    const [finding] = checkLinks(message);
    if (finding) {
      const f = FEATURES[req.language].link;
      const explanation = finding.kind === "lookalike" ? fill(f.lookalike, { brand: finding.brand ?? "" }) : f.shortener;
      signs.push(...verifySigns(message, [{ type: "suspicious_link", quote: finding.text, explanation }]));
    }
  }

  return {
    verdict: computeVerdict(signs, result.asksForMoneyOrInfo),
    message,
    signs,
    asksForMoneyOrInfo: result.asksForMoneyOrInfo,
    summary: result.summary.trim(),
  };
}
