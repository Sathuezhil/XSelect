import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader } from "@/components/ui/SectionHeading";
import { DatabaseNotice, EmptyState } from "@/components/ui/States";
import { Pagination } from "@/components/ui/Pagination";
import { pageMetadata } from "@/lib/seo";
import { formatDate, pageNumber } from "@/lib/utils";
import { listPosts } from "@/services/posts";
import { loadResult } from "@/lib/load";

export const metadata = pageMetadata({
  title: "Buying guides",
  description: "Practical buying guides and product comparisons from XSelect for shoppers in the UAE.",
  path: "/blog",
});

export default function BlogPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <PageHeader eyebrow="Journal" title="Buying guides" description="Short, practical notes to help you decide what is worth opening on Amazon.ae." />
      <Suspense fallback={<Container className="py-12 text-sm text-muted">Loading guides…</Container>}>
        <GuideIndex searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function GuideIndex({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const page = pageNumber(params.page);
  const loaded = await loadResult(() => listPosts({ page, limit: 9, publishedOnly: true }));
  if (!loaded.ok) return <Container className="py-12"><DatabaseNotice /></Container>;
  const result = loaded.data;
    if (result.items.length === 0) {
      return <Container className="py-12"><EmptyState title="No guides yet" body="Published articles will appear here." /></Container>;
    }
    return (
      <Container className="py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {result.items.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-[1.6rem] border border-line bg-white">
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10]">
                <MediaImage src={post.coverImage} alt="" sizes="(min-width: 1024px) 30vw, 100vw" />
              </Link>
              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-muted">{formatDate(post.createdAt)}</p>
                <h2 className="mt-2 font-heading text-2xl font-semibold text-navy">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        <Pagination page={result.page} totalPages={result.totalPages} pathname="/blog" query={{}} />
      </Container>
    );
}
