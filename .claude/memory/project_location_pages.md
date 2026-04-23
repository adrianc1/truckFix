---
name: Location-specific pages roadmap
description: Planned SEO-driven location pages for truck repair searches
type: project
---

User plans to add location-specific routes like `/repair-shops-in-los-angeles` for SEO.

**Why:** These static/SSR-able pages can rank in Google for city-level searches like "truck repair shops Los Angeles" — a key growth channel for the SaaS product.

**How to apply:** When designing the routing or DB query layer, keep location-slug lookups in mind. These pages will need pre-rendered or SSR'd HTML to rank well, so when the time comes, evaluate whether to add a prerender plugin (vite-plugin-prerender) or migrate the public-facing pages to a framework like Next.js while keeping the app shell in Vite.
