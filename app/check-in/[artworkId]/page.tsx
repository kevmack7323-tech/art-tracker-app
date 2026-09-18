import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckInForm } from "@/components/CheckInForm";
import { getArtworkById } from "@/lib/catalog";

export function generateMetadata({ params }: { params: { artworkId: string } }): Metadata {
  const artwork = getArtworkById(params.artworkId);
  return { title: artwork ? `Check in · ${artwork.title}` : "Check in" };
}

export default function CheckInPage({ params }: { params: { artworkId: string } }) {
  const artwork = getArtworkById(params.artworkId);
  if (!artwork) {
    notFound();
  }

  return (
    <main id="main-content" className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 font-serif text-4xl">{artwork.title}</h1>
      <CheckInForm artwork={artwork} />
    </main>
  );
}
