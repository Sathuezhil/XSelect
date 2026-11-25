"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/layout/Container";
import { navLinks } from "@/lib/site";
import { useLockBody } from "@/hooks/useLockBody";
import type { CategoryDTO } from "@/types";

export function Header({ categories }: { categories: CategoryDTO[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useLockBody(menuOpen);

  function closeMenus() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  return (
    <header className="border-b border-white/10 bg-brand text-white shadow-[0_12px_30px_-18px_rgba(9,25,50,0.85)]">
      <Container className="flex h-24 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navLinks.slice(0, 2).map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <div className="group relative">
            <Link href="/categories" className="inline-flex items-center gap-1 text-sm font-medium text-white/80 transition hover:text-white">
              Categories
              <ChevronDown className="h-4 w-4" aria-hidden />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-30 w-72 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-line bg-white p-2 shadow-[0_20px_50px_-24px_rgba(17,24,39,0.45)]">
                {categories.length === 0 && <p className="px-3 py-2 text-sm text-muted">Categories will appear after the catalogue is connected.</p>}
                {categories.map((category) => (
                  <Link key={category.id} href={`/categories/${category.slug}`} className="block rounded-xl px-3 py-2 text-sm text-ink hover:bg-canvas hover:text-navy">
                    {category.name}
                  </Link>
                ))}
                <Link href="/categories" className="mt-1 block rounded-xl px-3 py-2 text-sm font-semibold text-emerald-ink hover:bg-canvas">
                  View all categories
                </Link>
              </div>
            </div>
          </div>
          {navLinks.slice(2).map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10"
            aria-expanded={searchOpen}
            aria-label={searchOpen ? "Close search" : "Search products"}
            onClick={() => setSearchOpen((open) => !open)}
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-white hover:bg-white/10 lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>
      {searchOpen && (
        <div className="border-t border-white/10 bg-brand">
          <Container className="py-4">
            <form action="/shop" method="get" className="flex gap-2" role="search" onSubmit={closeMenus}>
              <label className="sr-only" htmlFor="site-search">Search products</label>
              <input
                id="site-search"
                name="q"
                placeholder="Search by product or brand"
                className="w-full rounded-full border border-line px-4 py-3 text-sm outline-none focus:border-navy"
                autoFocus
              />
              <button type="submit" className="rounded-full bg-emerald px-5 text-sm font-semibold text-navy">
                Search
              </button>
            </form>
          </Container>
        </div>
      )}
      {menuOpen && (
        <div className="border-t border-white/10 bg-brand lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={closeMenus} className="rounded-xl px-3 py-2 text-sm font-medium text-white hover:bg-white/10">
                {link.label}
              </Link>
            ))}
            <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Categories</p>
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`} onClick={closeMenus} className="rounded-xl px-3 py-2.5 text-sm text-white/80 hover:bg-white/10">
                {category.name}
              </Link>
            ))}
            <Link href="/categories" className="rounded-xl px-3 py-2.5 text-sm font-semibold text-emerald-ink">
              All categories
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-white/80 transition hover:text-white">
      {children}
    </Link>
  );
}
