import { BlogPost } from "@/models/BlogPost";
import { postSchema } from "@/lib/validators";
import type { PostDTO, ServiceResult } from "@/types";
import { mapPost } from "@/services/mappers";
import { badId, db, invalid, isDuplicateKey, issuesFrom, notFound, paginate, uniqueSlug } from "@/services/helpers";

export async function listPosts(options?: { publishedOnly?: boolean; page?: number; limit?: number }) {
  const page = options?.page && options.page > 0 ? options.page : 1;
  const pageSize = options?.limit && options.limit > 0 ? Math.min(options.limit, 48) : 12;
  return db(async () => {
    const filter = options?.publishedOnly === false ? {} : { published: true };
    const [docs, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      BlogPost.countDocuments(filter),
    ]);
    return paginate(docs.map((doc) => mapPost(doc)), page, pageSize, total);
  });
}

export async function getPostBySlug(slug: string, includeDrafts = false) {
  return db(async () => {
    const doc = await BlogPost.findOne(includeDrafts ? { slug } : { slug, published: true }).lean();
    return doc ? mapPost(doc) : null;
  });
}

export async function getPostById(id: string) {
  if (badId(id)) return null;
  return db(async () => {
    const doc = await BlogPost.findById(id).lean();
    return doc ? mapPost(doc) : null;
  });
}

export async function createPost(input: unknown): Promise<ServiceResult<{ post: PostDTO }>> {
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the article fields.", status: 400, issues: issuesFrom(parsed.error) };
  try {
    return await db(async () => {
      const slug = await uniqueSlug(BlogPost, parsed.data.slug);
      const doc = await BlogPost.create({ ...parsed.data, slug });
      return { ok: true, data: { post: mapPost(doc) } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return invalid("That slug is already in use.");
    throw error;
  }
}

export async function updatePost(id: string, input: unknown): Promise<ServiceResult<{ post: PostDTO }>> {
  if (badId(id)) return notFound("Article not found.");
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the article fields.", status: 400, issues: issuesFrom(parsed.error) };
  try {
    return await db(async () => {
      const slug = await uniqueSlug(BlogPost, parsed.data.slug, id);
      const doc = await BlogPost.findByIdAndUpdate(id, { ...parsed.data, slug }, { new: true });
      if (!doc) return notFound("Article not found.");
      return { ok: true, data: { post: mapPost(doc) } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return invalid("That slug is already in use.");
    throw error;
  }
}

export async function deletePost(id: string): Promise<ServiceResult<{ deleted: true }>> {
  if (badId(id)) return notFound("Article not found.");
  return db(async () => {
    const doc = await BlogPost.findByIdAndDelete(id);
    if (!doc) return notFound("Article not found.");
    return { ok: true, data: { deleted: true } };
  });
}
