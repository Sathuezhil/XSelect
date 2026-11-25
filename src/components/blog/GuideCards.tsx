import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";
import type { PostDTO } from "@/types";

export function GuideCards({ posts }: { posts: PostDTO[] }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Latest buying guides"
          title="Read before you buy"
          description="Short comparisons and practical notes for shopping from the UAE."
          href="/blog"
          action="All guides"
        />
        {posts.length === 0 ? (
          <p className="mt-8 text-sm text-muted">Guides will show here after they are published.</p>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="group overflow-hidden rounded-[1.6rem] bg-white shadow-[0_18px_40px_-30px_rgba(9,25,50,0.5)] ring-1 ring-slate-200/80 transition duration-300 hover:-translate-y-1">
                <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden">
                  <MediaImage src={post.coverImage} alt="" sizes="(min-width: 1024px) 30vw, 100vw" className="transition duration-500 group-hover:scale-105" />
                </Link>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">{formatDate(post.createdAt)}</p>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-navy">
                    <Link href={`/blog/${post.slug}`} className="hover:text-emerald-ink">{post.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
