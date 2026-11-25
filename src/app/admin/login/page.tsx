import { Suspense } from "react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/forms/LoginForm";
import { Logo } from "@/components/layout/Logo";
import { getAdminSession } from "@/lib/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="grid min-h-screen place-items-center text-sm text-muted">Loading…</div>}>
      <LoginGate />
    </Suspense>
  );
}

async function LoginGate() {
  const session = await getAdminSession();
  if (session) redirect("/admin");
  return (
    <div className="grid min-h-screen place-items-center px-4 py-16">
      <div className="w-full max-w-md rounded-[1.75rem] border border-line bg-white p-8 shadow-[0_20px_60px_-40px_rgba(17,24,39,0.6)]">
        <Logo compact />
        <h1 className="mt-8 font-heading text-3xl font-semibold text-navy">Editor sign in</h1>
        <p className="mt-2 text-sm leading-6 text-muted">This area is for XSelect administrators. Catalogue data is not visible to shoppers until you publish it.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
