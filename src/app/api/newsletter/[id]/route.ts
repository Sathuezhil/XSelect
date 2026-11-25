import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guard";
import { deleteSubscriber } from "@/services/inbox";

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const { id } = await context.params;
  const result = await deleteSubscriber(id);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json(result.data);
}
