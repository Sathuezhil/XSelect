"use client";

export default function SiteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-semibold text-navy">This page could not be loaded</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Try again in a moment. If the catalogue database is offline, the rest of the site should still open.</p>
      <button type="button" onClick={() => reset()} className="mt-6 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white">
        Try again
      </button>
    </div>
  );
}
