import { describe, expect, it } from "vitest";

import { CRITICAL_SIGNS, SIGN_TYPES, type SignType } from "../../lib/schema";
import { computeVerdict, verifySigns } from "../../lib/verdict";

const s = (...types: SignType[]) => types.map((type) => ({ type }));
const NON_CRITICAL = SIGN_TYPES.filter((t) => !CRITICAL_SIGNS.has(t));
const CRITICAL = SIGN_TYPES.filter((t) => CRITICAL_SIGNS.has(t));

describe("computeVerdict: the rule lives in code, not the model", () => {
  it("no signs and no request → no common signs (never 'safe')", () => {
    expect(computeVerdict([], false)).toBe("no_signs");
  });

  it("no signs but asks for money or details → be careful", () => {
    expect(computeVerdict([], true)).toBe("careful");
  });

  it.each(NON_CRITICAL)("one non-critical sign (%s) → be careful", (t) => {
    expect(computeVerdict(s(t), false)).toBe("careful");
    expect(computeVerdict(s(t), true)).toBe("careful");
  });

  it.each(CRITICAL)("one critical sign (%s) → likely scam", (t) => {
    expect(computeVerdict(s(t), false)).toBe("likely_scam");
  });

  it("two different non-critical signs → likely scam", () => {
    expect(computeVerdict(s("urgency", "suspicious_link"), false)).toBe("likely_scam");
    expect(computeVerdict(s("impersonation", "too_good"), false)).toBe("likely_scam");
  });

  it("the same sign twice counts once", () => {
    expect(computeVerdict(s("urgency", "urgency"), false)).toBe("careful");
  });

  it("critical sign list matches the plan: payment, threats, secrets, remote access", () => {
    expect([...CRITICAL_SIGNS].sort()).toEqual(["remote_access", "secrets", "threat", "unusual_payment"]);
  });
});

describe("verifySigns: drops made-up evidence and finds where quotes sit", () => {
  const sign = (type: SignType, quote: string) => ({ type, quote, explanation: "x" });

  it("keeps a quote that is really in the message, with exact positions", () => {
    const msg = "USPS: Pay the $1.99 fee within 24h: usps-help.co";
    const [kept] = verifySigns(msg, [sign("urgency", "within 24h")]);
    expect(kept).toBeDefined();
    expect(msg.slice(kept.start!, kept.end!)).toBe("within 24h");
  });

  it("drops a quote that is not in the message", () => {
    expect(verifySigns("Your appointment is Tuesday.", [sign("threat", "warrant for your arrest")])).toEqual([]);
  });

  it("drops a paraphrase or translation of the message", () => {
    const msg = "Pague $50 de impuestos hoy";
    expect(verifySigns(msg, [sign("unusual_payment", "Pay $50 in taxes today")])).toEqual([]);
  });

  it("ignores case, extra spaces and line breaks", () => {
    const msg = "FINAL   NOTICE:\nyour account\n\nwill be closed";
    const [kept] = verifySigns(msg, [sign("urgency", "final notice: your account will be closed")]);
    expect(kept).toBeDefined();
    expect(msg.slice(kept.start!, kept.end!)).toBe("FINAL   NOTICE:\nyour account\n\nwill be closed");
  });

  it("treats smart quotes and dashes like plain ones", () => {
    const msg = "Don’t tell mom — it’s urgent";
    const [kept] = verifySigns(msg, [sign("secrecy", "Don't tell mom - it's urgent")]);
    expect(kept).toBeDefined();
  });

  it("tolerates quote marks and punctuation the model adds around a quote", () => {
    const msg = "Reply with your PIN to unlock it.";
    const [kept] = verifySigns(msg, [sign("secrets", "“Reply with your PIN.”")]);
    expect(kept).toBeDefined();
    expect(msg.slice(kept.start!, kept.end!)).toBe("Reply with your PIN");
  });

  it("drops empty or one-character quotes", () => {
    expect(verifySigns("a b c", [sign("urgency", ""), sign("urgency", "a")])).toEqual([]);
  });

  it("keeps several signs and drops only the bad one", () => {
    const msg = "Grandma it's me. Send $2,000 in gift cards. Don't tell Mom.";
    const kept = verifySigns(msg, [
      sign("impersonation", "Grandma it's me"),
      sign("unusual_payment", "$2,000 in gift cards"),
      sign("threat", "you will be arrested"),
      sign("secrecy", "Don't tell Mom"),
    ]);
    expect(kept.map((k) => k.type)).toEqual(["impersonation", "unusual_payment", "secrecy"]);
  });

  it("drops the same sign pointing at the same words twice", () => {
    const msg = "Act now! Act now!";
    expect(verifySigns(msg, [sign("urgency", "Act now"), sign("urgency", "Act now")])).toHaveLength(1);
  });

  it("works for Chinese and Vietnamese text", () => {
    const zh = "请在24小时内点击链接支付2元手续费";
    expect(verifySigns(zh, [sign("urgency", "24小时内")])).toHaveLength(1);
    const vi = "Nếu không thanh toán hôm nay, cảnh sát sẽ đến bắt giữ.";
    expect(verifySigns(vi, [sign("threat", "cảnh sát sẽ đến bắt giữ")])).toHaveLength(1);
  });

  it("a verdict can only be as strong as the verified signs", () => {
    const msg = "Reminder: dentist Tuesday 3pm.";
    const kept = verifySigns(msg, [sign("unusual_payment", "send gift cards"), sign("threat", "arrest")]);
    expect(computeVerdict(kept, false)).toBe("no_signs");
  });
});
