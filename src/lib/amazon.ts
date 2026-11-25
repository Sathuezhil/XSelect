const ALLOWED_HOSTS = new Set(["amazon.ae", "www.amazon.ae"]);

export function sanitizeAmazonUrl(input: string) {
  try {
    const url = new URL(input);
    if (url.protocol !== "https:") return null;
    if (!ALLOWED_HOSTS.has(url.hostname)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function withAssociateTag(input: string, tag: string) {
  const safe = sanitizeAmazonUrl(input);
  if (!safe) return null;
  const url = new URL(safe);
  const cleanTag = tag.trim();
  if (cleanTag && !url.searchParams.get("tag")) {
    url.searchParams.set("tag", cleanTag);
  }
  return url.toString();
}
