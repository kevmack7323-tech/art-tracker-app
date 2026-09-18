import Link from "next/link";
import type { MuseumPayload } from "@/lib/types";

export function MuseumCard({ museum }: { museum: MuseumPayload }) {
  return (
    <article className="rounded-lg border border-gallery-line bg-gallery-paper p-4">
      <h2 className="font-serif text-lg">
        <Link href={`/museums/${museum.slug}`} className="underline-offset-4 hover:underline">
          {museum.name}
        </Link>
      </h2>
      <p className="text-sm text-gallery-muted">
        {museum.city}, {museum.country}
      </p>
      <p className="mt-2 text-sm">
        {museum.artworkCount} tracked {museum.artworkCount === 1 ? "work" : "works"}
      </p>
    </article>
  );
}
