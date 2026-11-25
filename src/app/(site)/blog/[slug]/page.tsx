import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate } from "@/lib/utils";
import { site } from "@/lib/site";
import { getPostBySlug } from "@/services/posts";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) return { title: "Guide" };
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title, description, url: `/blog/${post.slug}`, type: "article" },
  };
}

export default function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<Container className="py-16 text-sm text-muted">Loading guide…</Container>}>
      <Article params={params} />
    </Suspense>
  );
}

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);
  if (!post) notFound();
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Guides", href: "/blog" }, { label: post.title }]} />
      <article className="mx-auto mt-8 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">{formatDate(post.createdAt)} · {post.author}</p>
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-navy md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{post.excerpt}</p>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.75rem]">
          <MediaImage src={post.coverImage} alt="" priority sizes="(min-width: 768px) 768px, 100vw" />
        </div>
        <div className="mt-10">
          <ArticleBody content={post.content} />
        </div>
        {post.tags.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy">{tag}</li>
            ))}
          </ul>
        )}
        <p className="mt-10 text-sm leading-6 text-muted">
          Product mentions are editorial. If you decide to buy, do it on Amazon.ae and confirm the live price there.{" "}
          <Link href="/shop" className="font-semibold text-navy underline">Browse the catalogue</Link>.
        </p>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}/blog/${post.slug}`,
        }}
      />
    </Container>
  );
}
