import Link from "next/link";
import { Suspense } from "react";
import { DatabaseNotice, EmptyState } from "@/components/ui/States";
import { listProducts } from "@/services/products";
import { oneParam, pageNumber } from "@/lib/utils";
import { loadResult } from "@/lib/load";

export default function AdminProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading products…</p>}>
      <ProductTable searchParams={searchParams} />
    </Suspense>
  );
}

async function ProductTable({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const q = oneParam(params.q);
  const loaded = await loadResult(() =>
    listProducts({ q, page: pageNumber(params.page), limit: 20, includeInactive: true }),
  );
  if (!loaded.ok) return <DatabaseNotice />;
  const result = loaded.data;
  return (
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl font-semibold text-navy">Products</h1>
            <p className="mt-2 text-sm text-muted">Affiliate URLs, images, and publication status.</p>
          </div>
          <Link href="/admin/products/new" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Add product</Link>
        </div>
        <form className="mt-6 flex gap-2" action="/admin/products">
          <input name="q" defaultValue={q} placeholder="Search name or brand" className="w-full max-w-sm rounded-full border border-line px-4 py-2 text-sm" />
          <button className="rounded-full border border-line px-4 text-sm font-semibold">Search</button>
        </form>
        {result.items.length === 0 ? (
          <div className="mt-6"><EmptyState title="No products" body="Add a product or run the seed script." /></div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Clicks</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {result.items.map((product) => (
                  <tr key={product.id} className="border-t border-line">
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy">{product.name}</p>
                      <p className="text-xs text-muted">{product.brand} · {product.category.name}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted">
                      {[product.active ? "Active" : "Hidden", product.isDemo ? "Demo" : "Live", product.featured ? "Featured" : ""].filter(Boolean).join(" · ")}
                    </td>
                    <td className="px-4 py-3">{product.clickCount}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/products/${product.id}/edit`} className="font-semibold text-navy">Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
}
