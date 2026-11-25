import { apiResult, readJson } from "@/lib/http";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { createProduct, listProducts } from "@/services/products";
import { pageNumber, oneParam } from "@/lib/utils";

export async function GET(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const url = new URL(request.url);
  const products = await listProducts({
    q: url.searchParams.get("q") ?? undefined,
    page: pageNumber(oneParam(url.searchParams.get("page") ?? undefined)),
    includeInactive: true,
    limit: 20,
  });
  return Response.json(products);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  const body = await readJson(request);
  const result = await createProduct(body);
  return apiResult(result, 201);
}
