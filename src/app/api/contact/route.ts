import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { listMessages, saveMessage } from "@/services/inbox";
import { readJson } from "@/lib/http";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const messages = await listMessages();
  return NextResponse.json({ messages });
}

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) return originError();
  const limit = rateLimit(`contact:${clientIp(request.headers)}`, 5, 10 * 60 * 1000);
  if (!limit.ok) return NextResponse.json({ error: "Too many messages. Please wait and try again." }, { status: 429 });
  const result = await saveMessage(await readJson(request));
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data, { status: 201 });
}
