"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryInput } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import type { CategoryDTO } from "@/types";

export function CategoryForm({ category }: { category?: CategoryDTO }) {
  const router = useRouter();
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      image: category?.image ?? "",
      sortOrder: category?.sortOrder ?? 0,
      active: category?.active ?? true,
      seoTitle: category?.seoTitle ?? "",
      seoDescription: category?.seoDescription ?? "",
    },
  });

  async function onSubmit(values: CategoryInput) {
    const payload = { ...values, slug: slugify(values.slug || values.name) };
    const response = await fetch(category ? `/api/categories/${category.id}` : "/api/categories", {
      method: category ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) {
      form.setError("root", { message: body.error ?? "Could not save the category." });
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  }

  async function onDelete() {
    if (!category || !confirm("Delete this category?")) return;
    const response = await fetch(`/api/categories/${category.id}`, { method: "DELETE" });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) {
      form.setError("root", { message: body.error ?? "Could not delete the category." });
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
      <label className="block text-sm font-medium">Name<input className={inputClass} {...form.register("name")} /></label>
      <label className="block text-sm font-medium">Slug<input className={inputClass} {...form.register("slug")} /></label>
      <label className="block text-sm font-medium">Description<textarea className={inputClass} rows={4} {...form.register("description")} /></label>
      <label className="block text-sm font-medium">Image URL<input className={inputClass} {...form.register("image")} /></label>
      <label className="block text-sm font-medium">Sort order<input type="number" className={inputClass} {...form.register("sortOrder", { valueAsNumber: true })} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register("active")} /> Active</label>
      <label className="block text-sm font-medium">SEO title<input className={inputClass} {...form.register("seoTitle")} /></label>
      <label className="block text-sm font-medium">SEO description<input className={inputClass} {...form.register("seoDescription")} /></label>
      {form.formState.errors.root && <p className="text-sm text-red-700">{form.formState.errors.root.message}</p>}
      <div className="flex gap-3">
        <button className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white" disabled={form.formState.isSubmitting}>Save category</button>
        {category && <button type="button" onClick={onDelete} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">Delete</button>}
      </div>
    </form>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal outline-none focus:border-navy";
