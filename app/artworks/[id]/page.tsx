import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtworkImage } from "@/components/ArtworkImage";
import { getArtworkById } from "@/lib/catalog";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const artwork = getArtworkById(params.id);
  return {
    title: artwork?.title ?? "Artwork",
  };
}

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = getArtworkById(params.id);
  if (!artwork) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-gallery-line bg-gallery-paper">
        <ArtworkImage
          src={artwork.imageUrl}
          alt={artwork.imageAlt}
          priority
          fit="contain"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div>
        <p className="text-sm uppercase tracking-wide text-gallery-gold">{artwork.department}</p>
        <h1 className="mt-2 font-serif text-4xl">{artwork.title}</h1>
        <p className="mt-2 text-lg">
          {artwork.artistName}
          {artwork.yearCreated ? ` · ${artwork.yearCreated}` : ""}
        </p>
        {artwork.medium ? <p className="mt-1 text-sm text-gallery-muted">{artwork.medium}</p> : null}
        <p className="mt-6 leading-relaxed">{artwork.description}</p>
        <p className="mt-6">
          On view at{" "}
          <Link href={`/museums/${artwork.museum.slug}`} className="underline underline-offset-4">
            {artwork.museum.name}
          </Link>
          , {artwork.museum.city}, {artwork.museum.country}.
        </p>
        <p className="mt-2 text-sm text-gallery-muted">{artwork.pointsValue} points when verified in person.</p>
        <Link
          href={`/check-in/${artwork.slug}`}
          className="mt-8 inline-block rounded-md bg-gallery-burgundy px-5 py-3 font-medium text-white hover:bg-[#641823]"
        >
          Check in at this work
        </Link>
      </div>
    </main>
  );
}
