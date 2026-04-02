# Step 7: Astronomy & Visibility (Open-Meteo Astronomy)

## What to build
API route handler, TanStack Query hook, and dashboard card for sunrise/sunset, moon phase, and daylight data.

## API Route (`app/api/astronomy/route.ts`)
- GET handler accepting `lat` and `lng` query params
- Calls `lib/api/astronomy.ts` client wrapper
- Open-Meteo Astronomy endpoint: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=sunrise,sunset,daylight_duration&timezone=auto`
- Also fetch moon phase if available (may need separate calculation or lookup)
- Returns typed AstronomyData JSON

## TanStack Query Hook (`hooks/useAstronomy.ts`)
- `useAstronomy(lat: number, lng: number)` hook
- Fetches from `/api/astronomy?lat=X&lng=Y`
- `staleTime: 60 * 60 * 1000` (1 hour)
- Only enabled when lat/lng are provided

## Dashboard Card (`components/dashboard/astronomy-card.tsx`)
'use client' component:
- Sunrise time with Sun icon
- Sunset time with Sunset icon
- Daylight duration
- Moon phase with appropriate icon (Moon, MoonStar from lucide-react)
- "Golden hour" calculation (30 min before sunset)
- Clean, compact layout
- Skeleton loading state

## Wire into Dashboard
Update `app/page.tsx` to replace the astronomy placeholder card with the real AstronomyCard component.

## Patterns to follow
- Follow the EXACT same pattern as the weather feature (same API provider, similar structure)
- See `app/api/weather/route.ts` and `hooks/useWeather.ts` for patterns

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY astronomy feature. Do not modify other features.
