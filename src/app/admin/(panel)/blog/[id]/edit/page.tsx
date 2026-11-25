import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BlogForm } from "@/components/forms/BlogForm";
import { DatabaseNotice } from "@/components/ui/States";
import { getPostById } from "@/services/posts";
import { loadResult } from "@/lib/load";

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading guide…</p>}>
      <EditBlog params={params} />
    </Suspense>
  );
}

async function EditBlog({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const loaded = await loadResult(() => getPostById(id));
  if (!loaded.ok) return <DatabaseNotice />;
  if (!loaded.data) notFound();
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Edit guide</h1>
      <div className="mt-8"><BlogForm post={loaded.data} /></div>
    </div>
  );
}
