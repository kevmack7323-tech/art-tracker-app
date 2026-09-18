import { NextResponse } from "next/server";
import { z } from "zod";
import { getArtworkById } from "@/lib/catalog";
import { recordCheckIn } from "@/lib/gamification";
import { isWithinMuseumRadius, pointsForCheckIn } from "@/lib/geo";
import { verifyArtworkPhoto } from "@/lib/gemini";
import type { CheckInPayload, CheckInRequest, PhotoVerificationResult } from "@/lib/types";

const checkInSchema = z.object({
  artworkId: z.string().min(1),
  userId: z.string().min(1).default("demo-visitor"),
  coordinates: z.object({
    latitude: z.number().gte(-90).lte(90),
    longitude: z.number().gte(-180).lte(180),
  }),
  photoBase64: z.string().optional(),
  photoMimeType: z.string().optional(),
});

export async function POST(request: Request) {
  const json: unknown = await request.json();
  const parsed = checkInSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid check-in payload.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const body: CheckInRequest = parsed.data;
  const artwork = getArtworkById(body.artworkId);
  if (!artwork) {
    return NextResponse.json({ error: "Artwork not found." }, { status: 404 });
  }

  if (!isWithinMuseumRadius(body.coordinates, artwork)) {
    return NextResponse.json(
      {
        error: "You need to be at the hosting museum to check in.",
        museum: artwork.museum.name,
      },
      { status: 403 },
    );
  }

  let verification: PhotoVerificationResult = {
    verified: false,
    confidence: 0,
    reason: "No photo was provided.",
    model: "none",
  };

  if (body.photoBase64 && body.photoMimeType) {
    verification = await verifyArtworkPhoto({
      artwork,
      photoBase64: body.photoBase64,
      mimeType: body.photoMimeType,
    });
  }

  const pointsAwarded = pointsForCheckIn(artwork, verification.verified);
  const checkIn: CheckInPayload = {
    id: `chk_${Date.now()}`,
    artworkId: artwork.id,
    userId: body.userId,
    coordinates: body.coordinates,
    verified: verification.verified,
    verificationNote: verification.reason,
    pointsAwarded,
    createdAt: new Date().toISOString(),
  };

  recordCheckIn(body.userId, checkIn);

  return NextResponse.json({ checkIn, verification });
}
