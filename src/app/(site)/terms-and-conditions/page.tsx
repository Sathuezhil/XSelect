import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and conditions",
  description: "Terms for using the XSelect shopping discovery website.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms and conditions" description="By using this website you agree to the points below. Have your own counsel review them before a public launch." />
      <Container className="max-w-3xl space-y-4 py-12 text-sm leading-7 text-ink">
        <p>XSelect provides product information and links for general guidance. Catalogue entries can be incomplete, and demonstration content is not an offer to sell.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">No checkout on this site</h2>
        <p>Purchases happen on Amazon.ae. The contract for a product is between you and Amazon, or the seller Amazon identifies. XSelect is not a party to that sale and cannot accept returns.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Affiliate links</h2>
        <p>Some links are affiliate links. We may earn a commission from a qualifying purchase. We do not guarantee that a click earns a commission, and we do not set Amazon&apos;s prices or commission rates.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Acceptable use</h2>
        <p>Do not misuse the forms, attempt to access the admin area without permission, or submit unlawful content. We may remove content and block abusive traffic.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Liability</h2>
        <p>The site is provided as available information. To the extent the law allows, XSelect is not liable for losses arising from reliance on a product description, an unavailable Amazon listing, or a purchase completed on Amazon.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Contact</h2>
        <p>Questions about these terms can be sent through the contact page.</p>
      </Container>
    </>
  );
}
