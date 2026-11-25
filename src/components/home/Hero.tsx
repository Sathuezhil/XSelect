import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaImage } from "@/components/ui/MediaImage";
import { heroImages } from "@/lib/site";
import { buttonClass } from "@/components/ui/button-styles";

const notes = ["Edited for the UAE", "Checkout stays on Amazon.ae", "No second cart"];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.18),transparent_46%),radial-gradient(ellipse_at_80%_20%,rgba(9,25,50,0.07),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f6f8fb_100%)]" />
      <Container className="relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-ink shadow-sm ring-1 ring-emerald/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
            United Arab Emirates
          </p>
          <h1 className="mt-5 max-w-xl font-heading text-5xl font-semibold leading-[1.02] tracking-tight text-navy sm:text-6xl">
            Find your next favourite product.
          </h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-muted">
            Discover handpicked products, explore smart finds and shop with confidence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/shop" className={buttonClass("accent", "shadow-[0_10px_24px_-14px_rgba(16,185,129,0.9)]")}>Explore Products</Link>
            <Link href="/categories" className={buttonClass("ghost")}>Browse categories</Link>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {notes.map((note) => (
              <li key={note} className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-medium text-navy ring-1 ring-line">
                {note}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative grid grid-cols-5 gap-3">
          <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-[1.85rem] shadow-[0_30px_60px_-36px_rgba(9,25,50,0.7)] ring-1 ring-white">
            <MediaImage src={heroImages.retail} alt="Bright retail interior with clothing and accessories" priority sizes="(min-width: 1024px) 30vw, 70vw" />
          </div>
          <div className="col-span-2 flex flex-col gap-3">
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-[0_20px_40px_-28px_rgba(9,25,50,0.65)] ring-1 ring-white">
              <MediaImage src={heroImages.watch} alt="Minimal wristwatch on a neutral surface" sizes="20vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-[0_20px_40px_-28px_rgba(9,25,50,0.65)] ring-1 ring-white">
              <MediaImage src={heroImages.headphones} alt="Over-ear headphones in a studio setting" sizes="20vw" />
            </div>
          </div>
          <div className="absolute bottom-5 left-5 max-w-[15rem] rounded-2xl border border-white/20 bg-brand/90 px-4 py-3 text-white shadow-xl backdrop-blur-md">
            <p className="text-[11px] uppercase tracking-[0.16em] text-emerald">Amazon.ae</p>
            <p className="mt-1 text-sm font-medium leading-5">Curated finds. Checkout stays with Amazon.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
