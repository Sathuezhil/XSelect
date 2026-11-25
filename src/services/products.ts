import { DatabaseUnavailableError } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { productSchema } from "@/lib/validators";
import { sanitizeAmazonUrl, withAssociateTag } from "@/lib/amazon";
import type { ProductDTO, ProductListQuery, ServiceResult } from "@/types";
import { mapProduct } from "@/services/mappers";
import { fallbackAffiliateUrl, fallbackBrands, fallbackProduct, fallbackProducts, fallbackRelated, orCatalogue } from "@/services/catalogue-fallback";
import { badId, db, emptyPage, invalid, isDuplicateKey, issuesFrom, notFound, paginate, uniqueSlug } from "@/services/helpers";
import { escapeRegex } from "@/lib/utils";

function sortFor(sort: ProductListQuery["sort"]): Record<string, 1 | -1> {
  if (sort === "name") return { name: 1 };
  if (sort === "price-asc") return { price: 1 };
  if (sort === "price-desc") return { price: -1 };
  return { createdAt: -1 };
}

export async function listProducts(query: ProductListQuery = {}) {
  const page = query.page && query.page > 0 ? query.page : 1;
  const pageSize = query.limit && query.limit > 0 ? Math.min(query.limit, 48) : 12;
  const read = () => db(async () => {
    const filter: Record<string, unknown> = {};
    if (!query.includeInactive) filter.active = true;
    if (query.featured) filter.featured = true;
    if (query.trending) filter.trending = true;
    if (query.isNewArrival) filter.isNewArrival = true;
    if (query.deals) filter.isDeal = true;
    if (query.brand) filter.brand = new RegExp(`^${escapeRegex(query.brand)}$`, "i");
    if (query.minPrice != null || query.maxPrice != null) {
      filter.price = {
        ...(query.minPrice != null ? { $gte: query.minPrice } : {}),
        ...(query.maxPrice != null ? { $lte: query.maxPrice } : {}),
        $ne: null,
      };
    }
    if (query.categorySlug) {
      const category = await Category.findOne({ slug: query.categorySlug }).select("_id");
      if (!category) return emptyPage<ProductDTO>(page, pageSize);
      filter.category = category._id;
    }
    if (query.q?.trim()) {
      const pattern = escapeRegex(query.q.trim());
      filter.$or = [
        { name: { $regex: pattern, $options: "i" } },
        { brand: { $regex: pattern, $options: "i" } },
        { shortDescription: { $regex: pattern, $options: "i" } },
      ];
    }

    const [docs, total] = await Promise.all([
      Product.find(filter)
        .sort(sortFor(query.sort))
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .populate("category", "name slug")
        .lean(),
      Product.countDocuments(filter),
    ]);

    return paginate(docs.map((doc) => mapProduct(doc)), page, pageSize, total);
  });
  if (query.includeInactive) return read();
  return orCatalogue(read, () => fallbackProducts(query));
}

export async function listBrands() {
  return orCatalogue(
    () =>
      db(async () => {
        const brands = await Product.distinct("brand", { active: true });
        return brands.filter((brand): brand is string => typeof brand === "string" && brand.length > 0).sort((a, b) => a.localeCompare(b));
      }),
    () => fallbackBrands(),
  );
}

export async function getProductBySlug(slug: string) {
  return orCatalogue(
    () =>
      db(async () => {
        const doc = await Product.findOne({ slug, active: true }).populate("category", "name slug").lean();
        return doc ? mapProduct(doc) : null;
      }),
    () => fallbackProduct(slug),
  );
}

export async function getProductById(id: string) {
  if (badId(id)) return null;
  return db(async () => {
    const doc = await Product.findById(id).populate("category", "name slug").lean();
    return doc ? mapProduct(doc) : null;
  });
}

export async function relatedProducts(product: ProductDTO, limit = 4) {
  return orCatalogue(() => db(async () => {
    const docs = await Product.find({
      active: true,
      slug: { $ne: product.slug },
      category: product.category.id,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("category", "name slug")
      .lean();
    return docs.map((doc) => mapProduct(doc));
  }), () => fallbackRelated(product.slug, limit));
}

function cleanLinks(input: { amazonUrl: string; affiliateUrl: string; affiliateTag: string }) {
  const amazonUrl = sanitizeAmazonUrl(input.amazonUrl);
  const affiliateUrl = withAssociateTag(input.affiliateUrl, input.affiliateTag);
  if (!amazonUrl || !affiliateUrl) return null;
  return { amazonUrl, affiliateUrl };
}

export async function createProduct(input: unknown): Promise<ServiceResult<{ product: ProductDTO }>> {
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the product fields.", status: 400, issues: issuesFrom(parsed.error) };
  const links = cleanLinks(parsed.data);
  if (!links) return invalid("Amazon links must stay on https://www.amazon.ae.");
  try {
    return await db(async () => {
      const category = await Category.findById(parsed.data.categoryId);
      if (!category) return invalid("Choose a valid category.");
      const slug = await uniqueSlug(Product, parsed.data.slug);
      const doc = await Product.create({
        ...parsed.data,
        ...links,
        slug,
        category: category._id,
        priceUpdatedAt: parsed.data.price == null ? null : new Date(),
      });
      const populated = await doc.populate("category", "name slug");
      return { ok: true, data: { product: mapProduct(populated.toObject()) } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return invalid("That slug is already in use.");
    throw error;
  }
}

export async function updateProduct(id: string, input: unknown): Promise<ServiceResult<{ product: ProductDTO }>> {
  if (badId(id)) return notFound("Product not found.");
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Check the product fields.", status: 400, issues: issuesFrom(parsed.error) };
  const links = cleanLinks(parsed.data);
  if (!links) return invalid("Amazon links must stay on https://www.amazon.ae.");
  try {
    return await db(async () => {
      const existing = await Product.findById(id);
      if (!existing) return notFound("Product not found.");
      const category = await Category.findById(parsed.data.categoryId);
      if (!category) return invalid("Choose a valid category.");
      const slug = await uniqueSlug(Product, parsed.data.slug, id);
      const priceChanged = (existing.price ?? null) !== parsed.data.price;
      existing.set({
        ...parsed.data,
        ...links,
        slug,
        category: category._id,
        priceUpdatedAt: parsed.data.price == null ? null : priceChanged ? new Date() : existing.priceUpdatedAt,
      });
      await existing.save();
      const populated = await existing.populate("category", "name slug");
      return { ok: true, data: { product: mapProduct(populated.toObject()) } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return invalid("That slug is already in use.");
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<ServiceResult<{ deleted: true }>> {
  if (badId(id)) return notFound("Product not found.");
  return db(async () => {
    const doc = await Product.findByIdAndDelete(id);
    if (!doc) return notFound("Product not found.");
    return { ok: true, data: { deleted: true } };
  });
}

export async function recordOutboundClick(slug: string) {
  try {
    return await db(async () => {
      const product = await Product.findOneAndUpdate(
        { slug, active: true },
        { $inc: { clickCount: 1 } },
        { new: true },
      );
      if (!product) return null;
      return withAssociateTag(product.affiliateUrl, product.affiliateTag);
    });
  } catch (error) {
    if (error instanceof DatabaseUnavailableError) return fallbackAffiliateUrl(slug);
    throw error;
  }
}
