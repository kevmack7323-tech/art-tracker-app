"use client";

import Image from "next/image";
import { useState } from "react";

export function ArtworkImage({
  src,
  alt,
  sizes,
  priority = false,
  fit = "cover",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-gallery-line px-4 text-center text-sm text-gallery-muted"
        role="img"
        aria-label={alt}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      unoptimized
      className={fit === "contain" ? "object-contain bg-gallery-paper p-4" : "object-cover"}
      onError={() => setFailed(true)}
    />
  );
}
