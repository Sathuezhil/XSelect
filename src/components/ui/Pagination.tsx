import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  pathname,
  query,
}: {
  page: number;
  totalPages: number;
  pathname: string;
  query: Record<string, string>;
}) {
  if (totalPages <= 1) return null;
  const href = (nextPage: number) => {
    const params = new URLSearchParams(query);
    params.set("page", String(nextPage));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-3 text-sm">
      {page > 1 ? (
        <Link href={href(page - 1)} className="rounded-full border border-line bg-white px-4 py-2 font-semibold text-navy hover:border-navy">
          Previous
        </Link>
      ) : (
        <span className="rounded-full border border-line px-4 py-2 text-muted">Previous</span>
      )}
      <span className="text-muted">Page {page} of {totalPages}</span>
      {page < totalPages ? (
        <Link href={href(page + 1)} className="rounded-full border border-line bg-white px-4 py-2 font-semibold text-navy hover:border-navy">
          Next
        </Link>
      ) : (
        <span className="rounded-full border border-line px-4 py-2 text-muted">Next</span>
      )}
    </nav>
  );
}
