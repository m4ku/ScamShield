import { describe, expect, it } from "vitest";

import { checkLinks, contactsIn, findLinks } from "../../lib/links";

const kinds = (m: string) => checkLinks(m).map((f) => `${f.kind}${f.brand ? `:${f.brand}` : ""}`);

describe("checkLinks: look-alike and hidden links, found in code", () => {
  it.each([
    ["Pay at usps-redeliver-help.co today", "lookalike:USPS"],
    ["Review at chase.com.verify-account.info", "lookalike:Chase"],
    ["Verify: paypa1-secure.com/verify", "lookalike:PayPal"],
    ["Unlock at appleid.apple.com.secure-login.ru", "lookalike:Apple"],
    ["https://netflix-account-billing.help/update", "lookalike:Netflix"],
    ["Pay toll: ezpass-tollpay.info", "lookalike:E-ZPass"],
    ["Go to bbva-seguridad.net now", "lookalike:BBVA"],
    ["Xác nhận tại vcb-xacthuc.com", "lookalike:Vietcombank"],
  ])("flags %s", (msg, expected) => {
    expect(kinds(msg)).toEqual([expected]);
  });

  it.each(["Claim it: bit.ly/3refundIRS", "tinyurl.com/abc123", "https://rb.gy/x1y2"])("flags shortener %s", (msg) => {
    expect(kinds(msg)).toEqual(["shortener"]);
  });

  it.each([
    "Track it at https://www.usps.com/tracking",
    "Pay at xfinity.com or in the app",
    "Visit irs.gov/payments to pay",
    "Sign in at secure.chase.com",
    "See amazon.com/orders",
    "Our groups meet at firstchurch.org",
    "Massage therapy at upsidewellness.com",
  ])("leaves real or unrelated links alone: %s", (msg) => {
    expect(checkLinks(msg)).toEqual([]);
  });

  it("does not treat money or email addresses as links", () => {
    expect(findLinks("Pay $1.99 or email help@usps-help.com")).toEqual([]);
  });

  it("collects links and phone numbers to keep out of answers", () => {
    expect(contactsIn("Call 1-800-555-0133 or visit tollpay-ezpass.co")).toEqual(["tollpay-ezpass.co", "1-800-555-0133"]);
  });
});
