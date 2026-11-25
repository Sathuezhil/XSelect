import { BadgeCheck, Compass, MousePointerClick, Store } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  {
    icon: BadgeCheck,
    title: "Carefully selected products",
    body: "Editors choose a short list instead of dumping an entire marketplace onto the page.",
  },
  {
    icon: Compass,
    title: "Helpful product discoveries",
    body: "Guides explain who a product suits, and where it is less useful, without invented ratings.",
  },
  {
    icon: MousePointerClick,
    title: "Easy shopping experience",
    body: "Compare here, then continue to Amazon.ae. There is no cart and no second checkout.",
  },
  {
    icon: Store,
    title: "Trusted shopping destinations",
    body: "Outbound links are limited to Amazon.ae so the purchase stays with a familiar store.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        <SectionHeading eyebrow="Why XSelect" title="A calmer way to decide" description="We help you narrow the field. Amazon handles the order, delivery, and returns." />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => (
            <article key={point.title} className="rounded-[1.6rem] border border-line bg-gradient-to-b from-white to-canvas p-6 shadow-[0_16px_40px_-32px_rgba(9,25,50,0.55)]">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald/10 text-emerald-ink">
                  <point.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="font-heading text-sm text-muted">0{index + 1}</span>
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-navy">{point.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{point.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
