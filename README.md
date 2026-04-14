# TruckFix

A mobile-first React app that helps truck drivers find nearby repair shops while on the road, powered by Google Maps and Places APIs.

## Features

- **Location-based search** — Enter an address to find nearby repair shops
- **Interactive map** — Visual overview of all results with clickable markers
- **Shop details** — Ratings, hours, open/closed status, distance, and contact info
- **Service filters** — Filter by Engine, Brakes, Tires, Electrical, and 24/7 availability
- **Trucker-specific** — Surfaces shops that accommodate large vehicles
- **Mobile-first** — Designed for use on the road
- **Hybrid data layer** — Displays manually curated shops alongside Google-sourced results; when local results fall below a threshold, the app automatically calls the Google Places API to fill the gap for drivers, then persists those results (including hours and reviews) to the database for future searches
- **AI-assisted breakdown mode** — Drivers describe their situation in plain language ("brakes went out, can't move the truck") and an intent extraction layer powered by Claude maps the unstructured input to structured service filters, re-ranking results by relevance without any manual filter interaction

## Tech Stack

| Layer     | Choice                      |
| --------- | --------------------------- |
| Framework | React 19                    |
| Language  | TypeScript 5 (strict)       |
| AI        | Anthropic Claude (Haiku)    |
| Build     | Vite 6                      |
| Styling   | Tailwind CSS 4              |
| Routing   | React Router DOM 7          |
| Maps      | `@vis.gl/react-google-maps` |
| Icons     | Lucide React                |
| Backend   | Node.js + Express           |
| Database  | PostgreSQL                  |
| ORM       | Prisma                      |

## Architecture

```
src/
├── App.tsx                        # Routes
├── pages/
│   ├── LandingPage.tsx            # Address input + geocoding
│   └── Results.tsx                # Main results page (state owner)
├── utils/
│   ├── ShopSearcher.tsx           # Fetches nearby shops from internal API
│   ├── distanceCalculator.ts      # Haversine distance formula
│   └── checkIfOpen.ts             # Parse Google opening hours
├── features/shops/
│   └── useShops.tsx               # Custom hook; falls back to mock data
├── types/index.ts                 # Shared types (Shop, LatLng, FilterTag…)
└── data/mocks/shopData.ts         # Mock data for offline development

server/
├── server.ts                      # Express server (port 3000)
├── db.ts                          # Prisma client instance
├── controllers/
│   └── shopsController.ts         # Orchestrates hybrid data layer
├── services/
│   ├── shopService.ts             # DB queries (Prisma)
│   ├── placesServices.ts          # Google Places API calls
│   └── claudeService.ts           # AI intent extraction → breakdown filters
└── routes/                        # API route definitions

prisma/
├── schema.prisma                  # DB schema (Shop, ShopHours, ShopService, ShopPhoto, ShopReview)
└── migrations/                    # Prisma migration history
```

### Hybrid Data Layer

The core architectural decision is to treat our PostgreSQL database as the primary data source and Google Places as a fallback and enrichment layer. The goal is richer, truck-specific data that Google alone cannot provide.

```
GET /api/shops/nearby?lat=X&lng=Y&radius=50
        │
        ├─ 1. Query DB for verified shops within radius
        │
        ├─ 2. Results sparse (< 3 shops)?
        │         └─ Call Google Places API
        │                   └─ Transform raw response → internal Shop shape
        │                   └─ Upsert into DB (keyed on placeId)
        │
        └─ 3. Merge DB + Google results, deduplicate by placeId
                   └─ Sort by distance, return Shop[]
```

**Why DB first:**
- Our schema stores truck-specific flags Google doesn't have (`specializesInTrucks`, `acceptsLargeVehicles`, `hasTruckParking`, etc.)
- Verified shops (`status: "verified"`) surface before unverified Google results
- `lastSyncedAt` field controls TTL — stale records are re-fetched from Google automatically
- Reduces Google API costs over time as the DB fills up

**Data flow:** User enters address → geocoded to `{lat, lng}` → navigated to `/results?lat=X&lng=Y&city=Name&radius=50` → `ShopSearcher` hits `/api/shops/nearby` → server queries DB, supplements with Google if sparse → returns unified `Shop[]` → distributed to map + bottom sheet.

## Roadmap

- [x] Google Places API integration
- [x] Distance calculation + open/closed detection
- [x] Filter system
- [x] Node.js/Express backend (API key protected server-side)
- [x] PostgreSQL + Prisma ORM (schema defined)
- [x] TypeScript migration (100% complete)
- [x] Hybrid data layer — DB first, Google Places as fallback when results are sparse
- [x] Persist Google Places results (shops, hours, reviews) to DB on search
- [x] Unified Shop shape — manual and Google-sourced results normalized server-side
- [x] AI-assisted breakdown mode — natural language → structured service filters via Claude
- [ ] TTL-based cache invalidation via `lastSyncedAt`
- [ ] Deploy to AWS
