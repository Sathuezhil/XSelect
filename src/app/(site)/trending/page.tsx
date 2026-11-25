import { Suspense } from "react";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { PageHeader } from "@/components/ui/SectionHeading";
import { ListingSkeleton } from "@/components/ui/States";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Trending products",
  description: "Products the XSelect editors are highlighting for shoppers in the United Arab Emirates.",
  path: "/trending",
});

export default function TrendingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <PageHeader
        eyebrow="Popular now"
        title="Trending products"
        description="This list is an editorial selection. It is not an Amazon sales rank and it is not a promise of availability."
      />
      <Suspense fallback={<ListingSkeleton />}>
        <ProductBrowser searchParams={searchParams} preset={{ basePath: "/trending", trending: true }} />
      </Suspense>
    </>
  );
}
