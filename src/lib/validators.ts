import { z } from "zod";
import { sanitizeAmazonUrl } from "@/lib/amazon";

const slug = z
  .string()
  .trim()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens");

const amazonLink = z.url().refine((value) => sanitizeAmazonUrl(value) !== null, "Use an https://www.amazon.ae link");

const line = z.string().trim().min(1).max(240);
const spec = z.object({
  label: z.string().trim().min(1).max(80),
  value: z.string().trim().min(1).max(240),
});

export const productSchema = z.object({
  name: z.string().trim().min(2).max(160),
  slug,
  shortDescription: z.string().trim().min(10).max(300),
  description: z.string().trim().min(20).max(8000),
  images: z.array(z.url()).min(1).max(8),
  categoryId: z.string().trim().min(1),
  brand: z.string().trim().min(1).max(80),
  features: z.array(line).max(12),
  specifications: z.array(spec).max(20),
  pros: z.array(line).max(8),
  cons: z.array(line).max(8),
  amazonUrl: amazonLink,
  affiliateUrl: amazonLink,
  affiliateTag: z.string().trim().max(40),
  price: z.number().positive().max(1_000_000).nullable(),
  featured: z.boolean(),
  trending: z.boolean(),
  isNewArrival: z.boolean(),
  isDeal: z.boolean(),
  active: z.boolean(),
  isDemo: z.boolean(),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(160),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(80),
  slug,
  description: z.string().trim().min(10).max(500),
  image: z.url(),
  sortOrder: z.number().int().min(0).max(999),
  active: z.boolean(),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(160),
});

export const postSchema = z.object({
  title: z.string().trim().min(4).max(160),
  slug,
  excerpt: z.string().trim().min(20).max(300),
  content: z.string().trim().min(40).max(20000),
  coverImage: z.url(),
  tags: z.array(z.string().trim().min(1).max(40)).max(8),
  author: z.string().trim().min(2).max(80),
  published: z.boolean(),
  seoTitle: z.string().trim().max(70),
  seoDescription: z.string().trim().max(160),
});

export const loginSchema = z.object({
  email: z.email().max(160),
  password: z.string().min(8).max(200),
});

export const newsletterSchema = z.object({
  email: z.email({ error: "Enter a valid email address." }).max(160),
  consent: z.literal(true, { error: "Please agree to receive notes before subscribing." }),
  website: z.string().max(0).optional(),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80),
  email: z.email({ error: "Enter a valid email address." }).max(160),
  subject: z.string().trim().min(3, "Add a short subject.").max(140),
  message: z.string().trim().min(10, "Write a message of at least a few words.").max(5000),
  website: z.string().max(0).optional(),
});

const row = z.object({ value: z.string() });

export const productFormSchema = z.object({
  name: z.string().trim().min(2, "Enter a product name"),
  slug: z.string().trim().min(2, "Enter a slug"),
  shortDescription: z.string().trim().min(10, "Add a short description"),
  description: z.string().trim().min(20, "Add a full description"),
  images: z.array(row).min(1),
  categoryId: z.string().min(1, "Choose a category"),
  brand: z.string().trim().min(1, "Enter a brand"),
  features: z.array(row),
  specifications: z.array(z.object({ label: z.string(), value: z.string() })),
  pros: z.array(row),
  cons: z.array(row),
  amazonUrl: z.string().trim().min(1, "Add the Amazon.ae URL"),
  affiliateUrl: z.string().trim().min(1, "Add the affiliate URL"),
  affiliateTag: z.string(),
  price: z.string(),
  featured: z.boolean(),
  trending: z.boolean(),
  isNewArrival: z.boolean(),
  isDeal: z.boolean(),
  active: z.boolean(),
  isDemo: z.boolean(),
  seoTitle: z.string(),
  seoDescription: z.string(),
});

export const categoryFormSchema = categorySchema;
export const postFormSchema = postSchema.extend({
  tagsText: z.string().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
export type PostInput = z.infer<typeof postSchema>;
export type ProductFormValues = z.infer<typeof productFormSchema>;
