import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { PageHeader } from "@/components/ui/SectionHeading";
import { ListingSkeleton } from "@/components/ui/States";
import { getCategoryBySlug } from "@/services/categories";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug).catch(() => null);
  const title = category?.seoTitle || category?.name || "Category";
  const description = category?.seoDescription || category?.description || "Browse this XSelect category.";
  return {
    title,
    description,
    alternates: { canonical: `/categories/${slug}` },
    openGraph: { title, description, url: `/categories/${slug}` },
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryContent({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug).catch(() => null);
  if (!category) notFound();
  return (
    <>
      <PageHeader
        eyebrow="Category"
        title={category?.name ?? "Category"}
        description={category?.description ?? "This category is not available right now."}
      />
      <ProductBrowser searchParams={searchParams} preset={{ basePath: `/categories/${slug}`, categorySlug: slug, showFilters: false }} />
    </>
  );
}
