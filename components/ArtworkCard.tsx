import { ArtworkImage } from "@/components/ArtworkImage";
import Link from "next/link";
import type { ArtworkPayload } from "@/lib/types";

export function ArtworkCard({ artwork }: { artwork: ArtworkPayload }) {
  return (
    <article className="overflow-hidden rounded-lg border border-gallery-line bg-gallery-paper shadow-sm">
      <Link href={`/artworks/${artwork.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-gallery-line">
          <ArtworkImage src={artwork.imageUrl} alt={artwork.imageAlt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        </div>
        <div className="space-y-1 p-4">
          <h2 className="font-serif text-xl">{artwork.title}</h2>
          <p className="text-sm text-gallery-muted">
            {artwork.artistName}
            {artwork.yearCreated ? ` · ${artwork.yearCreated}` : ""}
          </p>
          <p className="text-sm">
            {artwork.museum.name}, {artwork.museum.city}
          </p>
        </div>
      </Link>
    </article>
  );
}
