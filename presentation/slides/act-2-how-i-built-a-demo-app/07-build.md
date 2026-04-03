# Build: 11 Steps, 0 Failures

## Slide

**Title:** Step 7 — "Let's Start Implementing"

- One prompt to Claude Code: **"research complete, let's start implementing"** — it built the entire pipeline and ran it
- Created `build/build.sh` (orchestration script), 11 feature prompts (`build/prompts/00–10`), and TRAILHEAD's CLAUDE.md
- **11 build steps, 0 failures** — every step passed TypeScript compilation and build on the first try
- Each step was a fresh `claude -p` call with its own whiteboard — feature 11 got the same quality as feature 1
- Result: 4,455 lines of TypeScript, 58 files, 7 features, 20 git commits

---

## Notes

### The Actual Prompt

```
research complete: research/building-trailhead-autonomously-with-claude-code.md
let's start implementing
```

That's it. Claude Code read the research result, then:
1. Created `build/build.sh` — the orchestration script with verification gates and auto-commit
2. Created 11 feature prompt files in `build/prompts/`
3. Created `trailhead/CLAUDE.md` — focused conventions under 80 lines
4. Ran all 11 build steps sequentially

### The Build Script

```bash
build_step() {
  local step_name="$1"
  local prompt="$2"

  # Fresh context window for each feature
  claude -p "$prompt" \
    --allowedTools "Read,Write,Edit,Bash,Glob,Grep"

  # Verification gate
  npx tsc --noEmit
  pnpm build

  # Only commit on success
  git add -A && git commit -m "feat: $step_name"
}

build_step "scaffold"     "$(cat build/prompts/00-scaffold.md)"
build_step "shared-infra"  "$(cat build/prompts/01-shared-infra.md)"
# ... through 10-integration.md
```

### What Each Build Step Produced

| Step | Feature | What Was Built |
|------|---------|---------------|
| 00 | Scaffold | Next.js 15 + Tailwind v4 + shadcn/ui (14 components), all dependencies via pnpm |
| 01 | Shared Infra | TypeScript types for 6 APIs, API client wrappers, 3 Zustand stores, TanStack Query provider, 25 curated federal land locations |
| 02 | Base Layout | Sidebar with nav links, searchable location selector grouped by agency, dashboard shell with placeholder cards |
| 03 | Weather | Open-Meteo API route + TanStack Query hook (15min auto-refresh) + dashboard card with weather icons |
| 04 | Seismic | USGS Earthquake API route + hook (5min refresh) + card with magnitude-coded badges |
| 05 | Fires | NASA FIRMS API route (CSV parsing) + hook (30min refresh) + card with alert banners + Haversine distance calc |
| 06 | Crime | FBI Crime Data API route + hook (24hr cache) + card with crime rate bars |
| 07 | Astronomy | Open-Meteo Astronomy API route + hook (1hr cache) + card with sunrise/sunset/moon phase/golden hour |
| 08 | Map | React Leaflet map (dynamic import, ssr:false), fire markers (red), earthquake markers (yellow), station pin, FlyTo animation, legend |
| 09 | Briefing | Claude API streaming briefing with 5-section system prompt, briefing history with expand/collapse, clipboard copy + print view |
| 10 | Integration | Watch list with live status cards, responsive sidebar→hamburger, error boundaries, welcome state |

### What a Build Prompt Looks Like

Each of the 11 prompts follows the same structure (~200-400 words):

```markdown
# Feature: USGS Earthquake Monitoring

## What to build
- API route at app/api/seismic/route.ts
- Earthquake list component with magnitude-coded badges
- TanStack Query hook in hooks/useSeismic.ts

## API Details
- Endpoint: https://earthquake.usgs.gov/fdsnws/event/1/query
- Parameters: format=geojson, latitude, longitude, maxradiuskm
- No authentication required

## Patterns to follow          ← THE KEY SECTION
- See lib/api/weather.ts for API client wrapper pattern
- See app/api/weather/route.ts for route handler pattern
- See hooks/useWeather.ts for TanStack Query hook pattern

## Scope Control
- Implement ONLY what is specified above
- Do not add features beyond these requirements
```

### Why It Worked

- **"Patterns to follow"** — points Claude to existing code. It reads those files first, then follows the same structure. This is how consistency survived across 11 fresh context windows.
- **"API Details"** — exact endpoints, parameters, auth requirements. No guessing, no hallucination.
- **"Scope Control"** — prevents Claude from adding auth, dark mode, i18n, extra error handling.
- **Fresh context per step** — no degradation. Step 10 gets the same quality of attention as step 1.
- **Verification gates** — `tsc --noEmit && pnpm build` between every step catches errors before they compound.

### The Numbers

| Metric | Value |
|--------|-------|
| Lines of TypeScript | 4,455 |
| Source files | 58 |
| Git commits | 20 |
| Build steps | 11 |
| Build failures | 0 |
| Human lines of code written | 0 |
