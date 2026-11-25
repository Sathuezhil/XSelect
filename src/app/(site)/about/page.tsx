import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "XSelect is an independent shopping discovery brand for the United Arab Emirates, linking readers to Amazon.ae.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="The brand" title="About XSelect" description="Discover More. Shop Smarter." />
      <Container className="max-w-3xl space-y-5 py-12 text-[17px] leading-8 text-ink">
        <p>
          XSelect is a shopping discovery guide for people living in the United Arab Emirates. We publish a short catalogue of products and buying notes, then send you to Amazon.ae when you want to purchase.
        </p>
        <p>
          We are not a retailer, a marketplace, or an Amazon storefront. We do not hold stock, take payment, or manage delivery. Amazon remains responsible for the product page, the price you see at checkout, and the order itself.
        </p>
        <p>
          The edit is deliberately small. A useful recommendation explains what a product is good for and where it falls short. We do not publish invented star ratings, fabricated customer reviews, or discount claims we cannot stand behind.
        </p>
        <p>
          Demonstration products in this preview are clearly labelled. Replace them with products you are allowed to feature, using images you have rights to and affiliate links from your own Amazon Associates account.
        </p>
      </Container>
    </>
  );
}
