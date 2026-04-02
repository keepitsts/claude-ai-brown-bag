# Step 2: Base Layout + Navigation

## What to build
The app shell: a sidebar navigation, main content area, and the location selector (F1). This is the frame every feature renders within.

## App Layout (`app/layout.tsx`)
- Import the Providers component (QueryClientProvider)
- Global styles, Inter font from next/font
- Sidebar + main content layout using Tailwind grid

## Sidebar Navigation (`components/sidebar.tsx`)
'use client' component with:
- TRAILHEAD logo/title at top
- Nav links using lucide-react icons:
  - Dashboard (LayoutDashboard icon) → `/`
  - Briefing (FileText icon) → `/briefing`
  - Map (Map icon) → `/map`
  - History (Clock icon) → `/history`
  - Watch List (Eye icon) → `/watchlist`
- Active state highlighting using `usePathname()`
- Location selector at the bottom of the sidebar

## Location Selector (`components/location/location-selector.tsx`)
'use client' component implementing F1:
- shadcn Command/Combobox pattern for searchable dropdown
- Groups locations by agency (NPS, BLM, FWS, etc.)
- Shows location name, state, and agency badge
- On select: updates Zustand locationStore
- Shows currently selected location with a pin icon
- Pulls locations from `lib/constants/locations.ts`

## Dashboard Page (`app/page.tsx`)
- Server component shell
- Shows selected location name and coordinates
- Placeholder cards (shadcn Card) for each data source: Weather, Seismic, Fires, Crime, Astronomy
- Each card shows "Select a location to view data" if no location selected
- Each card shows a Skeleton loader as placeholder
- This page will be populated by later features

## Stub pages
Create minimal page.tsx files for: `/briefing`, `/map`, `/history`, `/watchlist`
Each shows the page title and "Coming soon" placeholder.

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
ONLY the layout shell, navigation, location selector (F1), and placeholder pages. Do not implement any data fetching, API routes, or feature-specific UI.
