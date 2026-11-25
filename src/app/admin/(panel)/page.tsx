import Link from "next/link";
import { Suspense } from "react";
import { DatabaseNotice } from "@/components/ui/States";
import { dashboardStats } from "@/services/inbox";
import { loadResult } from "@/lib/load";

export default function AdminHomePage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading overview…</p>}>
      <Overview />
    </Suspense>
  );
}

async function Overview() {
  const loaded = await loadResult(() => dashboardStats());
  if (!loaded.ok) return <DatabaseNotice />;
  const stats = loaded.data;
    const cards = [
      { label: "Products", value: stats.products, href: "/admin/products" },
      { label: "Categories", value: stats.categories, href: "/admin/categories" },
      { label: "Guides", value: stats.posts, href: "/admin/blog" },
      { label: "Subscribers", value: stats.subscribers, href: "/admin/subscribers" },
      { label: "Unread messages", value: stats.unread, href: "/admin/messages" },
    ];
    return (
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Overview</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Manage the catalogue, affiliate links, and incoming messages. Click counts are internal analytics, not commission statements.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {cards.map((card) => (
            <Link key={card.label} href={card.href} className="rounded-3xl border border-line bg-white p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{card.label}</p>
              <p className="mt-3 font-heading text-3xl font-semibold text-navy">{card.value}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-xl font-semibold text-navy">Recent products</h2>
            <Link href="/admin/products/new" className="text-sm font-semibold text-emerald-ink">Add product</Link>
          </div>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {stats.recent.length === 0 && <li className="px-5 py-4 text-sm text-muted">No products yet.</li>}
            {stats.recent.map((product) => (
              <li key={product.id} className="flex items-center justify-between gap-4 px-5 py-4 text-sm">
                <span>
                  <span className="font-medium text-navy">{product.name}</span>
                  <span className="mt-1 block text-xs text-muted">{product.category.name} · {product.clickCount} clicks</span>
                </span>
                <Link href={`/admin/products/${product.id}/edit`} className="font-semibold text-navy">Edit</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
}
