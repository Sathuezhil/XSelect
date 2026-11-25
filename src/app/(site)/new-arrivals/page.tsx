import { Suspense } from "react";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { PageHeader } from "@/components/ui/SectionHeading";
import { ListingSkeleton } from "@/components/ui/States";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "New arrivals",
  description: "Recently added products in the XSelect catalogue for Amazon.ae shoppers.",
  path: "/new-arrivals",
});

export default function NewArrivalsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <>
      <PageHeader
        eyebrow="Just added"
        title="New arrivals"
        description="The latest products added to XSelect. New does not mean discounted."
      />
      <Suspense fallback={<ListingSkeleton />}>
        <ProductBrowser searchParams={searchParams} preset={{ basePath: "/new-arrivals", isNewArrival: true }} />
      </Suspense>
    </>
  );
}
