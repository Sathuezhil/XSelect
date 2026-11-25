import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CategoryForm } from "@/components/forms/CategoryForm";
import { DatabaseNotice } from "@/components/ui/States";
import { getCategoryById } from "@/services/categories";
import { loadResult } from "@/lib/load";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading category…</p>}>
      <EditCategory params={params} />
    </Suspense>
  );
}

async function EditCategory({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loaded = await loadResult(() => getCategoryById(id));
  if (!loaded.ok) return <DatabaseNotice />;
  if (!loaded.data) notFound();
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Edit category</h1>
      <div className="mt-8"><CategoryForm category={loaded.data} /></div>
    </div>
  );
}
