import { z } from "zod";

/** The fixed list of warning signs. The model must pick from these, so results stay consistent. */
export const SIGN_TYPES = [
  "urgency",
  "threat",
  "unusual_payment",
  "secrets",
  "suspicious_link",
  "impersonation",
  "too_good",
  "secrecy",
  "remote_access",
  "mismatch",
  "unexpected_contact",
] as const;

export type SignType = (typeof SIGN_TYPES)[number];

/** Signs that make a message "very likely a scam" on their own. */
export const CRITICAL_SIGNS: ReadonlySet<SignType> = new Set([
  "unusual_payment",
  "threat",
  "secrets",
  "remote_access",
]);

export const LANGUAGES = ["en", "es", "zh", "vi", "tl", "hi", "fr"] as const;
export type Language = (typeof LANGUAGES)[number];

export const INPUT_MODES = ["text", "image", "call"] as const;
export type InputMode = (typeof INPUT_MODES)[number];

export const MAX_TEXT_CHARS = 5000;
/** Base64 length limit (~3 MB of image). The browser shrinks photos before sending. */
export const MAX_IMAGE_BASE64 = 4_000_000;
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

/** What the browser sends to POST /api/check. */
export const CheckRequestSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("text"),
    language: z.enum(LANGUAGES),
    text: z.string().trim().min(1).max(MAX_TEXT_CHARS),
  }),
  z.object({
    mode: z.literal("call"),
    language: z.enum(LANGUAGES),
    text: z.string().trim().min(1).max(MAX_TEXT_CHARS),
  }),
  z.object({
    mode: z.literal("image"),
    language: z.enum(LANGUAGES),
    image: z.object({
      mimeType: z.enum(IMAGE_TYPES),
      base64: z.string().min(1).max(MAX_IMAGE_BASE64),
    }),
  }),
]);
export type CheckRequest = z.infer<typeof CheckRequestSchema>;

/** What the model must return. Validated before anything reaches the screen. */
export const ModelResultSchema = z.object({
  readable: z.boolean(),
  messageText: z.string(),
  signs: z
    .array(
      z.object({
        type: z.enum(SIGN_TYPES),
        quote: z.string(),
        explanation: z.string(),
      }),
    )
    .max(12),
  asksForMoneyOrInfo: z.boolean(),
  summary: z.string(),
});
export type ModelResult = z.infer<typeof ModelResultSchema>;

/** The same shape as plain JSON Schema, sent to the model so its reply always parses. */
export const MODEL_RESULT_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: {
    readable: {
      type: "boolean",
      description: "False if the image is unreadable or is not a message, letter, email, call or similar.",
    },
    messageText: {
      type: "string",
      description:
        "For an image: the exact words of the message, transcribed. For text or a call description: an empty string.",
    },
    signs: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: [...SIGN_TYPES] },
          quote: {
            type: "string",
            description: "The exact words copied from the message that show this sign. Short: 2 to 15 words.",
          },
          explanation: {
            type: "string",
            description: "One or two short sentences in the user's language explaining why this is a warning sign here.",
          },
        },
        required: ["type", "quote", "explanation"],
      },
    },
    asksForMoneyOrInfo: {
      type: "boolean",
      description: "True if the message asks the reader to pay, send money, or share personal or account details.",
    },
    summary: {
      type: "string",
      description: "One short sentence in the user's language saying what the message wants the reader to do.",
    },
  },
  required: ["readable", "messageText", "signs", "asksForMoneyOrInfo", "summary"],
};

export type Verdict = "likely_scam" | "careful" | "no_signs";

export type Sign = {
  type: SignType;
  quote: string;
  explanation: string;
  /** Where the quote sits in `message`, for highlighting. Null if it couldn't be placed. */
  start: number | null;
  end: number | null;
};

/** What POST /api/check returns on success. */
export type CheckResult = {
  verdict: Verdict;
  /** The message as shown back to the user (pasted text, call description, or the transcribed image). */
  message: string;
  signs: Sign[];
  asksForMoneyOrInfo: boolean;
  summary: string;
};

export type CheckErrorCode = "bad_input" | "unreadable" | "busy" | "failed";

/* ---------- Follow-up questions after a check ---------- */

export const MAX_FOLLOWUPS = 5;
export const MAX_QUESTION_CHARS = 500;
const VERDICTS = ["likely_scam", "careful", "no_signs"] as const;

/** What the browser sends to POST /api/followup. Nothing here is stored. */
export const FollowupRequestSchema = z.object({
  language: z.enum(LANGUAGES),
  check: z.object({
    verdict: z.enum(VERDICTS),
    message: z.string().max(MAX_TEXT_CHARS * 2),
    summary: z.string().max(1000),
    signs: z.array(z.object({ type: z.enum(SIGN_TYPES), quote: z.string().max(500) })).max(12),
  }),
  history: z
    .array(z.object({ q: z.string().max(MAX_QUESTION_CHARS), a: z.string().max(4000) }))
    .max(MAX_FOLLOWUPS - 1),
  question: z.string().trim().min(1).max(MAX_QUESTION_CHARS),
});
export type FollowupRequest = z.infer<typeof FollowupRequestSchema>;

export const FollowupModelSchema = z.object({
  answer: z.string(),
  steps: z.array(z.string()).max(8),
});
export type FollowupAnswer = z.infer<typeof FollowupModelSchema>;

export const FOLLOWUP_JSON_SCHEMA: Record<string, unknown> = {
  type: "object",
  properties: {
    answer: { type: "string", description: "1 to 3 short sentences that answer the question directly." },
    steps: {
      type: "array",
      items: { type: "string" },
      description: "0 to 6 short action steps in order. Empty when there is nothing to do.",
    },
  },
  required: ["answer", "steps"],
};
