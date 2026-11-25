import { Category } from "@/models/Category";
import { categorySchema, type CategoryInput } from "@/lib/validators";
import type { CategoryDTO, ServiceResult } from "@/types";
import { mapCategory } from "@/services/mappers";
import { badId, db, invalid, isDuplicateKey, issuesFrom, notFound, uniqueSlug } from "@/services/helpers";
import { Product } from "@/models/Product";

export async function listCategories(options?: { includeInactive?: boolean; withCounts?: boolean }) {
  return db(async () => {
    const filter = options?.includeInactive ? {} : { active: true };
    const docs = await Category.find(filter).sort({ sortOrder: 1, name: 1 }).lean();
    if (!options?.withCounts) return docs.map((doc) => mapCategory(doc));
    const counts = await Product.aggregate<{ _id: unknown; count: number }>([
      { $match: { active: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    const countMap = new Map(counts.map((row) => [String(row._id), row.count]));
    return docs.map((doc) => mapCategory(doc, countMap.get(String(doc._id)) ?? 0));
  });
}

export async function getCategoryBySlug(slug: string, includeInactive = false) {
  return db(async () => {
    const doc = await Category.findOne({ slug, ...(includeInactive ? {} : { active: true }) }).lean();
    return doc ? mapCategory(doc) : null;
  });
}

export async function getCategoryById(id: string) {
  if (!badId(id)) {
    return db(async () => {
      const doc = await Category.findById(id).lean();
      return doc ? mapCategory(doc) : null;
    });
  }
  return null;
}

export async function createCategory(input: unknown): Promise<ServiceResult<{ category: CategoryDTO }>> {
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the category fields.", status: 400, issues: issuesFrom(parsed.error) };
  try {
    return await db(async () => {
      const slug = await uniqueSlug(Category, parsed.data.slug);
      const doc = await Category.create({ ...parsed.data, slug });
      return { ok: true, data: { category: mapCategory(doc) } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return invalid("That slug is already in use.");
    throw error;
  }
}

export async function updateCategory(id: string, input: unknown): Promise<ServiceResult<{ category: CategoryDTO }>> {
  if (badId(id)) return notFound("Category not found.");
  const parsed = categorySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the category fields.", status: 400, issues: issuesFrom(parsed.error) };
  try {
    return await db(async () => {
      const slug = await uniqueSlug(Category, parsed.data.slug, id);
      const doc = await Category.findByIdAndUpdate(id, { ...parsed.data, slug }, { new: true });
      if (!doc) return notFound("Category not found.");
      return { ok: true, data: { category: mapCategory(doc) } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return invalid("That slug is already in use.");
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<ServiceResult<{ deleted: true }>> {
  if (badId(id)) return notFound("Category not found.");
  return db(async () => {
    const inUse = await Product.countDocuments({ category: id });
    if (inUse > 0) return invalid("Move or delete the products in this category first.");
    const doc = await Category.findByIdAndDelete(id);
    if (!doc) return notFound("Category not found.");
    return { ok: true, data: { deleted: true } };
  });
}

export type { CategoryInput };
