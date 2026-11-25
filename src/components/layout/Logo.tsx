import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ compact = false, large = false }: { inverted?: boolean; compact?: boolean; large?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0">
      <Image
        src="/brand/xselect-lockup.png"
        alt="XSelect"
        width={744}
        height={580}
        quality={100}
        priority={!large}
        className={cn("w-auto", large ? "h-28" : compact ? "h-16" : "h-20")}
      />
    </Link>
  );
}
