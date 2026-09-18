import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtworkCard } from "@/components/ArtworkCard";
import { getMuseumById, listArtworksByMuseum } from "@/lib/catalog";

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const museum = getMuseumById(params.id);
  return { title: museum?.name ?? "Museum" };
}

export default function MuseumPage({ params }: { params: { id: string } }) {
  const museum = getMuseumById(params.id);
  if (!museum) {
    notFound();
  }

  const artworks = listArtworksByMuseum(params.id);

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl">{museum.name}</h1>
      <p className="mt-2 text-lg text-gallery-muted">
        {museum.city}, {museum.country}
      </p>
      {museum.websiteUrl ? (
        <p className="mt-3">
          <a href={museum.websiteUrl} className="underline underline-offset-4" rel="noreferrer">
            Official website
          </a>
        </p>
      ) : null}
      <section className="mt-10" aria-labelledby="collection-heading">
        <h2 id="collection-heading" className="mb-6 font-serif text-2xl">
          Tracked collection
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <li key={artwork.id}>
              <ArtworkCard artwork={artwork} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
