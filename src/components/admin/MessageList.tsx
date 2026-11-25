"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatDate } from "@/lib/utils";
import type { MessageDTO } from "@/types";

export function MessageList({ messages }: { messages: MessageDTO[] }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function markRead(id: string) {
    const response = await fetch(`/api/contact/${id}`, { method: "PATCH" });
    if (!response.ok) {
      setError("Could not update that message.");
      return;
    }
    router.refresh();
  }

  if (messages.length === 0) return <p className="mt-6 text-sm text-muted">No messages yet.</p>;

  return (
    <div className="mt-6 space-y-4">
      {error && <p className="text-sm text-red-700">{error}</p>}
      {messages.map((message) => (
        <article key={message.id} className="rounded-3xl border border-line bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-navy">{message.subject}</h2>
              <p className="text-xs text-muted">{message.name} · {message.email} · {formatDate(message.createdAt)}</p>
            </div>
            {!message.read && (
              <button type="button" onClick={() => markRead(message.id)} className="text-sm font-semibold text-emerald-ink">
                Mark read
              </button>
            )}
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-ink">{message.message}</p>
        </article>
      ))}
    </div>
  );
}
