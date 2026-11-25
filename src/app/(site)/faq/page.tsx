import { FaqList } from "@/components/faq/FaqList";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "FAQ",
  description: "Answers about how XSelect works, affiliate links, prices, and Amazon.ae orders.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="Help" title="Frequently asked questions" description="A few straight answers before you click through to Amazon." />
      <Container className="max-w-3xl py-12">
        <FaqList />
      </Container>
    </>
  );
}
