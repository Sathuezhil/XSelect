import { Suspense } from "react";
import { MessageList } from "@/components/admin/MessageList";
import { DatabaseNotice } from "@/components/ui/States";
import { listMessages } from "@/services/inbox";
import { loadResult } from "@/lib/load";

export default function MessagesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">Loading messages…</p>}>
      <Messages />
    </Suspense>
  );
}

async function Messages() {
  const loaded = await loadResult(() => listMessages());
  if (!loaded.ok) return <DatabaseNotice />;
  return (
    <div>
      <h1 className="font-heading text-3xl font-semibold text-navy">Contact messages</h1>
      <MessageList messages={loaded.data} />
    </div>
  );
}
