# Step 8: Interactive Situational Map (F4)

## What to build
Full-page map view centered on the selected location with fire and earthquake overlays.

## CRITICAL: React Leaflet + Next.js SSR
React Leaflet does NOT work with server-side rendering. You MUST:
1. Create the map component with 'use client'
2. Import it in the page using `dynamic(() => import('./MapComponent'), { ssr: false })`
3. Import Leaflet CSS in the component: `import 'leaflet/dist/leaflet.css'`
4. Fix the default marker icon issue with Leaflet + webpack (the classic `delete L.Icon.Default.prototype._getIconUrl` fix)

## Map Component (`components/map/situational-map.tsx`)
'use client' component:
- MapContainer centered on selected location (from Zustand locationStore)
- OpenStreetMap tile layer
- Zoom level 10 by default
- FlyTo animation when location changes

## Map Overlays
### Station Pin
- Blue marker at selected location with popup showing location name and agency

### Fire Markers (`components/map/fire-markers.tsx`)
- Red circle markers for each fire detection
- Size based on brightness value
- Popup with: detection time, confidence, satellite, coordinates
- Uses the `useFires` hook (already built)

### Earthquake Markers (`components/map/earthquake-markers.tsx`)
- Yellow/orange circle markers for each earthquake
- Size based on magnitude (exponential scale)
- Color intensity based on depth
- Popup with: magnitude, depth, location description, time
- Uses the `useSeismic` hook (already built)

## Map Page (`app/map/page.tsx`)
- Full-height map (calc(100vh - nav height))
- Dynamic import of the map component with `ssr: false`
- "Select a location" prompt if no location selected
- Legend overlay showing marker types

## Patterns to follow
- See `hooks/useSeismic.ts` and `hooks/useFires.ts` for data (already built)
- See `stores/locationStore.ts` for selected location

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY the map page and components. Do not modify the dashboard or other features.
