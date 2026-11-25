"use client";

import { useState } from "react";
import { MediaImage } from "@/components/ui/MediaImage";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];
  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-white">
        <MediaImage src={current} alt={name} priority sizes="(min-width: 1024px) 46vw, 100vw" />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-2xl border bg-white",
                index === active ? "border-navy" : "border-line",
              )}
              aria-label={`Show image ${index + 1} of ${name}`}
            >
              <MediaImage src={image} alt="" sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
