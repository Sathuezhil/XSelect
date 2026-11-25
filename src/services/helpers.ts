import { ZodError } from "zod";
import { connectDB } from "@/lib/mongodb";
import { escapeRegex, isObjectId, slugify } from "@/lib/utils";
import type { Paginated, ServiceResult } from "@/types";

export function emptyPage<T>(page = 1, pageSize = 12): Paginated<T> {
  return { items: [], page, pageSize, total: 0, totalPages: 1 };
}

export function paginate<T>(items: T[], page: number, pageSize: number, total: number): Paginated<T> {
  return {
    items,
    page,
    pageSize,
    total,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export function issuesFrom(error: ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}

export function isDuplicateKey(error: unknown) {
  return Boolean(error && typeof error === "object" && "code" in error && (error as { code: number }).code === 11000);
}

type SlugModel = {
  findOne: (filter: { slug: string }) => {
    select: (fields: string) => { lean: () => Promise<{ _id?: { toString(): string } } | null> };
  };
};

export async function uniqueSlug(model: SlugModel, requested: string, currentId?: string) {
  const base = slugify(requested) || "item";
  let candidate = base;
  let index = 2;
  while (index < 50) {
    const existing = await model.findOne({ slug: candidate }).select("_id").lean();
    if (!existing || existing._id?.toString() === currentId) return candidate;
    candidate = `${base}-${index}`;
    index += 1;
  }
  return `${base}-${index}`;
}

export async function db<T>(work: () => Promise<T>): Promise<T> {
  await connectDB();
  return work();
}

export function invalid(message: string, status = 400): ServiceResult<never> {
  return { ok: false, error: message, status };
}

export function notFound(message = "Not found"): ServiceResult<never> {
  return { ok: false, error: message, status: 404 };
}

export function badId(id: string) {
  return isObjectId(id) ? null : notFound();
}

export function searchClause(q?: string) {
  const term = q?.trim();
  if (!term) return null;
  const pattern = escapeRegex(term);
  return { $regex: pattern, $options: "i" };
}
