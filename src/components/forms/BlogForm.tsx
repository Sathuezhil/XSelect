"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { postSchema } from "@/lib/validators";
import { slugify } from "@/lib/utils";
import type { PostDTO } from "@/types";

const formSchema = z.object({
  title: z.string().min(4),
  slug: z.string().min(2),
  excerpt: z.string().min(20),
  content: z.string().min(40),
  coverImage: z.string().min(4),
  tagsText: z.string(),
  author: z.string().min(2),
  published: z.boolean(),
  seoTitle: z.string(),
  seoDescription: z.string(),
});

type Values = z.infer<typeof formSchema>;

export function BlogForm({ post }: { post?: PostDTO }) {
  const router = useRouter();
  const form = useForm<Values>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title ?? "",
      slug: post?.slug ?? "",
      excerpt: post?.excerpt ?? "",
      content: post?.content ?? "",
      coverImage: post?.coverImage ?? "",
      tagsText: post?.tags.join(", ") ?? "",
      author: post?.author ?? "XSelect Editors",
      published: post?.published ?? false,
      seoTitle: post?.seoTitle ?? "",
      seoDescription: post?.seoDescription ?? "",
    },
  });

  async function onSubmit(values: Values) {
    const payload = {
      ...values,
      slug: slugify(values.slug || values.title),
      tags: values.tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
    };
    const parsed = postSchema.safeParse(payload);
    if (!parsed.success) {
      form.setError("root", { message: parsed.error.issues[0]?.message ?? "Check the article." });
      return;
    }
    const response = await fetch(post ? `/api/blog/${post.id}` : "/api/blog", {
      method: post ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) {
      form.setError("root", { message: body.error ?? "Could not save the article." });
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  async function onDelete() {
    if (!post || !confirm("Delete this article?")) return;
    const response = await fetch(`/api/blog/${post.id}`, { method: "DELETE" });
    if (!response.ok) {
      form.setError("root", { message: "Could not delete the article." });
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl space-y-4">
      <label className="block text-sm font-medium">Title<input className={inputClass} {...form.register("title")} /></label>
      <label className="block text-sm font-medium">Slug<input className={inputClass} {...form.register("slug")} /></label>
      <label className="block text-sm font-medium">Excerpt<textarea className={inputClass} rows={3} {...form.register("excerpt")} /></label>
      <label className="block text-sm font-medium">Content<textarea className={inputClass} rows={14} {...form.register("content")} /></label>
      <p className="text-xs text-muted">Separate paragraphs with a blank line. Start a line with ## for a heading or - for a list item.</p>
      <label className="block text-sm font-medium">Cover image URL<input className={inputClass} {...form.register("coverImage")} /></label>
      <label className="block text-sm font-medium">Tags<input className={inputClass} placeholder="earbuds, commuting" {...form.register("tagsText")} /></label>
      <label className="block text-sm font-medium">Author<input className={inputClass} {...form.register("author")} /></label>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...form.register("published")} /> Published</label>
      <label className="block text-sm font-medium">SEO title<input className={inputClass} {...form.register("seoTitle")} /></label>
      <label className="block text-sm font-medium">SEO description<input className={inputClass} {...form.register("seoDescription")} /></label>
      {form.formState.errors.root && <p className="text-sm text-red-700">{form.formState.errors.root.message}</p>}
      <div className="flex gap-3">
        <button className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white" disabled={form.formState.isSubmitting}>Save article</button>
        {post && <button type="button" onClick={onDelete} className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700">Delete</button>}
      </div>
    </form>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal outline-none focus:border-navy";
