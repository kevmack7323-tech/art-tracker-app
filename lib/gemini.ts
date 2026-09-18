import { GoogleGenerativeAI } from "@google/generative-ai";
import type { ArtworkPayload, PhotoVerificationResult } from "@/lib/types";

const MODEL_ID = "gemini-1.5-flash";

export async function verifyArtworkPhoto(options: {
  artwork: ArtworkPayload;
  photoBase64: string;
  mimeType: string;
}): Promise<PhotoVerificationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      verified: false,
      confidence: 0,
      reason: "Gemini API key is not configured.",
      model: MODEL_ID,
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: MODEL_ID });

  const prompt = [
    "You verify museum check-in photos for an art tracking app.",
    "Decide whether the uploaded photo reasonably depicts the named artwork (the work itself, a gallery label beside it, or the visitor standing with it).",
    `Artwork title: ${options.artwork.title}`,
    `Artist: ${options.artwork.artistName}`,
    `Museum: ${options.artwork.museum.name}`,
    "Reply as compact JSON only: {\"verified\": boolean, \"confidence\": number between 0 and 1, \"reason\": string}.",
  ].join("\n");

  const result = await model.generateContent([
    { text: prompt },
    {
      inlineData: {
        data: options.photoBase64.replace(/^data:[^;]+;base64,/, ""),
        mimeType: options.mimeType,
      },
    },
  ]);

  const text = result.response.text();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return {
      verified: false,
      confidence: 0,
      reason: "The vision model did not return a structured verdict.",
      model: MODEL_ID,
    };
  }

  const parsed = JSON.parse(jsonMatch[0]) as {
    verified?: boolean;
    confidence?: number;
    reason?: string;
  };

  return {
    verified: Boolean(parsed.verified),
    confidence: Math.min(1, Math.max(0, Number(parsed.confidence) || 0)),
    reason: parsed.reason ?? "No reason provided.",
    model: MODEL_ID,
  };
}
