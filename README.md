# art-tracker-app

Global artwork location search, AI-verified museum check-ins, and gamified gallery tracking.

## Stack

- Next.js 14 App Router, React, TypeScript
- Tailwind CSS
- PostgreSQL via Prisma (optional until `DATABASE_URL` is set; the UI uses an in-repo catalog)
- Mapbox GL JS
- Google Gemini 1.5 Flash Vision for photo verification

## Layout

- `app/` pages and `app/api/` route handlers
- `components/` UI
- `lib/` types, catalog, geo, Gemini, and gamification
- `prisma/` schema and seed

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection for Prisma |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Interactive museum map |
| `GEMINI_API_KEY` | Photo verification |
| `CHECKIN_SKIP_DISTANCE=true` | Skip the 350m museum geofence while developing |
| `DEMO_USER_ID` | In-memory visitor id until auth exists |

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## API payloads

Artwork, museum, Met Museum, check-in, and gamification contracts live in `lib/types.ts`. Route handlers return those shapes only.
