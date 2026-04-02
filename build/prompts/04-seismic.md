# Step 4: Seismic Activity (USGS Earthquake API)

## What to build
API route handler, TanStack Query hook, and dashboard card for earthquake data near the selected location.

## API Route (`app/api/seismic/route.ts`)
- GET handler accepting `lat`, `lng`, `radius` (default 250km), `days` (default 7) query params
- Calls `lib/api/seismic.ts` client wrapper
- Returns typed JSON response (array of Earthquake objects)

## TanStack Query Hook (`hooks/useSeismic.ts`)
- `useSeismic(lat: number, lng: number, radius?: number)` hook
- Fetches from `/api/seismic?lat=X&lng=Y&radius=250`
- `staleTime: 5 * 60 * 1000` (5 minutes)
- `refetchInterval: 5 * 60 * 1000`
- Only enabled when lat/lng are provided

## Dashboard Card (`components/dashboard/seismic-card.tsx`)
'use client' component:
- Shows count of recent earthquakes within radius
- Lists top 3-5 by magnitude with: magnitude (color-coded badge), location description, time ago, depth
- Magnitude color: <2.0 green, 2-4 yellow, 4+ red
- "No recent seismic activity" message when empty
- Skeleton loading state, Alert error state
- shadcn Card layout

## Wire into Dashboard
Update `app/page.tsx` to replace the seismic placeholder card with the real SeismicCard component.

## Patterns to follow
- Follow the EXACT same pattern as the weather feature: API route → hook → card
- See `app/api/weather/route.ts` for API route pattern
- See `hooks/useWeather.ts` for TanStack Query hook pattern
- See `components/dashboard/weather-card.tsx` for card component pattern

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY seismic feature. Do not modify weather card or other features.
