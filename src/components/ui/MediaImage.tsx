import Image from "next/image";
import { cn } from "@/lib/utils";

export function MediaImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 100vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const optimized = src.startsWith("/") || src.startsWith("https://images.unsplash.com/");
  if (!optimized) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={cn("absolute inset-0 h-full w-full object-cover", className)} />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
