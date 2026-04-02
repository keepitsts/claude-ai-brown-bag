# Step 3: Weather Dashboard (Open-Meteo)

## What to build
API route handler, TanStack Query hook, and dashboard card for current weather and forecast data.

## API Route (`app/api/weather/route.ts`)
- GET handler accepting `lat` and `lng` query params
- Calls `lib/api/weather.ts` client wrapper
- Returns typed JSON response
- Handles errors with appropriate status codes

## TanStack Query Hook (`hooks/useWeather.ts`)
- `useWeather(lat: number, lng: number)` hook
- Fetches from `/api/weather?lat=X&lng=Y`
- `staleTime: 15 * 60 * 1000` (15 minutes)
- `refetchInterval: 15 * 60 * 1000`
- Returns `{ data, isLoading, error }`
- Only enabled when lat/lng are provided

## Dashboard Card (`components/dashboard/weather-card.tsx`)
'use client' component:
- Uses the `useWeather` hook with selected location coords from Zustand
- Shows current conditions: temperature (°F), wind speed/direction, humidity, UV index, precipitation, weather description
- Shows a weather icon based on weatherCode (use lucide-react icons: Sun, Cloud, CloudRain, etc.)
- Shows "Last updated" timestamp
- Skeleton loading state
- Alert error state
- Compact card layout using shadcn Card

## Wire into Dashboard
Update `app/page.tsx` to replace the weather placeholder card with the real WeatherCard component.

## Patterns to follow
- See `lib/api/weather.ts` for the API client (already created in step 1)
- See `lib/types/index.ts` for the Weather types
- See `stores/locationStore.ts` for accessing selected location

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY weather feature. Do not modify other dashboard cards or features.
