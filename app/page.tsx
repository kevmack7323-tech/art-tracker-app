import { ArtworkCard } from "@/components/ArtworkCard";
import { SearchBar } from "@/components/SearchBar";
import { listArtworks, searchArtworks } from "@/lib/catalog";

export default function HomePage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const artworks = query ? searchArtworks({ q: query }) : listArtworks();

  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 py-10">
      <header className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-gallery-gold">Locate · Verify · Collect</p>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Find the art, then prove you saw it</h1>
        <p className="mt-4 text-lg text-gallery-muted">
          Search collections worldwide, open a museum map, and check in with a photo verified by Gemini Vision.
        </p>
        <div className="mt-8">
          <SearchBar initialQuery={query} />
        </div>
      </header>

      <section className="mt-12" aria-labelledby="results-heading">
        <h2 id="results-heading" className="mb-6 font-serif text-2xl">
          {query ? `Results for “${query}”` : "Featured works"}
        </h2>
        {artworks.length === 0 ? (
          <p role="status">No artworks matched that search.</p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <li key={artwork.id}>
                <ArtworkCard artwork={artwork} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
