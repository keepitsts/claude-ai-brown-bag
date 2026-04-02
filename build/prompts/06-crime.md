# Step 6: Crime Context (FBI Crime Data API)

## What to build
API route handler, TanStack Query hook, and dashboard card for crime statistics in the state where the selected location resides.

## API Route (`app/api/crime/route.ts`)
- GET handler accepting `state` (2-letter state abbreviation) query param
- Calls `lib/api/crime.ts` client wrapper
- Uses `process.env.FBI_CRIME_API_KEY` for authentication
- FBI CDE API base: `https://api.usa.gov/crime/fbi/cde/`
- Fetch offense estimates: `/estimate/state/{stateAbbr}?API_KEY={key}`
- Returns typed JSON with recent year crime statistics

## TanStack Query Hook (`hooks/useCrime.ts`)
- `useCrime(state: string)` hook
- Fetches from `/api/crime?state=XX`
- `staleTime: 24 * 60 * 60 * 1000` (24 hours — crime stats don't change often)
- Only enabled when state is provided

## Dashboard Card (`components/dashboard/crime-card.tsx`)
'use client' component:
- Shows key crime statistics for the state: violent crime rate, property crime rate
- Context note: "Based on most recent FBI UCR data for {State}"
- Bar or simple stat display showing rates per 100k population
- "Crime data unavailable" fallback if API fails (this API can be unreliable)
- Skeleton loading state
- Shield icon (lucide-react)

## Wire into Dashboard
Update `app/page.tsx` to replace the crime placeholder card with the real CrimeCard component.

## Patterns to follow
- Follow the same API route → hook → card pattern as previous features
- See previous features for exact patterns
- Note: this feature uses `state` param (from FederalLand.state) not lat/lng

## Important
- The FBI API can be slow and sometimes returns unexpected formats. Be defensive in parsing.
- If the API key is missing, show a graceful fallback, not a crash.
- The state abbreviation comes from the selected location's `state` field in the Zustand store.

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY crime feature. Do not modify other features.
