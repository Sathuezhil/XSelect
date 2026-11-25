import type { ProductDTO } from "@/types";

const PRICE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function formatAed(value: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value);
}

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-AE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function canShowPrice(product: Pick<ProductDTO, "price" | "isDemo" | "priceUpdatedAt">) {
  if (product.isDemo) return false;
  if (product.price == null || product.price <= 0) return false;
  if (!product.priceUpdatedAt) return false;
  const updated = new Date(product.priceUpdatedAt).getTime();
  if (Number.isNaN(updated)) return false;
  return Date.now() - updated <= PRICE_MAX_AGE_MS;
}

export function oneParam(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function pageNumber(value: string | string[] | undefined) {
  const parsed = Number(oneParam(value));
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return Math.floor(parsed);
}

export function isObjectId(value: string) {
  return /^[a-f\d]{24}$/i.test(value);
}
