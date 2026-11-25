export const site = {
  name: "XSelect",
  tagline: "Discover More. Shop Smarter.",
  description:
    "XSelect is an independent shopping discovery guide for the United Arab Emirates. Browse curated finds, then buy on Amazon.ae.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "hello@xselect.ae",
  location: "Dubai, United Arab Emirates",
  locale: "en_AE",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", href: "https://www.facebook.com/" },
    { label: "YouTube", href: "https://www.youtube.com/" },
  ],
};

export const heroImages = {
  retail:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
  watch:
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  headphones:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/deals", label: "Best Deals" },
  { href: "/trending", label: "Trending" },
  { href: "/blog", label: "Blog" },
] as const;
