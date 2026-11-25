import { NewsletterSubscriber } from "@/models/NewsletterSubscriber";
import { ContactMessage } from "@/models/ContactMessage";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { BlogPost } from "@/models/BlogPost";
import { contactSchema, newsletterSchema } from "@/lib/validators";
import { stripHtml } from "@/lib/utils";
import type { ServiceResult } from "@/types";
import { mapMessage, mapProduct, mapSubscriber } from "@/services/mappers";
import { badId, db, invalid, isDuplicateKey, notFound } from "@/services/helpers";

export async function subscribe(input: unknown): Promise<ServiceResult<{ status: "subscribed" | "exists" }>> {
  const parsed = newsletterSchema.safeParse(input);
  if (!parsed.success) return invalid("Enter a valid email and confirm consent.");
  if (parsed.data.website) return { ok: true, data: { status: "subscribed" } };
  try {
    return await db(async () => {
      await NewsletterSubscriber.create({
        email: parsed.data.email.toLowerCase(),
        consent: true,
        source: "website",
      });
      return { ok: true, data: { status: "subscribed" } };
    });
  } catch (error) {
    if (isDuplicateKey(error)) return { ok: true, data: { status: "exists" } };
    throw error;
  }
}

export async function listSubscribers() {
  return db(async () => {
    const docs = await NewsletterSubscriber.find().sort({ createdAt: -1 }).limit(500).lean();
    return docs.map((doc) => mapSubscriber(doc));
  });
}

export async function deleteSubscriber(id: string): Promise<ServiceResult<{ deleted: true }>> {
  if (badId(id)) return notFound("Subscriber not found.");
  return db(async () => {
    const doc = await NewsletterSubscriber.findByIdAndDelete(id);
    if (!doc) return notFound("Subscriber not found.");
    return { ok: true, data: { deleted: true } };
  });
}

export async function saveMessage(input: unknown): Promise<ServiceResult<{ received: true }>> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return invalid("Check the contact form and try again.");
  if (parsed.data.website) return { ok: true, data: { received: true } };
  return db(async () => {
    await ContactMessage.create({
      name: stripHtml(parsed.data.name),
      email: parsed.data.email.toLowerCase(),
      subject: stripHtml(parsed.data.subject),
      message: stripHtml(parsed.data.message),
    });
    return { ok: true, data: { received: true } };
  });
}

export async function listMessages() {
  return db(async () => {
    const docs = await ContactMessage.find().sort({ createdAt: -1 }).limit(300).lean();
    return docs.map((doc) => mapMessage(doc));
  });
}

export async function markMessageRead(id: string): Promise<ServiceResult<{ updated: true }>> {
  if (badId(id)) return notFound("Message not found.");
  return db(async () => {
    const doc = await ContactMessage.findByIdAndUpdate(id, { read: true });
    if (!doc) return notFound("Message not found.");
    return { ok: true, data: { updated: true } };
  });
}

export async function dashboardStats() {
  return db(async () => {
    const [products, categories, posts, subscribers, unread, recent] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      BlogPost.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      Product.find().sort({ createdAt: -1 }).limit(5).populate("category", "name slug").lean(),
    ]);
    return {
      products,
      categories,
      posts,
      subscribers,
      unread,
      recent: recent.map((doc) => mapProduct(doc)),
    };
  });
}
