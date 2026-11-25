import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="inline-flex rounded-full bg-emerald/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-ink">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-navy md:text-4xl">{title}</h2>
        {description && <p className="mt-3 text-base leading-7 text-muted">{description}</p>}
      </div>
      {href && action && (
        <Link href={href} className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-navy shadow-sm transition hover:border-navy">
          {action}
        </Link>
      )}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.12),transparent_50%)]" />
      <Container className="relative py-12 md:py-16">
        {eyebrow && <p className="inline-flex rounded-full bg-emerald/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-ink">{eyebrow}</p>}
        <h1 className={cn("font-heading text-4xl font-semibold tracking-tight text-navy md:text-5xl", eyebrow && "mt-3")}>{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{description}</p>}
      </Container>
    </div>
  );
}
