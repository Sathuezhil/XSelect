export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <h2 className="font-heading text-2xl font-semibold text-navy">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}

export function DatabaseNotice() {
  return (
    <EmptyState
      title="The catalogue is not connected"
      body="Start MongoDB, set MONGODB_URI, and run the seed script. Public pages stay available while the database is offline."
    />
  );
}

export function ListingSkeleton() {
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="h-80 animate-pulse rounded-3xl bg-white" />
      ))}
    </div>
  );
}
