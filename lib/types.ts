/**
 * Strict payload contracts for artwork, museum, and gamification APIs.
 * External museum feeds (e.g. The Met) are mapped into these shapes
 * before they reach UI or persistence.
 */

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface MuseumPayload {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  coordinates: GeoCoordinates;
  websiteUrl: string | null;
  artworkCount: number;
}

export interface ArtworkPayload {
  id: string;
  slug: string;
  title: string;
  artistName: string;
  yearCreated: string | null;
  medium: string | null;
  description: string;
  imageUrl: string;
  imageAlt: string;
  department: string | null;
  source: ArtworkSource;
  sourceObjectId: string | null;
  pointsValue: number;
  museum: MuseumPayload;
}

export type ArtworkSource = "internal" | "met-museum" | "rijksmuseum";

export interface MetMuseumObjectPayload {
  objectID: number;
  title: string;
  artistDisplayName: string;
  objectDate: string;
  medium: string;
  department: string;
  primaryImage: string;
  primaryImageSmall: string;
  objectURL: string;
  repository: string;
  isPublicDomain: boolean;
}

export interface ArtworkSearchQuery {
  q?: string;
  city?: string;
  museumId?: string;
  artistName?: string;
}

export interface ArtworkSearchResponse {
  query: ArtworkSearchQuery;
  results: ArtworkPayload[];
  total: number;
}

export interface CheckInRequest {
  artworkId: string;
  userId: string;
  coordinates: GeoCoordinates;
  photoBase64?: string;
  photoMimeType?: string;
}

export interface PhotoVerificationResult {
  verified: boolean;
  confidence: number;
  reason: string;
  model: string;
}

export interface CheckInPayload {
  id: string;
  artworkId: string;
  userId: string;
  coordinates: GeoCoordinates;
  verified: boolean;
  verificationNote: string | null;
  pointsAwarded: number;
  createdAt: string;
}

export interface BadgePayload {
  slug: string;
  name: string;
  description: string;
  threshold: number;
  earned: boolean;
}

export interface GamificationProfile {
  userId: string;
  handle: string;
  displayName: string;
  totalPoints: number;
  verifiedCheckIns: number;
  badges: BadgePayload[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  handle: string;
  displayName: string;
  totalPoints: number;
  verifiedCheckIns: number;
}

export interface MapPinPayload {
  museumId: string;
  slug: string;
  name: string;
  city: string;
  coordinates: GeoCoordinates;
  artworkCount: number;
}
