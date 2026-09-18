import { NextResponse } from "next/server";
import { z } from "zod";
import { getArtworkById } from "@/lib/catalog";
import { verifyArtworkPhoto } from "@/lib/gemini";

const verifySchema = z.object({
  artworkId: z.string().min(1),
  photoBase64: z.string().min(1),
  photoMimeType: z.string().min(1),
});

export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = verifySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid verification payload.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const artwork = getArtworkById(parsed.data.artworkId);
  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
  }

  const verification = await verifyArtworkPhoto({
    artwork,
    photoBase64: parsed.data.photoBase64,
    mimeType: parsed.data.photoMimeType,
  });

  return NextResponse.json(verification);
}
