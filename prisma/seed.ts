import { PrismaClient } from "@prisma/client";
import { catalogArtworks, catalogMuseums, BADGE_DEFINITIONS } from "../lib/catalog";

const prisma = new PrismaClient();

async function main() {
  for (const badge of BADGE_DEFINITIONS) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {
        name: badge.name,
        description: badge.description,
        threshold: badge.threshold,
      },
      create: {
        slug: badge.slug,
        name: badge.name,
        description: badge.description,
        threshold: badge.threshold,
      },
    });
  }

  for (const museum of catalogMuseums) {
    await prisma.museum.upsert({
      where: { slug: museum.slug },
      update: {
        name: museum.name,
        city: museum.city,
        country: museum.country,
        latitude: museum.latitude,
        longitude: museum.longitude,
        websiteUrl: museum.websiteUrl,
      },
      create: museum,
    });
  }

  for (const artwork of catalogArtworks) {
    await prisma.artwork.upsert({
      where: { slug: artwork.slug },
      update: {
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
        museumId: artwork.museumId,
        pointsValue: artwork.pointsValue,
      },
      create: artwork,
    });
  }

  await prisma.user.upsert({
    where: { handle: "gallery-guest" },
    update: {},
    create: {
      id: process.env.DEMO_USER_ID ?? "demo-visitor",
      handle: "gallery-guest",
      displayName: "Gallery Guest",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
