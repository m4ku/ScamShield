import { describe, expect, it } from "vitest";

import { CheckRequestSchema, MAX_TEXT_CHARS, ModelResultSchema } from "../../lib/schema";

describe("CheckRequestSchema: what the browser may send", () => {
  const ok = (body: unknown) => CheckRequestSchema.safeParse(body).success;

  it("accepts a normal text check in each language", () => {
    for (const language of ["en", "es", "zh", "vi", "tl", "hi", "fr"]) {
      expect(ok({ mode: "text", language, text: "hello" })).toBe(true);
    }
  });

  it("accepts a call description and an image", () => {
    expect(ok({ mode: "call", language: "en", text: "A man called" })).toBe(true);
    expect(ok({ mode: "image", language: "en", image: { mimeType: "image/jpeg", base64: "abcd" } })).toBe(true);
  });

  it("rejects empty or whitespace-only text", () => {
    expect(ok({ mode: "text", language: "en", text: "" })).toBe(false);
    expect(ok({ mode: "text", language: "en", text: "   \n " })).toBe(false);
  });

  it(`accepts exactly ${MAX_TEXT_CHARS} characters and rejects one more`, () => {
    expect(ok({ mode: "text", language: "en", text: "a".repeat(MAX_TEXT_CHARS) })).toBe(true);
    expect(ok({ mode: "text", language: "en", text: "a".repeat(MAX_TEXT_CHARS + 1) })).toBe(false);
  });

  it("rejects unknown languages and modes", () => {
    expect(ok({ mode: "text", language: "de", text: "hallo" })).toBe(false);
    expect(ok({ mode: "video", language: "en", text: "hi" })).toBe(false);
  });

  it("rejects an image mode without an image, or with an unsupported type", () => {
    expect(ok({ mode: "image", language: "en" })).toBe(false);
    expect(ok({ mode: "image", language: "en", image: { mimeType: "image/gif", base64: "abcd" } })).toBe(false);
  });

  it("drops extra fields, so a client can't send its own verdict", () => {
    const parsed = CheckRequestSchema.parse({ mode: "text", language: "en", text: "hi", verdict: "no_signs" });
    expect(parsed).not.toHaveProperty("verdict");
  });
});

describe("ModelResultSchema: what the model must return", () => {
  const good = {
    readable: true,
    messageText: "",
    signs: [{ type: "urgency", quote: "today", explanation: "Rushes you." }],
    asksForMoneyOrInfo: true,
    summary: "It wants you to pay.",
  };

  it("accepts a well-formed reply", () => {
    expect(ModelResultSchema.safeParse(good).success).toBe(true);
  });

  it("rejects a sign type outside the fixed list", () => {
    const bad = { ...good, signs: [{ type: "is_safe", quote: "x", explanation: "y" }] };
    expect(ModelResultSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a reply that tries to set the verdict itself", () => {
    const parsed = ModelResultSchema.parse({ ...good, verdict: "no_signs" });
    expect(parsed).not.toHaveProperty("verdict");
  });

  it("rejects missing fields", () => {
    const rest: Partial<typeof good> = { ...good };
    delete rest.summary;
    expect(ModelResultSchema.safeParse(rest).success).toBe(false);
  });
});
