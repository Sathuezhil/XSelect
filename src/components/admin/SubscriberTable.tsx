"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubscriberDTO } from "@/types";

export function SubscriberTable({ subscribers }: { subscribers: SubscriberDTO[] }) {
  const router = useRouter();
  const [error, setError] = useState("");

  async function remove(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    const response = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Could not remove that subscriber.");
      return;
    }
    router.refresh();
  }

  if (subscribers.length === 0) return <p className="mt-6 text-sm text-muted">No subscribers yet.</p>;

  return (
    <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-white">
      {error && <p className="px-4 py-3 text-sm text-red-700">{error}</p>}
      <table className="min-w-full text-left text-sm">
        <thead className="text-xs uppercase text-muted">
          <tr>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Consent</th>
            <th className="px-4 py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id} className="border-t border-line">
              <td className="px-4 py-3">{subscriber.email}</td>
              <td className="px-4 py-3">{subscriber.consent ? "Yes" : "No"}</td>
              <td className="px-4 py-3 text-right">
                <button type="button" onClick={() => remove(subscriber.id)} className="text-sm font-semibold text-red-700">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
