import { allowRequest } from "@/lib/rate-limit";
import { CheckError } from "@/lib/check";
import { answerFollowup } from "@/lib/followup";
import { FollowupRequestSchema, type CheckErrorCode } from "@/lib/schema";

const STATUS: Record<CheckErrorCode, number> = { bad_input: 400, unreadable: 422, busy: 429, failed: 502 };

function fail(code: CheckErrorCode) {
  return Response.json({ error: code }, { status: STATUS[code], headers: { "Cache-Control": "no-store" } });
}

/**
 * POST /api/followup
 * Body: { language, check: { verdict, message, summary, signs }, history: [{ q, a }], question }
 * Returns { answer, steps } or { error }. Nothing is stored or logged.
 */
export async function POST(request: Request) {
  if (!allowRequest(request, "followup")) return fail("busy");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("bad_input");
  }
  const parsed = FollowupRequestSchema.safeParse(body);
  if (!parsed.success) return fail("bad_input");

  try {
    const answer = await answerFollowup(parsed.data);
    return Response.json(answer, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    if (err instanceof CheckError) return fail(err.code);
    console.error("followup failed:", err instanceof Error ? err.name : "unknown");
    return fail("failed");
  }
}
