import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/AdminNav";
import { getAdminSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-muted">Checking access…</div>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return (
    <div className="min-h-screen bg-canvas lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
      <AdminNav email={session.user.email ?? ""} />
      <div className="min-w-0 px-4 py-6 sm:px-8 sm:py-8">{children}</div>
    </div>
  );
}
