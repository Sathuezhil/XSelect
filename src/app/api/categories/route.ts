import { apiResult, readJson } from "@/lib/http";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { createCategory, listCategories } from "@/services/categories";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const categories = await listCategories({ includeInactive: true, withCounts: true });
  return Response.json({ categories });
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  return apiResult(await createCategory(await readJson(request)), 201);
}
