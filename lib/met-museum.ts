import type { MetMuseumObjectPayload } from "@/lib/types";

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";

export async function fetchMetObject(objectId: number): Promise<MetMuseumObjectPayload> {
  const response = await fetch(`${MET_BASE}/objects/${objectId}`, {
    next: { revalidate: 86_400 },
  });

  if (!response.ok) {
    throw new Error(`Met Museum object ${objectId} could not be loaded.`);
  }

  const data = (await response.json()) as MetMuseumObjectPayload;
  return data;
}

export async function searchMetObjectIds(query: string): Promise<number[]> {
  const response = await fetch(
    `${MET_BASE}/search?hasImages=true&q=${encodeURIComponent(query)}`,
    { next: { revalidate: 3_600 } },
  );

  if (!response.ok) {
    throw new Error("Met Museum search failed.");
  }

  const data = (await response.json()) as { objectIDs?: number[] | null };
  return data.objectIDs?.slice(0, 12) ?? [];
}
