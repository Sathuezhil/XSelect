import { Suspense } from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageHeader } from "@/components/ui/SectionHeading";
import { DatabaseNotice, EmptyState } from "@/components/ui/States";
import { pageMetadata } from "@/lib/seo";
import { listCategories } from "@/services/categories";
import { loadResult } from "@/lib/load";

export const metadata = pageMetadata({
  title: "Categories",
  description: "Explore XSelect categories covering electronics, home, fashion, beauty, sports, baby, office, and travel products for the UAE.",
  path: "/categories",
});

export default function CategoriesPage() {
  return (
    <>
      <PageHeader eyebrow="Collections" title="Categories" description="Start with a room, a routine, or a trip. Each category is a short edit, not a full marketplace dump." />
      <Suspense fallback={<div className="px-4 py-12 text-sm text-muted">Loading categories…</div>}>
        <CategoryIndex />
      </Suspense>
    </>
  );
}

async function CategoryIndex() {
  const loaded = await loadResult(() => listCategories({ withCounts: true }));
  if (!loaded.ok) return <Container className="py-12"><DatabaseNotice /></Container>;
  const categories = loaded.data;
    if (categories.length === 0) {
      return (
        <Container className="py-12">
          <EmptyState title="No categories yet" body="Add categories from the admin dashboard or run the database seed." />
        </Container>
      );
    }
    return (
      <Container className="grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`} className="group overflow-hidden rounded-[1.6rem] border border-line bg-white">
            <div className="relative aspect-[4/3]">
              <MediaImage src={category.image} alt="" sizes="(min-width: 1024px) 22vw, 50vw" className="transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <h2 className="font-heading text-xl font-semibold text-navy">{category.name}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{category.description}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-ink">
                {category.productCount ?? 0} products
              </p>
            </div>
          </Link>
        ))}
      </Container>
    );
}
