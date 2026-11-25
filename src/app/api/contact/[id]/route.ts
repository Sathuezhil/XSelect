import { NextResponse } from "next/server";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { markMessageRead } from "@/services/inbox";

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  const { id } = await context.params;
  const result = await markMessageRead(id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data);
}
