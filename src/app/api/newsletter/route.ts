import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { listSubscribers, subscribe } from "@/services/inbox";
import { readJson } from "@/lib/http";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const subscribers = await listSubscribers();
  return NextResponse.json({ subscribers });
}

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) return originError();
  const limit = rateLimit(`newsletter:${clientIp(request.headers)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ error: "Too many attempts. Please wait and try again." }, { status: 429 });
  const result = await subscribe(await readJson(request));
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data);
}
