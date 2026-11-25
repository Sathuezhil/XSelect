"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";

const schema = z.object({
  email: z.email("Enter a valid email address"),
  consent: z.literal(true, { error: "Please confirm you want to hear from us." }),
  website: z.string().optional(),
});

type Values = z.infer<typeof schema>;

export function NewsletterForm() {
  const [message, setMessage] = useState("");
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", consent: false as unknown as true, website: "" },
  });

  async function onSubmit(values: Values) {
    setMessage("");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const body = (await response.json()) as { error?: string; status?: string };
    if (!response.ok) {
      setMessage(body.error ?? "We could not save that email.");
      return;
    }
    form.reset();
    setMessage(body.status === "exists" ? "You are already on the list." : "You are subscribed. Thank you.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-email">Email</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Email address"
          className="w-full rounded-full border border-white/15 bg-white px-4 py-2 text-sm text-ink outline-none"
          {...form.register("email")}
        />
        <button type="submit" disabled={form.formState.isSubmitting} className="rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-navy disabled:opacity-60">
          {form.formState.isSubmitting ? "Saving…" : "Subscribe"}
        </button>
      </div>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...form.register("website")} />
      <label className="flex items-start gap-2 text-sm text-white/80">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-emerald" {...form.register("consent")} />
        <span>
          I agree to receive occasional product notes from XSelect and I have read the{" "}
          <Link href="/privacy-policy" className="underline">privacy policy</Link>.
        </span>
      </label>
      {form.formState.errors.email && <p className="text-sm text-emerald">{form.formState.errors.email.message}</p>}
      {form.formState.errors.consent && <p className="text-sm text-emerald">{form.formState.errors.consent.message}</p>}
      {message && <p className="text-sm text-white">{message}</p>}
    </form>
  );
}
