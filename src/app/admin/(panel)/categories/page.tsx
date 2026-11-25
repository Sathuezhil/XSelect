import Link from "next/link";
import { Suspense } from "react";
import { DatabaseNotice } from "@/components/ui/States";
import { listCategories } from "@/services/categories";
import { loadResult } from "@/lib/load";

export default function AdminCategoriesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading categories…</p>}>
      <CategoryList />
    </Suspense>
  );
}

async function CategoryList() {
  const loaded = await loadResult(() => listCategories({ includeInactive: true, withCounts: true }));
  if (!loaded.ok) return <DatabaseNotice />;
  const categories = loaded.data;
  return (
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-heading text-3xl font-semibold text-navy">Categories</h1>
          <Link href="/admin/categories/new" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Add category</Link>
        </div>
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium text-navy">{category.name}</p>
                <p className="text-xs text-muted">{category.productCount ?? 0} active products · {category.active ? "Visible" : "Hidden"}</p>
              </div>
              <Link href={`/admin/categories/${category.id}/edit`} className="text-sm font-semibold text-navy">Edit</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}
