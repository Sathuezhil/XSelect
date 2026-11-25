import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-navy text-white hover:bg-navy-soft",
  accent:
    "bg-emerald text-navy hover:bg-[#0ea371]",
  ghost:
    "border border-line bg-white text-navy hover:border-navy",
  danger:
    "bg-red-700 text-white hover:bg-red-800",
} as const;

export type ButtonVariant = keyof typeof styles;

export function buttonClass(variant: ButtonVariant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold leading-none transition disabled:cursor-not-allowed disabled:opacity-60",
    styles[variant],
    className,
  );
}
