# TRAILHEAD — Tech Stack Decision Record

## Core Framework

**Next.js 15 (App Router) + TypeScript**

Non-negotiable for this project. Three reasons:

1. **API key management.** NASA FIRMS and FBI Crime Data require API keys. Next.js Route Handlers (`app/api/`) proxy these calls server-side so keys never hit the browser. No separate backend needed.
2. **Spec-to-structure mapping.** Each feature (F1–F7) maps cleanly to an App Router layout: `/dashboard`, `/briefing`, `/map`, `/history`, `/watchlist`. Spec-driven development works best when your file tree mirrors your feature list.
3. **Demo performance.** Server components for initial data fetch mean the dashboard loads with data already rendered — no spinner-then-content pattern during a live demo.

TypeScript because the app stitches together six different API response shapes. Untyped API responses in a 12-hour build is how you lose three hours to a typo.

---

## State Management

**Zustand**

Not Redux, not Context API. Zustand is the right size for this app:

- Global state is limited: selected location, watch list, briefing history, refresh timestamps.
- Zustand's `persist` middleware handles F5 (Briefing History) and F6 (Watch List) with localStorage out of the box — zero extra code.
- No provider wrappers, no boilerplate. You define a store in one file and import it anywhere.

For server state (API responses), use **TanStack Query (React Query) v5**:

- Built-in caching and background refetch handles the "auto-refresh on a reasonable interval" requirement in F2.
- `staleTime` and `refetchInterval` config per query means weather refreshes every 15 minutes, seismic every 5, fire every 30 — no custom polling logic.
- Loading/error states are free, which matters when you're hitting six APIs that can each fail independently.

---

## Styling

**Tailwind CSS v4**

Speed of iteration is the priority. Tailwind lets you build a professional-looking dashboard without writing CSS files. Specific to this project:

- The dashboard (F2) is a card-based layout — Tailwind's grid utilities handle this in markup.
- The briefing (F3) needs clean typography for generated text — `@tailwindcss/typography` (the `prose` class) renders AI output beautifully with zero effort.
- Responsive is a stated non-goal ("responsive web is fine") — Tailwind's breakpoint prefixes handle this casually without a design system.

Add **`shadcn/ui`** for polished interactive components: the location selector dropdown/combobox (F1), buttons, cards, dialogs. It's copy-paste, not a dependency — you own the code and can modify freely.

---

## Interactive Map (F4)

**React Leaflet + OpenStreetMap tiles**

Not Mapbox. Reasoning:

- **Zero cost, zero API key.** Mapbox looks marginally better but requires a token and has usage limits. For a demo that might get shared around, free is better.
- **react-leaflet** has first-class React component APIs — `<MapContainer>`, `<Marker>`, `<Popup>`, `<Circle>` — which map directly to F4 requirements (fire markers, earthquake markers, station pin).
- Leaflet is 42KB. It loads fast in a live demo.
- Custom marker icons are trivial — use red for fires, yellow for earthquakes, blue for the station. No design work needed.

For federal land boundaries ("or a reasonable approximation"), overlay a GeoJSON layer from the USGS Protected Areas Database (PAD-US) — it's public domain and available as GeoJSON downloads.

---

## AI Integration (F3)

**Anthropic Claude API (claude-sonnet-4-20250514) via Next.js Route Handler**

Architecture:

```
User taps "Generate Briefing"
  → Client POST to /api/briefing
  → Route Handler gathers all six data sources in parallel (Promise.all)
  → Constructs structured prompt with all data as context
  → Calls Claude API with system prompt defining briefing format
  → Streams response back to client
  → Client renders briefing with typing effect
```

Use **streaming** (`stream: true`) for the demo. Watching the briefing write itself in real time is dramatically more impressive than a loading spinner followed by a wall of text. Next.js Route Handlers support streaming responses natively.

The system prompt should define the five briefing sections (F3) as a strict output format. Claude follows structured output instructions reliably — no parsing gymnastics needed.

Model choice: **claude-sonnet-4-20250514**. Fast enough for a live demo, smart enough to reason across six data inputs and write a coherent briefing. Opus would be overkill and slower.

---

## Data Fetching Architecture

All external API calls go through Next.js Route Handlers:

| Feature | Endpoint | Upstream API | Caching Strategy |
|---------|----------|-------------|-----------------|
| Weather | `/api/weather?lat=X&lng=Y` | Open-Meteo | TanStack Query, 15 min stale |
| Earthquakes | `/api/seismic?lat=X&lng=Y&radius=Z` | USGS Earthquake API | TanStack Query, 5 min stale |
| Fires | `/api/fires?lat=X&lng=Y` | NASA FIRMS | TanStack Query, 30 min stale |
| Crime | `/api/crime?state=XX` | FBI Crime Data API | TanStack Query, 24 hr stale |
| Geocoding | `/api/geocode?q=X` | Nominatim | TanStack Query, 1 hr stale |
| Astronomy | `/api/astronomy?lat=X&lng=Y` | Open-Meteo | TanStack Query, 1 hr stale |
| Briefing | `/api/briefing` (POST) | Claude API | Not cached (on-demand) |

