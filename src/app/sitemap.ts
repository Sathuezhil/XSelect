import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const staticPaths = [
  "",
  "/shop",
  "/categories",
  "/deals",
  "/trending",
  "/new-arrivals",
  "/blog",
  "/about",
  "/contact",
  "/faq",
  "/affiliate-disclosure",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path || "/"}`,
  }));

  if (!process.env.MONGODB_URI) return entries;

  try {
    const { listCategories } = await import("@/services/categories");
    const { listProducts } = await import("@/services/products");
    const { listPosts } = await import("@/services/posts");
    const [categories, products, posts] = await Promise.all([
      listCategories(),
      listProducts({ limit: 200, page: 1 }),
      listPosts({ limit: 100, page: 1, publishedOnly: true }),
    ]);
    for (const category of categories) entries.push({ url: `${site.url}/categories/${category.slug}` });
    for (const product of products.items) entries.push({ url: `${site.url}/product/${product.slug}` });
    for (const post of posts.items) entries.push({ url: `${site.url}/blog/${post.slug}` });
  } catch {
    return entries;
  }

  return entries;
}
