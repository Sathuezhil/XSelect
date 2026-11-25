import { DatabaseUnavailableError } from "@/lib/mongodb";
import { escapeRegex } from "@/lib/utils";
import { categorySeed, postSeed, productSeed } from "@/scripts/seed-data";
import { paginate } from "@/services/helpers";
import type { CategoryDTO, PostDTO, ProductDTO, ProductListQuery } from "@/types";

const STAMP = "2026-11-25T00:00:00.000Z";

function associateTag() {
  return process.env.AMAZON_ASSOCIATE_TAG?.trim() || "xselectdemo-21";
}

function amazonLinks(keyword: string) {
  const tag = associateTag();
  const amazon = new URL("https://www.amazon.ae/s");
  amazon.searchParams.set("k", keyword);
  const affiliate = new URL(amazon.toString());
  affiliate.searchParams.set("tag", tag);
  return { amazonUrl: amazon.toString(), affiliateUrl: affiliate.toString(), affiliateTag: tag };
}

function categoryBySlug(slug: string) {
  return categorySeed.find((category) => category.slug === slug);
}

export function fallbackCategories(withCounts = false): CategoryDTO[] {
  return categorySeed.map((category) => ({
    id: category.slug,
    name: category.name,
    slug: category.slug,
    description: category.description,
    image: category.image,
    sortOrder: category.sortOrder,
    active: true,
    seoTitle: category.name,
    seoDescription: category.description.slice(0, 160),
    productCount: withCounts ? productSeed.filter((product) => product.category === category.slug).length : undefined,
  }));
}

export function fallbackCategory(slug: string): CategoryDTO | null {
  return fallbackCategories(true).find((category) => category.slug === slug) ?? null;
}

function toProduct(product: (typeof productSeed)[number], index: number): ProductDTO {
  const category = categoryBySlug(product.category);
  const links = amazonLinks(product.keyword);
  return {
    id: product.slug,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    images: product.images,
    category: {
      id: category?.slug ?? product.category,
      name: category?.name ?? "Shop",
      slug: category?.slug ?? product.category,
    },
    brand: product.brand,
    features: product.features,
    specifications: product.specifications,
    pros: product.pros,
    cons: product.cons,
    ...links,
    price: null,
    priceUpdatedAt: null,
    featured: Boolean(product.featured),
    trending: Boolean(product.trending),
    isNewArrival: Boolean(product.isNewArrival),
    isDeal: Boolean(product.isDeal),
    active: true,
    isDemo: true,
    seoTitle: product.name,
    seoDescription: product.shortDescription.slice(0, 160),
    clickCount: 0,
    createdAt: `2026-01-${String(index + 1).padStart(2, "0")}T00:00:00.000Z`,
    updatedAt: STAMP,
  };
}

const products = productSeed.map(toProduct);

export function fallbackProducts(query: ProductListQuery = {}) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const pageSize = query.limit && query.limit > 0 ? Math.min(query.limit, 48) : 12;
  let items = products.filter((product) => query.includeInactive || product.active);
  if (query.featured) items = items.filter((product) => product.featured);
  if (query.trending) items = items.filter((product) => product.trending);
  if (query.isNewArrival) items = items.filter((product) => product.isNewArrival);
  if (query.deals) items = items.filter((product) => product.isDeal);
  if (query.categorySlug) items = items.filter((product) => product.category.slug === query.categorySlug);
  if (query.brand) {
    const brand = query.brand.toLowerCase();
    items = items.filter((product) => product.brand.toLowerCase() === brand);
  }
  if (query.minPrice != null || query.maxPrice != null) items = [];
  if (query.q?.trim()) {
    const pattern = new RegExp(escapeRegex(query.q.trim()), "i");
    items = items.filter((product) => pattern.test(product.name) || pattern.test(product.brand) || pattern.test(product.shortDescription));
  }
  if (query.sort === "name") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  else if (query.sort === "price-asc" || query.sort === "price-desc") items = [...items];
  else items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const start = (page - 1) * pageSize;
  return paginate(items.slice(start, start + pageSize), page, pageSize, items.length);
}

export function fallbackProduct(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export function fallbackRelated(slug: string, limit = 4) {
  const current = fallbackProduct(slug);
  if (!current) return [];
  return products.filter((product) => product.slug !== slug && product.category.slug === current.category.slug).slice(0, limit);
}

export function fallbackBrands() {
  return [...new Set(products.map((product) => product.brand))].sort((a, b) => a.localeCompare(b));
}

export function fallbackAffiliateUrl(slug: string) {
  return fallbackProduct(slug)?.affiliateUrl ?? null;
}

function toPost(post: (typeof postSeed)[number]): PostDTO {
  return {
    id: post.slug,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    tags: post.tags,
    author: "XSelect Editors",
    published: true,
    seoTitle: post.title.slice(0, 70),
    seoDescription: post.excerpt.slice(0, 160),
    createdAt: STAMP,
    updatedAt: STAMP,
  };
}

const posts = postSeed.map(toPost);

export function fallbackPosts(options?: { publishedOnly?: boolean; page?: number; limit?: number }) {
  const page = options?.page && options.page > 0 ? options.page : 1;
  const pageSize = options?.limit && options.limit > 0 ? Math.min(options.limit, 48) : 12;
  const visible = options?.publishedOnly === false ? posts : posts.filter((post) => post.published);
  const start = (page - 1) * pageSize;
  return paginate(visible.slice(start, start + pageSize), page, pageSize, visible.length);
}

export function fallbackPost(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function orCatalogue<T>(work: () => Promise<T>, fallback: () => T): Promise<T> {
  try {
    return await work();
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return fallback();
    throw error;
  }
}
