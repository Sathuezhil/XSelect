import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact the XSelect editorial team in Dubai about the catalogue, a guide, or your newsletter subscription.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Hello" title="Contact us" description="Questions about a guide, a correction, or your subscription can come here. Orders placed on Amazon need to go to Amazon support." />
      <Container className="grid gap-10 py-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4 text-sm leading-7 text-ink">
          <p><span className="font-semibold text-navy">Studio</span><br />{site.location}</p>
          <p><span className="font-semibold text-navy">Email</span><br /><a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>
          <p className="text-muted">We read messages on business days. We cannot look up or change an Amazon order.</p>
        </div>
        <ContactForm />
      </Container>
    </>
  );
}
