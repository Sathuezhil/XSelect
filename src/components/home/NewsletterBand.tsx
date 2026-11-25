import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function NewsletterBand() {
  return (
    <section className="pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-brand px-6 py-12 text-white shadow-[0_30px_70px_-40px_rgba(9,25,50,0.8)] sm:px-10 md:py-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-8 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald">Newsletter</p>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-semibold md:text-4xl">A short note when the edit changes.</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
              No daily blasts. We only write when there is a new guide or a catalogue update worth your time.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
