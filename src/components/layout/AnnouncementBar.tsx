import Link from "next/link";

export function AnnouncementBar() {
  return (
    <div className="border-b border-line bg-white text-navy">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
        <span>Handpicked for shoppers in the UAE. Purchases are completed on Amazon.ae.</span>
        <Link href="/deals" className="hidden font-semibold text-emerald-ink underline-offset-2 hover:underline sm:inline">
          See editor picks
        </Link>
      </p>
    </div>
  );
}
