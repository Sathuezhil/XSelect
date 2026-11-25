import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { site } from "@/lib/site";
import type { CategoryDTO } from "@/types";

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Buying guides" },
];

const legal = [
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms and conditions" },
];

export function Footer({ categories }: { categories: CategoryDTO[] }) {
  return (
    <footer className="mt-auto bg-brand text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo large />
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/70">{site.tagline} An independent guide to products you can buy on Amazon.ae.</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link href="/shop" className="hover:text-white">Shop all</Link></li>
            <li><Link href="/deals" className="hover:text-white">Best deals</Link></li>
            <li><Link href="/trending" className="hover:text-white">Trending</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-white">New arrivals</Link></li>
            {company.map((link) => (
              <li key={link.href}><Link href={link.href} className="hover:text-white">{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Categories</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {categories.length === 0 && <li>Categories appear once the catalogue is connected.</li>}
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/categories/${category.slug}`} className="hover:text-white">{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{site.location}</li>
            <li><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></li>
            {site.socials.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{social.label}</a>
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-2 text-sm text-white/80">
            {legal.map((link) => (
              <li key={link.href}><Link href={link.href} className="hover:text-white">{link.label}</Link></li>
            ))}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-xs leading-5 text-white/55">
          <p>© 2026 XSelect. All rights reserved.</p>
        </Container>
      </div>
    </footer>
  );
}
