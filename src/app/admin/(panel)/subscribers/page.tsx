import { Suspense } from "react";
import { SubscriberTable } from "@/components/admin/SubscriberTable";
import { DatabaseNotice } from "@/components/ui/States";
import { listSubscribers } from "@/services/inbox";
import { loadResult } from "@/lib/load";

export default function SubscribersPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading subscribers…</p>}>
      <Subscribers />
    </Suspense>
  );
}

async function Subscribers() {
  const loaded = await loadResult(() => listSubscribers());
  if (!loaded.ok) return <DatabaseNotice />;
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Newsletter subscribers</h1>
      <p className="mt-2 text-sm text-muted">Only addresses with recorded consent are stored.</p>
      <SubscriberTable subscribers={loaded.data} />
    </div>
  );
}
