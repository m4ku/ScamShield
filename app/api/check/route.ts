import { allowRequest } from "@/lib/rate-limit";
import { CheckError, checkMessage } from "@/lib/check";
import { CheckRequestSchema, type CheckErrorCode } from "@/lib/schema";

const STATUS: Record<CheckErrorCode, number> = {
  bad_input: 400,
  unreadable: 422,
  busy: 429,
  failed: 502,
};

function fail(code: CheckErrorCode) {
  return Response.json({ error: code }, { status: STATUS[code], headers: { "Cache-Control": "no-store" } });
}

/**
 * POST /api/check
 * Body: { mode: "text" | "call", language, text } or { mode: "image", language, image: { mimeType, base64 } }
 * Returns a CheckResult (see lib/schema.ts) or { error }.
 * Message content is never stored or logged.
 */
export async function POST(request: Request) {
  if (!allowRequest(request, "check")) return fail("busy");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("bad_input");
  }

  const parsed = CheckRequestSchema.safeParse(body);
  if (!parsed.success) return fail("bad_input");

  try {
    const result = await checkMessage(parsed.data);
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof CheckError) return fail(err.code);
    // Log only the error type, never the message content.
    console.error("check failed:", err instanceof Error ? err.name : "unknown");
    return fail("failed");
  }
}
