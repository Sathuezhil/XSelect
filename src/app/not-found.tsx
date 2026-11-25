import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-start justify-center px-6 py-20">
      <Logo />
      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-ink">404</p>
      <h1 className="mt-3 font-heading text-4xl font-semibold text-navy">That page is not in the edit.</h1>
      <p className="mt-3 text-sm leading-6 text-muted">The link may be out of date, or the product may have been unpublished.</p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">Home</Link>
        <Link href="/shop" className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy">Shop</Link>
      </div>
    </div>
  );
}
