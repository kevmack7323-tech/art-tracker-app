import type {
  ArtworkPayload,
  ArtworkSource,
  BadgePayload,
  MapPinPayload,
  MuseumPayload,
} from "@/lib/types";

interface CatalogMuseum {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  websiteUrl: string | null;
}

interface CatalogArtwork {
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
  museumId: string;
  pointsValue: number;
}

const museums: CatalogMuseum[] = [
  {
    id: "mus_louvre",
    slug: "louvre",
    name: "Musée du Louvre",
    city: "Paris",
    country: "France",
    latitude: 48.8606,
    longitude: 2.3376,
    websiteUrl: "https://www.louvre.fr/",
  },
  {
    id: "mus_moma",
    slug: "moma",
    name: "Museum of Modern Art",
    city: "New York",
    country: "United States",
    latitude: 40.7614,
    longitude: -73.9776,
    websiteUrl: "https://www.moma.org/",
  },
  {
    id: "mus_uffizi",
    slug: "uffizi",
    name: "Gallerie degli Uffizi",
    city: "Florence",
    country: "Italy",
    latitude: 43.7678,
    longitude: 11.2552,
    websiteUrl: "https://www.uffizi.it/",
  },
  {
    id: "mus_mauritshuis",
    slug: "mauritshuis",
    name: "Mauritshuis",
    city: "The Hague",
    country: "Netherlands",
    latitude: 52.0805,
    longitude: 4.3147,
    websiteUrl: "https://www.mauritshuis.nl/",
  },
  {
    id: "mus_rijks",
    slug: "rijksmuseum",
    name: "Rijksmuseum",
    city: "Amsterdam",
    country: "Netherlands",
    latitude: 52.36,
    longitude: 4.8852,
    websiteUrl: "https://www.rijksmuseum.nl/",
  },
  {
    id: "mus_artic",
    slug: "art-institute-chicago",
    name: "Art Institute of Chicago",
    city: "Chicago",
    country: "United States",
    latitude: 41.8796,
    longitude: -87.6237,
    websiteUrl: "https://www.artic.edu/",
  },
  {
    id: "mus_reina",
    slug: "reina-sofia",
    name: "Museo Reina Sofía",
    city: "Madrid",
    country: "Spain",
    latitude: 40.408,
    longitude: -3.6946,
    websiteUrl: "https://www.museoreinasofia.es/",
  },
];

const artworks: CatalogArtwork[] = [
  {
    id: "art_mona_lisa",
    slug: "mona-lisa",
    title: "Mona Lisa",
    artistName: "Leonardo da Vinci",
    yearCreated: "1503–1519",
    medium: "Oil on poplar panel",
    description:
      "Portrait of Lisa Gherardini, among the most visited paintings in the world.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    imageAlt: "Leonardo da Vinci's Mona Lisa, a seated woman with a slight smile",
    department: "Paintings",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_louvre",
    pointsValue: 80,
  },
  {
    id: "art_starry_night",
    slug: "the-starry-night",
    title: "The Starry Night",
    artistName: "Vincent van Gogh",
    yearCreated: "1889",
    medium: "Oil on canvas",
    description:
      "A swirling night sky over Saint-Rémy-de-Provence, painted from the asylum window.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    imageAlt: "Van Gogh's The Starry Night with swirling blue sky over a village",
    department: "Painting and Sculpture",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_moma",
    pointsValue: 70,
  },
  {
    id: "art_persistence",
    slug: "the-persistence-of-memory",
    title: "The Persistence of Memory",
    artistName: "Salvador Dalí",
    yearCreated: "1931",
    medium: "Oil on canvas",
    description: "Melting clocks on a Catalan landscape — a Surrealist landmark.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg",
    imageAlt: "Dalí painting of melting clocks draped over a barren landscape",
    department: "Painting and Sculpture",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_moma",
    pointsValue: 65,
  },
  {
    id: "art_venus",
    slug: "the-birth-of-venus",
    title: "The Birth of Venus",
    artistName: "Sandro Botticelli",
    yearCreated: "c. 1485",
    medium: "Tempera on canvas",
    description: "Venus arriving on the shore upon a shell, attended by the winds.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    imageAlt: "Botticelli's Birth of Venus standing on a seashell",
    department: "Paintings",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_uffizi",
    pointsValue: 75,
  },
  {
    id: "art_pearl",
    slug: "girl-with-a-pearl-earring",
    title: "Girl with a Pearl Earring",
    artistName: "Johannes Vermeer",
    yearCreated: "c. 1665",
    medium: "Oil on canvas",
    description: "A tronie of a young woman in an exotic dress and a large pearl.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
    imageAlt: "Vermeer's Girl with a Pearl Earring looking over her shoulder",
    department: "Paintings",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_mauritshuis",
    pointsValue: 70,
  },
  {
    id: "art_night_watch",
    slug: "the-night-watch",
    title: "The Night Watch",
    artistName: "Rembrandt van Rijn",
    yearCreated: "1642",
    medium: "Oil on canvas",
    description: "Militia company of District II under the command of Frans Banninck Cocq.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg",
    imageAlt: "Rembrandt's The Night Watch showing a Dutch civic militia",
    department: "Paintings",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_rijks",
    pointsValue: 80,
  },
  {
    id: "art_american_gothic",
    slug: "american-gothic",
    title: "American Gothic",
    artistName: "Grant Wood",
    yearCreated: "1930",
    medium: "Oil on beaverboard",
    description: "A farmer and a woman standing before a Carpenter Gothic house.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/800px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
    imageAlt: "Grant Wood's American Gothic, a man with a pitchfork and a woman",
    department: "American Art",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_artic",
    pointsValue: 55,
  },
  {
    id: "art_guernica",
    slug: "guernica",
    title: "Guernica",
    artistName: "Pablo Picasso",
    yearCreated: "1937",
    medium: "Oil on canvas",
    description: "Monumental anti-war painting responding to the bombing of Guernica.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    imageAlt: "Picasso's Guernica in stark black, white, and grey",
    department: "Modern Art",
    source: "internal",
    sourceObjectId: null,
    museumId: "mus_reina",
    pointsValue: 90,
  },
];

