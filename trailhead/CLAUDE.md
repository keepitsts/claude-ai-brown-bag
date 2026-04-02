# TRAILHEAD — Federal Lands Daily Briefing Tool

## Tech Stack
- Next.js 15 App Router (NO Pages Router), TypeScript strict mode
- Tailwind CSS v4 (CSS-based config via `@import "tailwindcss"`, NOT tailwind.config.js)
- shadcn/ui components, Zustand v5 for client state, TanStack Query v5 for server state
- React Leaflet v5 + Leaflet v1.9 + OpenStreetMap tiles for maps
- Anthropic SDK for AI briefings (claude-sonnet-4-20250514)
- pnpm as package manager

## Project Structure
```
app/                → Pages, layouts, API route handlers
app/api/            → Server-side API route handlers (proxy external APIs)
components/         → Feature components and shared UI
components/ui/      → shadcn/ui primitives
lib/api/            → External API client wrappers (typed)
lib/types/          → Shared TypeScript interfaces for all API responses
lib/constants/      → Federal lands locations list, config values
hooks/              → Custom React hooks (TanStack Query wrappers)
stores/             → Zustand store slices (location, briefing, watchlist)
```

## Critical Conventions
- Server Components by default. Add 'use client' ONLY for interactivity/hooks
- Next.js 15: params are Promises — must await: `const { slug } = await props.params`
- React Leaflet REQUIRES 'use client' + dynamic import with `ssr: false`
- Data flow: lib/api/ wrapper → app/api/ route handler → TanStack Query hook → component
- Named exports for all components
- All external API keys via process.env (never expose to client)
- Error/loading states: shadcn Skeleton for loading, Alert for errors

## External APIs
| API | Endpoint Pattern | Auth |
|-----|-----------------|------|
| Open-Meteo Weather | api.open-meteo.com/v1/forecast | None |
| Open-Meteo Astronomy | api.open-meteo.com/v1/astronomy | None |
| USGS Earthquakes | earthquake.usgs.gov/fdsnws/event/1/query | None |
| NASA FIRMS | firms.modaps.eosdis.nasa.gov/api/area | MAP_KEY env var |
| FBI Crime Data | api.usa.gov/crime/fbi/cde/ | API_KEY env var |
| Nominatim | nominatim.openstreetmap.org/search | None (1 req/sec) |

## Verification
After every change: `npx tsc --noEmit && pnpm build`

## Scope Control
Implement ONLY what is specified in the prompt. Do not add auth, dark mode, i18n, testing infrastructure, or features not explicitly requested.
