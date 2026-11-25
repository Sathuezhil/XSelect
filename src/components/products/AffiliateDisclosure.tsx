import Link from "next/link";

export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="text-xs leading-5 text-muted">
        XSelect participates in the Amazon Associates Programme. Qualifying purchases may earn us a commission. A click does not guarantee a commission and does not change the price you pay.{" "}
        <Link href="/affiliate-disclosure" className="font-medium text-navy underline underline-offset-2">
          Affiliate disclosure
        </Link>
      </p>
    );
  }

  return (
    <aside className="rounded-3xl border border-line bg-white p-6 text-sm leading-7 text-ink">
      <h2 className="font-heading text-xl font-semibold text-navy">Affiliate disclosure</h2>
      <p className="mt-3">
        XSelect is a participant in the Amazon Associates Programme, an affiliate advertising programme designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.ae.
      </p>
      <p className="mt-3">
        If you buy through links on this site, we may earn a commission from a qualifying purchase. That does not increase the price you pay. We do not promise that any click will earn a commission, and we do not publish fixed commission rates.
      </p>
      <p className="mt-3">
        Prices, availability, delivery, and returns are confirmed on Amazon.ae at the time you order. XSelect does not sell products, take payment, or operate a shopping cart.
      </p>
    </aside>
  );
}
