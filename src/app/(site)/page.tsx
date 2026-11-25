import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { HomeCatalogue } from "@/components/home/HomeCatalogue";
import { NewsletterBand } from "@/components/home/NewsletterBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { ListingSkeleton } from "@/components/ui/States";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          description: site.description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${site.url}/shop?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <Hero />
      <Suspense fallback={<ListingSkeleton />}>
        <HomeCatalogue />
      </Suspense>
      <NewsletterBand />
    </>
  );
}
