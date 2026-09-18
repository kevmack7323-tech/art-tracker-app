import type { Metadata } from "next";
import { MapView } from "@/components/MapView";
import { MuseumCard } from "@/components/MuseumCard";
import { listMapPins, listMuseums } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Museum map",
};

export default function MapPage() {
  const pins = listMapPins();
  const museums = listMuseums();

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif text-4xl">Museum map</h1>
      <p className="mt-3 max-w-2xl text-gallery-muted">
        Pins mark institutions holding tracked works. Use the list if the map cannot load.
      </p>
      <div className="mt-8">
        <MapView pins={pins} />
      </div>
      <section className="mt-10" aria-labelledby="museum-list-heading">
        <h2 id="museum-list-heading" className="mb-4 font-serif text-2xl">
          Institutions
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {museums.map((museum) => (
            <li key={museum.id}>
              <MuseumCard museum={museum} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
