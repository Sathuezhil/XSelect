import { Suspense } from "react";
import { ProductForm } from "@/components/forms/ProductForm";
import { DatabaseNotice } from "@/components/ui/States";
import { listCategories } from "@/services/categories";
import { loadResult } from "@/lib/load";

export default function NewProductPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading form…</p>}>
      <NewProduct />
    </Suspense>
  );
}

async function NewProduct() {
  const loaded = await loadResult(() => listCategories({ includeInactive: true }));
  if (!loaded.ok) return <DatabaseNotice />;
  const categories = loaded.data;
  return (
      <div>
        <h1 className="font-heading text-3xl font-semibold text-navy">Add product</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">Use Amazon.ae links only. Leave demonstration content checked until the product, images, and affiliate tag are real.</p>
        <div className="mt-8">
          {categories.length === 0 ? <p className="text-sm text-muted">Create a category before adding a product.</p> : <ProductForm categories={categories} />}
        </div>
      </div>
    );
}