export const BADGE_DEFINITIONS: Omit<BadgePayload, "earned">[] = [
  {
    slug: "first-sighting",
    name: "First Sighting",
    description: "Verify your first artwork in person.",
    threshold: 1,
  },
  {
    slug: "gallery-hopper",
    name: "Gallery Hopper",
    description: "Complete five verified check-ins.",
    threshold: 5,
  },
  {
    slug: "grand-tour",
    name: "Grand Tour",
    description: "Reach ten verified check-ins.",
    threshold: 10,
  },
];

function toMuseumPayload(museum: CatalogMuseum, artworkCount: number): MuseumPayload {
  return {
    id: museum.id,
    slug: museum.slug,
    name: museum.name,
    city: museum.city,
    country: museum.country,
    coordinates: {
      latitude: museum.latitude,
      longitude: museum.longitude,
    },
    websiteUrl: museum.websiteUrl,
    artworkCount,
  };
}

function toArtworkPayload(artwork: CatalogArtwork): ArtworkPayload | null {
  const museum = museums.find((item) => item.id === artwork.museumId);
  if (!museum) {
    return null;
  }

  const artworkCount = artworks.filter((item) => item.museumId === museum.id).length;

  return {
    id: artwork.id,
    slug: artwork.slug,
    title: artwork.title,
    artistName: artwork.artistName,
    yearCreated: artwork.yearCreated,
    medium: artwork.medium,
    description: artwork.description,
    imageUrl: artwork.imageUrl,
    imageAlt: artwork.imageAlt,
    department: artwork.department,
    source: artwork.source,
    sourceObjectId: artwork.sourceObjectId,
    pointsValue: artwork.pointsValue,
    museum: toMuseumPayload(museum, artworkCount),
  };
}

export function listArtworks(): ArtworkPayload[] {
  return artworks
    .map(toArtworkPayload)
    .filter((item): item is ArtworkPayload => item !== null);
}

export function getArtworkById(id: string): ArtworkPayload | null {
  const artwork = artworks.find((item) => item.id === id || item.slug === id);
  return artwork ? toArtworkPayload(artwork) : null;
}

export function listMuseums(): MuseumPayload[] {
  return museums.map((museum) =>
    toMuseumPayload(
      museum,
      artworks.filter((item) => item.museumId === museum.id).length,
    ),
  );
}

export function getMuseumById(id: string): MuseumPayload | null {
  const museum = museums.find((item) => item.id === id || item.slug === id);
  if (!museum) {
    return null;
  }
  return toMuseumPayload(
    museum,
    artworks.filter((item) => item.museumId === museum.id).length,
  );
}

export function listArtworksByMuseum(museumId: string): ArtworkPayload[] {
  return listArtworks().filter(
    (artwork) => artwork.museum.id === museumId || artwork.museum.slug === museumId,
  );
}

export function searchArtworks(params: {
  q?: string;
  city?: string;
  museumId?: string;
  artistName?: string;
}): ArtworkPayload[] {
  const query = params.q?.trim().toLowerCase();
  const city = params.city?.trim().toLowerCase();
  const artistName = params.artistName?.trim().toLowerCase();

  return listArtworks().filter((artwork) => {
    if (params.museumId && artwork.museum.id !== params.museumId && artwork.museum.slug !== params.museumId) {
      return false;
    }
    if (city && artwork.museum.city.toLowerCase() !== city) {
      return false;
    }
    if (artistName && !artwork.artistName.toLowerCase().includes(artistName)) {
      return false;
    }
    if (!query) {
      return true;
    }
    const haystack = [
      artwork.title,
      artwork.artistName,
      artwork.museum.name,
      artwork.museum.city,
      artwork.medium ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function listMapPins(): MapPinPayload[] {
  return listMuseums().map((museum) => ({
    museumId: museum.id,
    slug: museum.slug,
    name: museum.name,
    city: museum.city,
    coordinates: museum.coordinates,
    artworkCount: museum.artworkCount,
  }));
}

export const catalogMuseums = museums;
export const catalogArtworks = artworks;
