import type { ArtworkPayload, GeoCoordinates } from "@/lib/types";

const EARTH_RADIUS_METERS = 6_371_000;
const DEFAULT_RADIUS_METERS = 350;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

export function distanceMeters(a: GeoCoordinates, b: GeoCoordinates): number {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const lat1 = toRadians(a.latitude);
  const lat2 = toRadians(b.latitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.asin(Math.sqrt(h));
}

export function isWithinMuseumRadius(
  visitor: GeoCoordinates,
  artwork: ArtworkPayload,
  radiusMeters = DEFAULT_RADIUS_METERS,
): boolean {
  if (process.env.CHECKIN_SKIP_DISTANCE === "true") {
    return true;
  }
  return distanceMeters(visitor, artwork.museum.coordinates) <= radiusMeters;
}

export function pointsForCheckIn(artwork: ArtworkPayload, verified: boolean): number {
  if (!verified) {
    return 0;
  }
  return artwork.pointsValue;
}
