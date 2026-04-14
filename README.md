# TruckFix

A fullstack, mobile-first web app that helps truck drivers find nearby repair shops when they break down on the road. Built as a real product with a production database, a hybrid data layer, and an AI-assisted search mode — deployed on Netlify (frontend) and Render (backend + PostgreSQL).

## Design Philosophy

The target user is a truck driver broken down on the side of a highway - stressed, likely on a phone, possibly in poor conditions. Most truckers are not tech-savvy and don't have time to learn an interface. Every UX decision follows from that: minimal steps to results, no account required, no onboarding, large tap targets, and a bottom sheet that surfaces information without requiring navigation. Breakdown mode exists specifically because a filter UI is the wrong tool in an emergency. Plain language is faster and less error-prone under stress.

## Technical Decisions

This project solves a real logistics problem and makes deliberate architectural tradeoffs:

- **The Google Places API is expensive and returns generic results** — so the app treats it as a fallback, not a primary source. Searches hit a PostgreSQL database first. Google is only called when local results are sparse, and those results are immediately persisted so the database grows with every search.
- **Truck drivers need different data than regular drivers** — the schema stores flags Google doesn't have tags such as: `specializesInTrucks`, `acceptsLargeVehicles`, `hasTruckParking`, etc. This is data Google Places cannot surface.
- **A broken-down trucker on the side of a highway can't navigate a filter UI** — so breakdown mode lets them describe their situation in plain language. Claude extracts structured intent from the input and re-ranks results without any manual interaction.

## Tech Stack

| Layer      | Choice                      |
| ---------- | --------------------------- |
| Framework  | React 19                    |
| Language   | TypeScript 5 (strict mode)  |
| Build      | Vite 6                      |
| Styling    | Tailwind CSS 4              |
| Maps       | `@vis.gl/react-google-maps` |
| Backend    | Node.js + Express           |
| Database   | PostgreSQL (Render)         |
| ORM        | Prisma                      |
| AI         | Anthropic Claude Haiku      |
| Deployment | Netlify + Render            |

## Architecture

```
src/
├── pages/
│   ├── LandingPage.tsx            # Address input + geocoding
│   └── Results.tsx                # Main results page — owns all state, flows down
├── utils/
│   ├── ShopSearcher.tsx           # Fetches from internal API, triggers on location change
│   ├── distanceCalculator.ts      # Haversine formula
│   └── checkIfOpen.ts             # Parses structured opening hours
├── features/shops/
│   ├── BottomSheetModal.tsx       # Swipeable results sheet + breakdown mode UI
│   └── useShops.tsx               # Hook; falls back to mock data when API unavailable
├── types/index.ts                 # Single source of truth for shared types
└── data/mocks/shopData.ts         # Offline development data

server/
├── server.ts                      # Express entry point, CORS, route registration
├── controllers/
│   └── shopsController.ts         # Orchestrates hybrid DB + Google data layer
├── services/
│   ├── shopService.ts             # Haversine bounding box query via Prisma
│   ├── placesServices.ts          # Google Places API + DB persistence
│   └── claudeService.ts           # Structured intent extraction from natural language
└── routes/

prisma/
├── schema.prisma                  # Shop, ShopHours, ShopService, ShopPhoto, ShopReview
└── migrations/
```

## Hybrid Data Layer

PostgreSQL is the primary source. Google Places is a write-through cache origin — results are fetched when the DB is sparse and immediately persisted, so the database fills over time and API costs decrease.

```
GET /api/shops/nearby?lat=X&lng=Y&radius=25
        │
        ├─ 1. Haversine bounding box query against DB
        │
        ├─ 2. Fewer than 20 results?
        │         └─ Call Google Places API (25mi radius)
        │                   └─ Normalize to internal Shop shape
        │                   └─ Upsert into DB keyed on placeId (skipDuplicates)
        │                   └─ Persist hours, reviews relationally
        │
        └─ 3. Merge + return unified Shop[]
```

**Key decisions:**

- Deduplication is handled server-side by `placeId` — the same shop from Google and the DB is never returned twice
- The `Shop` type is defined once in `src/types/index.ts` and both DB and Google results are normalized into it server-side before hitting the frontend
- Google API keys never reach the client — all third-party calls go through the Express proxy
- `lastSyncedAt` on each shop is the hook for future TTL-based cache invalidation

## AI Breakdown Mode

When a driver taps "Broken Down?", they describe their situation in plain language. The input is sent to Claude Haiku via a server-side API call. Claude returns a structured JSON filter object:

```ts
type BreakdownFilters = {
	isMobileService?: boolean; // true if they can't move the truck
	is24Hours?: boolean; // true if urgency implies nighttime
	services?: string[]; // constrained to known service types
	sortBy: 'distance' | 'rating';
	urgency: 'high' | 'medium' | 'low';
};
```

The prompt constrains `services` to an explicit allowed-values list (`["brakes", "tires", "engine", "diesel", "transmission", "electrical", "hvac", "suspension"]`) to prevent hallucinated values that wouldn't match DB records. If the service filter returns zero results, it falls back to the full shop list sorted by distance — so the UI never shows an empty state.

## Engineering Challenges

**Reducing Google Places API dependency over time** — The app started as a pure Google Places integration, but every search was an API call returning generic data with no truck-specific context. Google also has blind spots: small independent repair shops and rural businesses that serve truckers but have no online presence simply don't appear in results. The solution was to design a relational schema that stores truck-specific flags Google doesn't have, then build a write-through caching layer: the DB is queried first, Google is called only when results are sparse, and those results are immediately persisted with their hours and reviews normalized into relational tables. Manually curated shops can be seeded directly, filling gaps Google never will. Each search makes the DB more complete and the system progressively less dependent on the external API.

**Normalizing two incompatible data shapes into one** — Google Places API responses and Prisma DB records have completely different shapes. Rather than leaking this complexity into the frontend, both are normalized server-side into a single `Shop` type before leaving the Express layer. The frontend has no knowledge of where a result came from.

## Roadmap

- [x] Google Places API integration with server-side proxy
- [x] Haversine distance calculation + open/closed status parsing
- [x] Service filter system
- [x] PostgreSQL schema with truck-specific fields
- [x] TypeScript strict mode throughout
- [x] Hybrid data layer — DB-first with Google Places as fallback + persistence
- [x] Unified `Shop` type — DB and Google results normalized server-side
- [x] AI breakdown mode — natural language → structured filters via Claude
- [x] Prisma migration history + production deploy pipeline
- [ ] TTL-based cache invalidation via `lastSyncedAt`
- [ ] Auth gating for AI features
- [ ] Migrate to AWS (ECS + RDS + CloudFront)
