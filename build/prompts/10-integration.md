# Step 10: Watch List (F6) + Integration + Polish

## What to build
The watch list feature (F6), cross-feature wiring, and final polish pass.

## Watch List Page (`app/watchlist/page.tsx`)
'use client' page implementing F6:
- Grid of compact summary cards for saved locations
- Each card shows:
  - Location name and agency badge
  - Current temperature (fetch weather on mount)
  - Active alerts: fire count, earthquake count (if any, show red badge)
  - "Last briefing: X hours ago" or "No briefings yet"
- "Add to Watch List" button on the main dashboard (integrate with location selector)
- Remove from watch list with confirmation
- Uses Zustand watchlistStore (already built)
- Empty state: "Add locations to your watch list from the dashboard"

## Watch List Cards (`components/watchlist/watchlist-card.tsx`)
'use client' component:
- Compact card with location info and live status
- Each card fetches its own weather/fire/seismic data via TanStack Query
- Click card to navigate to that location (set it as selected location)
- Star/unstar toggle

## Dashboard Integration
- Add a "Add to Watch List" / "Remove from Watch List" toggle button on the dashboard, next to the location selector
- Show a small watch list indicator in the sidebar showing count of watched locations

## Cross-Feature Polish
- Ensure all dashboard cards show consistently when no location is selected
- Ensure location changes propagate correctly to all components (map re-centers, data refetches)
- Verify all Skeleton loading states work consistently
- Ensure the sidebar active state highlighting works on all routes
- Add a brief "Welcome" state on the dashboard when no location is selected, explaining what the app does

## Responsive Layout
- Sidebar collapses to a top bar on mobile (< 768px)
- Dashboard cards stack vertically on mobile
- Map is full-width on mobile
- Briefing is readable on mobile

## Error Boundaries
- Add a simple error boundary wrapper around each dashboard card so one failing API doesn't break the whole page

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
Watch list (F6), integration wiring, responsive polish, error boundaries. Do NOT add new features, authentication, dark mode, or testing.
