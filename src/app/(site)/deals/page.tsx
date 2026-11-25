import { Suspense } from "react";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { PageHeader } from "@/components/ui/SectionHeading";
import { ListingSkeleton } from "@/components/ui/States";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Best deals",
  description: "Editor-selected XSelect picks for shoppers in the UAE. These are curated recommendations, not guaranteed discounts. Confirm the live price on Amazon.ae.",
  path: "/deals",
});

export default function DealsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <PageHeader
        eyebrow="Editor's picks"
        title="Best deals"
        description="A short list of products we think are worth comparing. We do not publish countdown timers, invented percentages off, or claims we cannot verify."
      />
      <Suspense fallback={<ListingSkeleton />}>
        <ProductBrowser searchParams={searchParams} preset={{ basePath: "/deals", deals: true }} />
      </Suspense>
    </>
  );
}
