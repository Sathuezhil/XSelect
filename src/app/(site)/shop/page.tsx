import { Suspense } from "react";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { PageHeader } from "@/components/ui/SectionHeading";
import { ListingSkeleton } from "@/components/ui/States";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Shop all",
  description: "Browse XSelect's curated product catalogue for shoppers in the UAE and continue to Amazon.ae when you are ready to buy.",
  path: "/shop",
});

export default function ShopPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <PageHeader
        eyebrow="Catalogue"
        title="Shop all"
        description="Search by name or brand, filter by category, and sort the edit. Prices appear only when a current figure is on file."
      />
      <Suspense fallback={<ListingSkeleton />}>
        <ProductBrowser searchParams={searchParams} preset={{ basePath: "/shop", showFilters: true }} />
      </Suspense>
    </>
  );
}
