import { NextResponse } from "next/server";
import { getMuseumById, listArtworksByMuseum } from "@/lib/catalog";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const museum = getMuseumById(params.id);
  if (!museum) {
    return NextResponse.json({ error: "Museum not found." }, { status: 404 });
  }

  return NextResponse.json({
    museum,
    artworks: listArtworksByMuseum(params.id),
  });
}
