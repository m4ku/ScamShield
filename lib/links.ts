/**
 * Link checks done in code, without the AI: look-alike domains of commonly faked
 * organizations, and link shorteners that hide where a link goes.
 */

/** Names scammers often fake, with the domains that really belong to them. */
const BRANDS: { name: string; tokens: string[]; official: string[] }[] = [
  { name: "USPS", tokens: ["usps"], official: ["usps.com", "usps.gov"] },
  { name: "UPS", tokens: ["ups"], official: ["ups.com"] },
  { name: "FedEx", tokens: ["fedex"], official: ["fedex.com"] },
  { name: "DHL", tokens: ["dhl"], official: ["dhl.com"] },
  { name: "Amazon", tokens: ["amazon"], official: ["amazon.com", "amazon.co.uk", "amazon.ca", "amazon.in", "amazon.fr", "amazon.es"] },
  { name: "PayPal", tokens: ["paypal"], official: ["paypal.com", "paypal.me"] },
  { name: "Chase", tokens: ["chase"], official: ["chase.com", "jpmorganchase.com"] },
  { name: "Wells Fargo", tokens: ["wellsfargo"], official: ["wellsfargo.com"] },
  { name: "Bank of America", tokens: ["bankofamerica", "bofa"], official: ["bankofamerica.com"] },
  { name: "Citi", tokens: ["citibank"], official: ["citi.com", "citibank.com"] },
  { name: "IRS", tokens: ["irs"], official: ["irs.gov"] },
  { name: "Social Security", tokens: ["socialsecurity", "ssa"], official: ["ssa.gov"] },
  { name: "Medicare", tokens: ["medicare"], official: ["medicare.gov"] },
  { name: "USCIS", tokens: ["uscis"], official: ["uscis.gov"] },
  { name: "Apple", tokens: ["apple", "icloud"], official: ["apple.com", "icloud.com"] },
  { name: "Microsoft", tokens: ["microsoft", "outlook"], official: ["microsoft.com", "live.com", "outlook.com", "office.com"] },
  { name: "Netflix", tokens: ["netflix"], official: ["netflix.com"] },
  { name: "Walmart", tokens: ["walmart"], official: ["walmart.com"] },
  { name: "Costco", tokens: ["costco"], official: ["costco.com"] },
  { name: "E-ZPass", tokens: ["ezpass", "e-zpass"], official: ["e-zpassny.com", "ezpassnj.com", "ezpassva.com", "ezpassmd.com", "e-zpassiag.com", "ezpass.csc.paturnpike.com"] },
  { name: "Venmo", tokens: ["venmo"], official: ["venmo.com"] },
  { name: "Zelle", tokens: ["zelle"], official: ["zellepay.com"] },
  { name: "Coinbase", tokens: ["coinbase"], official: ["coinbase.com"] },
  { name: "Google", tokens: ["google", "gmail"], official: ["google.com", "gmail.com", "youtube.com"] },
  { name: "Facebook", tokens: ["facebook"], official: ["facebook.com", "fb.com"] },
  { name: "BBVA", tokens: ["bbva"], official: ["bbva.com", "bbva.es", "bbva.mx", "bbvausa.com"] },
  { name: "Vietcombank", tokens: ["vietcombank", "vcb"], official: ["vietcombank.com.vn"] },
  { name: "BDO", tokens: ["bdo"], official: ["bdo.com.ph"] },
  { name: "GCash", tokens: ["gcash"], official: ["gcash.com"] },
  { name: "SF Express", tokens: ["sf-express", "sfexpress"], official: ["sf-express.com"] },
];

const SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "goo.gl", "ow.ly", "is.gd", "rebrand.ly", "cutt.ly", "shorturl.at",
  "rb.gy", "t.ly", "tiny.cc", "s.id", "buff.ly", "v.gd", "bl.ink", "short.io", "lnkd.in",
]);

/** Two-part endings where the registrable domain has three labels (example.com.vn). */
const SECOND_LEVEL = /\.(com|co|net|org|gov|edu)\.[a-z]{2}$/;

export type LinkFinding = { text: string; kind: "lookalike" | "shortener"; brand?: string };

const URL_RE = /(?<![@\w.-])((?:https?:\/\/)?(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,24}(?::\d+)?(?:\/[^\s<>"')\]]*)?)/gi;

/** Finds link-like text (with or without https://) in a message. Email addresses are skipped. */
export function findLinks(message: string): { text: string; host: string }[] {
  const out: { text: string; host: string }[] = [];
  for (const m of message.matchAll(URL_RE)) {
    const text = m[1].replace(/[.,;:!?]+$/, "");
    const host = text.replace(/^https?:\/\//i, "").split(/[/:?#]/)[0].toLowerCase();
    if (!host.includes(".") || /^\d+(\.\d+)+$/.test(host)) continue; // not a domain, or a number like 1.99
    if (!/[a-z]/.test(host.split(".").slice(-1)[0])) continue;
    out.push({ text, host });
  }
  return out;
}

function registrable(host: string): string {
  const labels = host.split(".");
  return SECOND_LEVEL.test(host) ? labels.slice(-3).join(".") : labels.slice(-2).join(".");
}

/** Undo common letter swaps so "paypa1" reads as "paypal" and "amaz0n" as "amazon". */
function unswap(s: string): string {
  return s.replace(/0/g, "o").replace(/1/g, "l").replace(/3/g, "e").replace(/4/g, "a").replace(/5/g, "s").replace(/\$/g, "s");
}

export function checkLinks(message: string): LinkFinding[] {
  const findings: LinkFinding[] = [];
  for (const { text, host } of findLinks(message)) {
    const reg = registrable(host);
    if (SHORTENERS.has(reg) || SHORTENERS.has(host)) {
      findings.push({ text, kind: "shortener" });
      continue;
    }
    const flat = unswap(host.replace(/[-.]/g, ""));
    const labels = host.split(".").map(unswap);
    for (const brand of BRANDS) {
      const isOfficial = brand.official.some((d) => host === d || host.endsWith(`.${d}`));
      if (isOfficial) break;
      // Short tokens (ups, irs, ssa, bdo, vcb) only count as a whole label part, to avoid "groups", "first", "massage".
      const hit = brand.tokens.some((tok) =>
        tok.length <= 4
          ? labels.some((l) => l.split("-").includes(tok))
          : flat.includes(unswap(tok.replace(/-/g, ""))),
      );
      if (hit) {
        findings.push({ text, kind: "lookalike", brand: brand.name });
        break;
      }
    }
  }
  return findings;
}

/** Links and phone numbers that appear in a message, so other text can avoid repeating them. */
export function contactsIn(message: string): string[] {
  const phones = message.match(/\+?\d[\d\s().-]{6,}\d/g) ?? [];
  return [...findLinks(message).map((l) => l.text), ...phones.map((p) => p.trim())].filter((s) => s.length >= 6);
}
