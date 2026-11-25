import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductForm } from "@/components/forms/ProductForm";
import { DatabaseNotice } from "@/components/ui/States";
import { listCategories } from "@/services/categories";
import { getProductById } from "@/services/products";
import { loadResult } from "@/lib/load";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading product…</p>}>
      <EditProduct params={params} />
    </Suspense>
  );
}

async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loaded = await loadResult(() =>
    Promise.all([getProductById(id), listCategories({ includeInactive: true })]),
  );
  if (!loaded.ok) return <DatabaseNotice />;
  const [product, categories] = loaded.data;
  if (!product) notFound();
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Edit product</h1>
      <div className="mt-8"><ProductForm product={product} categories={categories} /></div>
    </div>
  );
}
