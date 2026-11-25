import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/ui/SectionHeading";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How XSelect handles contact messages, newsletter subscriptions, and admin access.",
  path: "/privacy-policy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy policy" description="This policy describes the information this website stores. It is not a substitute for advice from your own counsel." />
      <Container className="prose-page max-w-3xl space-y-4 py-12 text-sm leading-7 text-ink">
        <p>XSelect collects only what the public forms ask for, plus the technical data required to run the site and protect the admin area.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">What we store</h2>
        <p>If you join the newsletter, we store your email address and the fact that you consented. If you send the contact form, we store your name, email, subject, and message. Admin accounts store a name, email, and a hashed password. We also store a simple count of outbound Amazon clicks for each product.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Why we store it</h2>
        <p>Newsletter addresses are used to send the occasional product note you opted into. Contact messages are used to reply. Admin credentials are used to protect the dashboard. Click counts help us understand which pages are used. We do not sell these lists.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Cookies</h2>
        <p>The public catalogue does not require an account. A session cookie is set when an editor signs in to the admin dashboard. That cookie is used to keep the editor signed in.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">How long we keep it</h2>
        <p>We keep messages and subscriptions until you ask us to delete them or until an editor removes them. You can email {site.email} to request access or deletion of your newsletter or contact record.</p>
        <h2 className="pt-4 font-heading text-2xl font-semibold text-navy">Amazon</h2>
        <p>When you follow a link to Amazon.ae, Amazon&apos;s own privacy notice applies to anything you do on that site. XSelect does not receive your Amazon account details.</p>
      </Container>
    </>
  );
}
