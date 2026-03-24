# TruckFix

A mobile-first React app that helps truck drivers find nearby repair shops while on the road, powered by Google Maps and Places APIs.

## Features

- **Location-based search** — Enter an address to find nearby repair shops
- **Interactive map** — Visual overview of all results with clickable markers
- **Shop details** — Ratings, hours, open/closed status, distance, and contact info
- **Service filters** — Filter by Engine, Brakes, Tires, Electrical, and 24/7 availability
- **Trucker-specific** — Surfaces shops that accommodate large vehicles
- **Mobile-first** — Designed for use on the road

## Tech Stack

| Layer     | Choice                      |
| --------- | --------------------------- |
| Framework | React 19                    |
| Language  | TypeScript 5 (strict)       |
| Build     | Vite 6                      |
| Styling   | Tailwind CSS 4              |
| Routing   | React Router DOM 7          |
| Maps      | `@vis.gl/react-google-maps` |
| Icons     | Lucide React                |

## Architecture

```
src/
├── App.tsx                        # Routes
├── pages/
│   ├── LandingPage.tsx            # Address input + geocoding
│   └── Results.tsx                # Main results page (state owner)
├── utils/
│   ├── PlacesSearcher.tsx         # Google Places API integration
│   ├── distanceCalculator.ts      # Haversine distance formula
│   └── checkIfOpen.ts             # Parse Google opening hours
├── features/shops/
│   └── useShops.tsx               # Custom hook; falls back to mock data
├── types/index.ts                 # Shared types (Shop, LatLng, FilterTag…)
└── data/mocks/shopData.ts         # Mock data for offline development
```

**Data flow:** User enters address → geocoded to `{lat, lng}` → navigated to `/results?lat=X&lng=Y&city=Name` → `PlacesSearcher` queries Google Places → results distributed to map + bottom sheet.

## Roadmap

- [x] Google Places API integration
- [x] Distance calculation + open/closed detection
- [x] Filter system
- [x] TypeScript migration (~91% complete)
- [ ] Complete TS migration (`App.tsx`, `main.tsx`)
- [ ] Node.js/Express backend (move API calls server-side to protect API key)
- [ ] Deploy to AWS