This gives you:
- A clean API surface the frontend consumes uniformly
- API keys isolated server-side
- Rate limit management in one place (Nominatim requires a custom User-Agent and max 1 req/sec)
- Easy mocking for development — swap any route handler to return fixture data

---

## Briefing History & Persistence (F5, F6)

**Zustand `persist` middleware → localStorage**

For a demo, this is perfect:

```typescript
// stores/briefingStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BriefingEntry {
  id: string
  locationName: string
  generatedAt: string
  content: string
  locationCoords: { lat: number; lng: number }
}

interface BriefingStore {
  history: BriefingEntry[]
  addBriefing: (entry: BriefingEntry) => void
}

export const useBriefingStore = create<BriefingStore>()(
  persist(
    (set) => ({
      history: [],
      addBriefing: (entry) =>
        set((state) => ({
          history: [entry, ...state.history]
        })),
    }),
    { name: 'trailhead-briefings' }
  )
)
```

No database. No auth. Briefings survive browser refresh, which is all a demo needs. Same pattern for the watch list (F6).

---

## Export (F7)

**Clipboard API + `window.print()` with a print stylesheet**

Don't overthink this. The spec explicitly says "no PDF generation required — clean, copy-paste-friendly formatted text is sufficient."

- "Copy Briefing" button → `navigator.clipboard.writeText(briefingMarkdown)`
- "Print View" button → opens briefing in a clean layout, triggers `window.print()`
- Add a `@media print` stylesheet that hides the nav, map, and controls. Five lines of CSS.

---

## Project Structure

```
trailhead/
├── app/
│   ├── layout.tsx                  # Shell: nav + location context
│   ├── page.tsx                    # Dashboard (F2) — the default view
│   ├── briefing/
│   │   └── page.tsx                # Briefing generation & display (F3)
│   ├── map/
│   │   └── page.tsx                # Situational map (F4)
│   ├── history/
│   │   └── page.tsx                # Briefing history (F5)
│   ├── watchlist/
│   │   └── page.tsx                # Multi-location watch list (F6)
│   └── api/
│       ├── weather/route.ts
│       ├── seismic/route.ts
│       ├── fires/route.ts
│       ├── crime/route.ts
│       ├── geocode/route.ts
│       ├── astronomy/route.ts
│       └── briefing/route.ts
├── components/
│   ├── location-selector.tsx       # F1
│   ├── conditions-dashboard.tsx    # F2
│   ├── briefing-viewer.tsx         # F3
│   ├── situational-map.tsx         # F4
│   ├── briefing-card.tsx           # F5, reused in history
│   ├── watchlist-card.tsx          # F6
│   └── ui/                         # shadcn/ui components
├── stores/
│   ├── locationStore.ts
│   ├── briefingStore.ts
│   └── watchlistStore.ts
├── lib/
│   ├── api-clients/                # Typed wrappers for each upstream API
│   ├── prompts/                    # Claude system prompt and prompt builder
│   └── locations.ts                # Curated federal lands location list
├── types/
│   └── index.ts                    # Shared TypeScript types for all API shapes
└── public/
    └── markers/                    # Custom Leaflet marker icons
```

---

## Dev Tooling

| Tool | Purpose |
|------|---------|
| **pnpm** | Package manager (faster than npm, stricter than yarn) |
| **ESLint + Prettier** | Formatting consistency across a fast build |
| **next dev (Turbopack)** | Fast HMR during development |

Skip testing infrastructure for a 12-hour demo build. The spec explicitly calls this a prototype. Write clean types and trust TypeScript to catch the rest.

---

## Full Dependency List

```json
{
  "dependencies": {
    "next": "^15",
    "react": "^19",
    "react-dom": "^19",
    "typescript": "^5",
    "zustand": "^5",
    "@tanstack/react-query": "^5",
    "react-leaflet": "^5",
    "leaflet": "^1.9",
    "@anthropic-ai/sdk": "^0.39",
    "lucide-react": "latest",
    "tailwindcss": "^4",
    "@tailwindcss/typography": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest",
    "date-fns": "^4"
  },
  "devDependencies": {
    "@types/leaflet": "^1.9",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "^15",
    "prettier": "^3",
    "prettier-plugin-tailwindcss": "latest"
  }
}
```

---

## What I Deliberately Left Out

- **Database.** localStorage is sufficient for a demo. Adding Postgres/SQLite adds deployment complexity with zero demo value.
- **Authentication.** The spec says "no authentication beyond what's needed to demo." Skip it entirely.
- **Testing.** Controversial, but correct for a 12-hour build. Types are your tests.
- **Docker / containerization.** Deploy to Vercel with `git push`. Done.
- **Component library (Material UI, Chakra, Ant).** Tailwind + shadcn/ui is lighter, faster to customize, and doesn't impose opinions that fight the design.
- **GraphQL.** Six REST APIs → six Route Handlers → TanStack Query. GraphQL adds a layer of abstraction with no payoff at this scale.

---

## Deployment

**Vercel** (free tier is sufficient for a demo)

- Push to GitHub → auto-deploy
- Environment variables for API keys (NASA FIRMS, FBI Crime Data, Anthropic)
- Edge functions for Route Handlers if latency matters
- Custom domain optional but impressive for a demo (`trailhead.vercel.app` works fine)
