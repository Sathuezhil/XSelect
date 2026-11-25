import { apiResult, readJson } from "@/lib/http";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { deleteProduct, getProductById, updateProduct } from "@/services/products";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const { id } = await context.params;
  const product = await getProductById(id);
  if (!product) return Response.json({ error: "Product not found." }, { status: 404 });
  return Response.json({ product });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  const { id } = await context.params;
  return apiResult(await updateProduct(id, await readJson(request)));
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  const { id } = await context.params;
  return apiResult(await deleteProduct(id));
}
