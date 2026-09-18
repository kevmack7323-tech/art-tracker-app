import { NextResponse } from "next/server";
import { listArtworks, searchArtworks } from "@/lib/catalog";
import type { ArtworkSearchResponse } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = {
    q: searchParams.get("q") ?? undefined,
    city: searchParams.get("city") ?? undefined,
    museumId: searchParams.get("museumId") ?? undefined,
    artistName: searchParams.get("artistName") ?? undefined,
  };

  const results = Object.values(query).some(Boolean)
    ? searchArtworks(query)
    : listArtworks();

  const body: ArtworkSearchResponse = {
    query,
    results,
    total: results.length,
  };

  return NextResponse.json(body);
}
