"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validators";
import type { z } from "zod";

type Values = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const form = useForm<Values>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: Values) {
    setError("");
    const result = await signIn("credentials", { ...values, redirect: false });
    if (!result || result.error) {
      setError("Those details were not recognised. If you have tried several times, wait a few minutes.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <label className="block text-sm font-medium text-navy">
        Email
        <input type="email" autoComplete="username" className={inputClass} {...form.register("email")} />
        {form.formState.errors.email && <span className="mt-1 block font-normal text-red-700">{form.formState.errors.email.message}</span>}
      </label>
      <label className="block text-sm font-medium text-navy">
        Password
        <input type="password" autoComplete="current-password" className={inputClass} {...form.register("password")} />
        {form.formState.errors.password && <span className="mt-1 block font-normal text-red-700">{form.formState.errors.password.message}</span>}
      </label>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={form.formState.isSubmitting} className="w-full rounded-full bg-navy py-2 text-sm font-semibold text-white disabled:opacity-60">
        {form.formState.isSubmitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

const inputClass = "mt-1.5 w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal outline-none focus:border-navy";
