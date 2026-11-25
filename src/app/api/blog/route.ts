import { apiResult, readJson } from "@/lib/http";
import { assertSameOrigin, originError, requireAdmin } from "@/lib/guard";
import { createPost, listPosts } from "@/services/posts";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  const posts = await listPosts({ publishedOnly: false, limit: 50 });
  return Response.json(posts);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;
  if (!assertSameOrigin(request)) return originError();
  return apiResult(await createPost(await readJson(request)), 201);
}
