# Step 5: Wildfire Tracking (NASA FIRMS)

## What to build
API route handler, TanStack Query hook, and dashboard card for active fire detections near the selected location.

## API Route (`app/api/fires/route.ts`)
- GET handler accepting `lat`, `lng`, `radius` (default 100km) query params
- Calls `lib/api/fires.ts` client wrapper
- Uses `process.env.NASA_FIRMS_MAP_KEY` for authentication
- The NASA FIRMS API endpoint is: `https://firms.modaps.eosdis.nasa.gov/api/area/csv/{MAP_KEY}/VIIRS_SNPP_NRT/{lat},{lng},{radius}/1`
- Parse CSV response into typed FireDetection objects
- Returns typed JSON array

## TanStack Query Hook (`hooks/useFires.ts`)
- `useFires(lat: number, lng: number, radius?: number)` hook
- Fetches from `/api/fires?lat=X&lng=Y&radius=100`
- `staleTime: 30 * 60 * 1000` (30 minutes)
- `refetchInterval: 30 * 60 * 1000`
- Only enabled when lat/lng are provided

## Dashboard Card (`components/dashboard/fires-card.tsx`)
'use client' component:
- Shows count of active fire detections in past 24h
- Alert banner if fires detected (use destructive Alert variant)
- Lists fire detections with: distance from location, confidence level, detection time, satellite
- "No active fires detected" success message when empty
- Skeleton loading state, Alert error state
- Flame icon (lucide-react) for visual emphasis

## Wire into Dashboard
Update `app/page.tsx` to replace the fires placeholder card with the real FiresCard component.

## Patterns to follow
- Follow the EXACT same pattern as weather and seismic features
- See `app/api/weather/route.ts` for API route pattern
- See `hooks/useWeather.ts` for hook pattern
- See `components/dashboard/weather-card.tsx` for card pattern

## Important
- NASA FIRMS returns CSV, not JSON. Parse it properly.
- If the API key is missing, return an appropriate error message, not a crash.
- Calculate distance from selected location to each fire detection using Haversine formula (add a utility in `lib/utils.ts` or `lib/geo.ts`).

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY fires feature. Do not modify other features.
