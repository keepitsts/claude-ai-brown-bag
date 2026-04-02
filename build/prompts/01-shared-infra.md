# Step 1: Shared Infrastructure

## What to build
Types, API client wrappers, Zustand stores, TanStack Query provider, and the curated federal lands location list. Every feature depends on this layer.

## TypeScript types (`lib/types/`)

Create `lib/types/index.ts` with interfaces for:

### Location
```typescript
interface FederalLand {
  id: string
  name: string
  agency: 'NPS' | 'BLM' | 'FWS' | 'BIA' | 'USBR' | 'USFS'
  agencyName: string
  state: string
  lat: number
  lng: number
  description?: string
}
```

### Weather (Open-Meteo response shape)
- CurrentWeather: temperature, windSpeed, windDirection, humidity, uvIndex, precipitation, weatherCode, summary
- DailyForecast: date, tempMax, tempMin, precipitationProbability, weatherCode

### Seismic (USGS GeoJSON response shape)
- Earthquake: id, magnitude, place, time, lat, lng, depth, url

### Fire (NASA FIRMS response shape)
- FireDetection: lat, lng, brightness, scan, track, acqDate, acqTime, confidence, satellite

### Crime (FBI API response shape)
- CrimeStats: year, offenseType, count, rate

### Astronomy (Open-Meteo response shape)
- AstronomyData: sunrise, sunset, solarNoon, daylightDuration, moonPhase

### Briefing
- Briefing: id, locationId, locationName, generatedAt, content (the AI text), dataSnapshot (the raw data used)

## API client wrappers (`lib/api/`)

Create one file per API. Each exports an async function that:
- Takes typed parameters (lat, lng, radius, etc.)
- Calls the external API
- Parses and returns typed data
- Handles errors with descriptive messages

Files: `weather.ts`, `seismic.ts`, `fires.ts`, `crime.ts`, `geocode.ts`, `astronomy.ts`

## Zustand stores (`stores/`)

### `stores/locationStore.ts`
- `selectedLocation: FederalLand | null`
- `setLocation(location: FederalLand): void`
- Persist to localStorage with key `trailhead-location`

### `stores/briefingStore.ts`
- `history: Briefing[]`
- `addBriefing(briefing: Briefing): void`
- `getBriefingsForLocation(locationId: string): Briefing[]`
- Persist to localStorage with key `trailhead-briefings`

### `stores/watchlistStore.ts`
- `locations: FederalLand[]`
- `addLocation(location: FederalLand): void`
- `removeLocation(id: string): void`
- `isWatched(id: string): boolean`
- Persist to localStorage with key `trailhead-watchlist`

## TanStack Query provider

Create `components/providers.tsx` with QueryClientProvider wrapping children. Add it to `app/layout.tsx`.

## Federal Lands location list (`lib/constants/locations.ts`)

Create a curated list of 20-30 notable federal land locations, organized by agency. Include a mix of:
- 5-6 National Parks (NPS): Yellowstone, Yosemite, Grand Canyon, Glacier, Everglades, Denali
- 5-6 BLM lands: Red Rock Canyon, Moab, Sonoran Desert NM, etc.
- 3-4 Wildlife Refuges (FWS): Arctic NWR, Okefenokee, Merritt Island, etc.
- 3-4 BIA lands: representative reservations
- 2-3 USFS: major national forests
- 2-3 USBR: major reclamation sites

Each with accurate lat/lng coordinates.

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY shared infrastructure. No pages, no UI components, no API route handlers yet.
