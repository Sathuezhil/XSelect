import { AffiliateDisclosure } from "@/components/products/AffiliateDisclosure";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Affiliate disclosure",
  description: "How XSelect uses Amazon Associates links for shoppers in the United Arab Emirates.",
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <>
      <PageHeader eyebrow="Transparency" title="Affiliate disclosure" description="Please read this before you use a shopping link on XSelect." />
      <Container className="max-w-3xl space-y-6 py-12">
        <AffiliateDisclosure />
        <div className="space-y-4 text-sm leading-7 text-ink">
          <p>
            Links labelled Buy on Amazon open Amazon.ae in a new tab. We record that an outbound click happened so we can see which guides are useful. That internal count is not a sales report, and it does not mean a commission was earned.
          </p>
          <p>
            Amazon Associates operating policies apply to this site. We do not scrape Amazon, we do not present unofficial Amazon images as our own product photography, and we do not display a price unless it was recorded recently and the product is not demonstration content.
          </p>
          <p>
            Demonstration products in a preview build use stock photography and search links. They are labelled Demo and must be replaced before you rely on the catalogue commercially.
          </p>
        </div>
      </Container>
    </>
  );
}
