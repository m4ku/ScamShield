import "server-only";

import { createHash } from "node:crypto";

/**
 * A simple per-visitor limit so a script can't use up the free AI quota while real people need it.
 * Kept in memory only, keyed by a one-way hash of the visitor's IP address (never the address itself,
 * never any message content), and forgotten after a minute.
 *
 * Generous on purpose: a whole workshop room often shares one Wi-Fi address.
 */
const WINDOW_MS = 60_000;
const MAX_KEYS = 10_000;

const hits = new Map<string, { count: number; resetAt: number }>();

function visitorKey(request: Request, route: string): string {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return route + ":" + createHash("sha256").update(ip).digest("base64url").slice(0, 16);
}

/** True if this visitor may make another request to this route right now. */
export function allowRequest(request: Request, route: "check" | "followup"): boolean {
  const perMinute = Number(process.env[route === "check" ? "CHECKS_PER_MINUTE" : "FOLLOWUPS_PER_MINUTE"]) || (route === "check" ? 15 : 20);
  const now = Date.now();
  const key = visitorKey(request, route);

  if (hits.size > MAX_KEYS) {
    for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
  }

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= perMinute;
}
