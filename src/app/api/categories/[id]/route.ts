import { apiResult, readJson } from "@/lib/http";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { deleteCategory, updateCategory } from "@/services/categories";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  const { id } = await context.params;
  return apiResult(await updateCategory(id, await readJson(request)));
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  const { id } = await context.params;
  return apiResult(await deleteCategory(id));
}
