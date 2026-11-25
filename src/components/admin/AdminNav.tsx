"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/blog", label: "Guides" },
  { href: "/admin/subscribers", label: "Subscribers" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  return (
    <aside className="border-b border-line bg-navy text-white lg:min-h-screen lg:border-b-0 lg:border-r lg:border-white/10">
      <div className="flex items-center justify-between px-5 py-5 lg:block">
        <Link href="/admin" className="font-heading text-lg font-semibold">XSelect admin</Link>
        <p className="mt-1 hidden text-xs text-white/60 lg:block">{email}</p>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-3 pb-4 lg:block lg:space-y-1 lg:px-3" aria-label="Admin">
        {links.map((link) => {
          const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={cn("block whitespace-nowrap rounded-xl px-3 py-2 text-sm", active ? "bg-white text-navy" : "text-white/80 hover:bg-white/10")}>
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="hidden px-5 pb-6 lg:block">
        <button type="button" onClick={() => signOut({ callbackUrl: "/admin/login" })} className="text-sm text-white/70 hover:text-white">
          Sign out
        </button>
        <Link href="/" className="mt-3 block text-sm text-emerald">View site</Link>
      </div>
    </aside>
  );
}
