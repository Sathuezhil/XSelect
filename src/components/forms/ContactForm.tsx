"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validators";
import type { z } from "zod";

type Values = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [message, setMessage] = useState("");
  const form = useForm<Values>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", website: "" },
  });

  async function onSubmit(values: Values) {
    setMessage("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const body = (await response.json()) as { error?: string };
    if (!response.ok) {
      setMessage(body.error ?? "We could not send that message.");
      return;
    }
    form.reset();
    setMessage("Thank you. We have received your message.");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-line bg-white p-6" noValidate>
      <Field label="Name" error={form.formState.errors.name?.message}>
        <input className={inputClass} {...form.register("name")} />
      </Field>
      <Field label="Email" error={form.formState.errors.email?.message}>
        <input type="email" className={inputClass} {...form.register("email")} />
      </Field>
      <Field label="Subject" error={form.formState.errors.subject?.message}>
        <input className={inputClass} {...form.register("subject")} />
      </Field>
      <Field label="Message" error={form.formState.errors.message?.message}>
        <textarea rows={6} className={inputClass} {...form.register("message")} />
      </Field>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...form.register("website")} />
      <button type="submit" disabled={form.formState.isSubmitting} className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
        {form.formState.isSubmitting ? "Sending…" : "Send message"}
      </button>
      {message && <p className="text-sm text-ink">{message}</p>}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-navy">
      {label}
      <div className="mt-1.5">{children}</div>
      {error && <span className="mt-1 block text-sm font-normal text-red-700">{error}</span>}
    </label>
  );
}

const inputClass = "w-full rounded-xl border border-line px-3 py-2.5 text-sm font-normal text-ink outline-none focus:border-navy";
