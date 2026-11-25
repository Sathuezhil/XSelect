import type { Types } from "mongoose";
import type { CategoryDTO, MessageDTO, PostDTO, ProductDTO, SubscriberDTO } from "@/types";

type WithDates = {
  _id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
};

function iso(value?: Date | null) {
  if (!value) return null;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function isCategory(value: unknown): value is { _id: Types.ObjectId; name: string; slug: string } {
  return Boolean(value && typeof value === "object" && "name" in value && "slug" in value && "_id" in value);
}

export function mapCategory(doc: WithDates & {
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder?: number;
  active?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}, productCount?: number): CategoryDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    image: doc.image,
    sortOrder: doc.sortOrder ?? 0,
    active: doc.active !== false,
    seoTitle: doc.seoTitle ?? "",
    seoDescription: doc.seoDescription ?? "",
    productCount,
  };
}

export function mapProduct(input: object): ProductDTO {
  const doc = toPlain(input);
  const category = isCategory(doc.category)
    ? { id: doc.category._id.toString(), name: doc.category.name, slug: doc.category.slug }
    : { id: String(doc.category ?? ""), name: "Uncategorised", slug: "shop" };

  return {
    id: doc._id.toString(),
    name: String(doc.name ?? ""),
    slug: String(doc.slug ?? ""),
    shortDescription: String(doc.shortDescription ?? ""),
    description: String(doc.description ?? ""),
    images: Array.isArray(doc.images) ? doc.images.map(String) : [],
    category,
    brand: String(doc.brand ?? ""),
    features: Array.isArray(doc.features) ? doc.features.map(String) : [],
    specifications: Array.isArray(doc.specifications)
      ? doc.specifications.map((item) => {
          const spec = item as { label?: string; value?: string };
          return { label: String(spec.label ?? ""), value: String(spec.value ?? "") };
        })
      : [],
    pros: Array.isArray(doc.pros) ? doc.pros.map(String) : [],
    cons: Array.isArray(doc.cons) ? doc.cons.map(String) : [],
    amazonUrl: String(doc.amazonUrl ?? ""),
    affiliateUrl: String(doc.affiliateUrl ?? ""),
    affiliateTag: String(doc.affiliateTag ?? ""),
    price: typeof doc.price === "number" ? doc.price : null,
    priceUpdatedAt: iso(doc.priceUpdatedAt as Date | null),
    featured: Boolean(doc.featured),
    trending: Boolean(doc.trending),
    isNewArrival: Boolean(doc.isNewArrival),
    isDeal: Boolean(doc.isDeal),
    active: doc.active !== false,
    isDemo: Boolean(doc.isDemo),
    seoTitle: String(doc.seoTitle ?? ""),
    seoDescription: String(doc.seoDescription ?? ""),
    clickCount: typeof doc.clickCount === "number" ? doc.clickCount : 0,
    createdAt: iso(doc.createdAt) ?? "",
    updatedAt: iso(doc.updatedAt) ?? "",
  };
}

function toPlain(input: object): WithDates & Record<string, unknown> {
  if ("toObject" in input && typeof input.toObject === "function") {
    return input.toObject() as WithDates & Record<string, unknown>;
  }
  return input as WithDates & Record<string, unknown>;
}

export function mapPost(input: object): PostDTO {
  const doc = toPlain(input);
  return {
    id: doc._id.toString(),
    title: String(doc.title ?? ""),
    slug: String(doc.slug ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    content: String(doc.content ?? ""),
    coverImage: String(doc.coverImage ?? ""),
    tags: Array.isArray(doc.tags) ? doc.tags.map(String) : [],
    author: String(doc.author ?? "XSelect Editors"),
    published: Boolean(doc.published),
    seoTitle: String(doc.seoTitle ?? ""),
    seoDescription: String(doc.seoDescription ?? ""),
    createdAt: iso(doc.createdAt) ?? "",
    updatedAt: iso(doc.updatedAt) ?? "",
  };
}

export function mapSubscriber(doc: WithDates & { email: string; consent: boolean; source?: string }): SubscriberDTO {
  return {
    id: doc._id.toString(),
    email: doc.email,
    consent: Boolean(doc.consent),
    source: doc.source ?? "website",
    createdAt: iso(doc.createdAt) ?? "",
  };
}

export function mapMessage(doc: WithDates & {
  name: string;
  email: string;
  subject: string;
  message: string;
  read?: boolean;
}): MessageDTO {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    subject: doc.subject,
    message: doc.message,
    read: Boolean(doc.read),
    createdAt: iso(doc.createdAt) ?? "",
  };
}
