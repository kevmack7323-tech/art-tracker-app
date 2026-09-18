import { NextResponse } from "next/server";
import { getArtworkById } from "@/lib/catalog";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const artwork = getArtworkById(params.id);
  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
  }
  return NextResponse.json(artwork);
}
