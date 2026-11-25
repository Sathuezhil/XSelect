import Link from "next/link";
import { Suspense } from "react";
import { DatabaseNotice } from "@/components/ui/States";
import { listPosts } from "@/services/posts";
import { loadResult } from "@/lib/load";

export default function AdminBlogPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading guides…</p>}>
      <BlogList />
    </Suspense>
  );
}

async function BlogList() {
  const loaded = await loadResult(() => listPosts({ publishedOnly: false, limit: 50 }));
  if (!loaded.ok) return <DatabaseNotice />;
  const posts = loaded.data;
  return (
      <div>
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-3xl font-semibold text-navy">Buying guides</h1>
          <Link href="/admin/blog/new" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Add guide</Link>
        </div>
        <ul className="mt-6 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
          {posts.items.map((post) => (
            <li key={post.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium text-navy">{post.title}</p>
                <p className="text-xs text-muted">{post.published ? "Published" : "Draft"}</p>
              </div>
              <Link href={`/admin/blog/${post.id}/edit`} className="text-sm font-semibold">Edit</Link>
            </li>
          ))}
        </ul>
      </div>
    );
}
