# Building the System That Builds the System

A Software Engineer's Guide to Claude Code

Rudy Zauel  |  Simple Technology Solutions  |  April 3, 2026

---

# The Experiment

I had a spec for a 7-feature application with 6 API integrations.
Can Claude Code just... build it while I walk my dog?

**What I Wanted**

- "Here's my spec. Build it."
- Go walk Milo (28lb Cavapoo).
- Come back to a working app.

**What Actually Happens**

- Context window fills up by feature 4.
- It forgets patterns from feature 1.
- Mistakes compound without verification.
- Quality degrades well before the limit.
- You come back to a mess.

---

# The Insight

The insight:

I needed to build the system that would build the system.

Not one giant prompt. A pipeline of markdown artifacts — each one the input to the next — that refines an idea into a deployable application.

---

# The Refinement Chain

Each markdown file was the input that produced the next one

1. **Company Briefing** — Who is STS? What do they care about? `research/`
2. **Demo Spec** — 7 features, 6 APIs, target persona, scope `research/`
3. **Tech Stack Decision Record** — Every choice with rationale, not just 'use React' `research/`
4. **Build Process Research** — What agentic harness? Headless pipeline recommended `research/`
5. **CLAUDE.md + 11 Build Prompts** — Conventions + per-feature spec files `build/prompts/`
6. **Working Application** — 4,455 lines, 58 files, 7 features, deployed `trailhead/`

Every artifact was a markdown file. The entire process is in the repo.

`prompts/001 through prompts/017  |  research/*.md  |  build/prompts/00-10`

---

# Step 1: Research First, Code Later

I used claude.ai (with web search) for research, Claude Code for implementation

**Company Briefing** — `simple-technology-solutions-a-pre-presentation-briefing...md`

- Who is STS? $60M DOI contract, 3,000 officers, 855+ locations
- Their AI products: C-CAT, LEI, A³
- Culture: mission-first, 'Keep IT Simple'
- Key people and what they care about

**Demo Spec** — `sts-demo-spec.md`

- 7 features defined in detail (F1–F7)
- 6 free APIs identified with auth requirements
- Target persona: DOI law enforcement officer
- What the demo IS and IS NOT
- Success criteria for the presentation

**Tech Stack Decision Record** — `trailhead-tech-stack.md`

- Every choice documented with rationale
- Not 'use React' but 'why Next.js App Router'
- State management: Zustand + TanStack Query and why
- What was deliberately left out (database, auth, tests)
- Full dependency list and project structure

---

# Step 2: "I Need an Agentic Harness"

Before writing any code, I researched how to make Claude Code build reliably

**The Research Prompt I Wrote**

```
What I want:  give the spec to Claude Code, walk my dog, come back to a working app.

What I know won't work:  Claude Code won't build 7 features in one prompt.
Context fills up. It forgets patterns. Mistakes compound.

What I need:  an approach that decomposes the spec into right-sized units,
sequences the build, verifies each unit, and minimizes human intervention.

Evaluate:  single session, headless orchestration, Agent SDK pipeline,
/batch, agent teams, custom subagents, or something I haven't thought of.

Be opinionated — I want 'here's what you should do' not '5 options to consider.'
```

**The Recommendation**

- **Sequential headless pipeline** — claude -p with fresh context per feature
- **TypeScript verification gates** — tsc --noEmit + build between every step
- **Auto-commit on success** — Clean git history, one commit per feature
- **CLAUDE.md under 80 lines** — Persistent memory across fresh contexts
- **11 self-contained prompts** — Each prompt file is a complete feature spec

Rejected: Agent Teams (experimental, unstable), /batch (can't handle shared dependencies), single long session (context degrades by feature 4)

---

# Step 3: CLAUDE.md — 50 Lines of Persistent Memory

Every fresh claude -p call loads this file. It's how conventions survive across context windows.

```
# TRAILHEAD — Federal Lands Daily Briefing Tool

## Tech Stack
- Next.js 15 App Router, TypeScript strict
- Tailwind CSS v4 (CSS-based config, NOT tailwind.config.js)
- shadcn/ui, Zustand for client state, TanStack Query v5

## Critical Conventions
- Server Components by default. 'use client' ONLY for interactivity
- Next.js 15: params are Promises — must await
- React Leaflet REQUIRES dynamic import with ssr: false
- Data flow: lib/api/ → app/api/ route → TanStack Query hook → component
- Named exports. Conventional commits (feat:, fix:, refactor:)

## Verification (run after every feature)
npx tsc --noEmit && npm run build
```

**Why This Matters**

- Each feature builds in a fresh context window — no memory of previous features
- CLAUDE.md is the only thing that carries forward
- It tells Claude the patterns, not the history
- Under 80 lines — every line competes for the model's attention
- Claude rediscovers the codebase from the filesystem, guided by these conventions
- The data flow pattern (lib/api → route → hook → component) kept all 11 features consistent

---

# Step 4: The Build Pipeline

A 30-line bash script that runs 11 headless Claude Code calls

```bash
#!/bin/bash

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

# Run all 11 features sequentially
build_step "scaffold"    "$(cat build/prompts/00-scaffold.md)"
build_step "shared-infra" "$(cat build/prompts/01-shared-infra.md)"
build_step "base-layout" "$(cat build/prompts/02-base-layout.md)"
# ... through 10-integration.md
```

**11 Steps, 0 Failures**

| Step | Feature | What Was Built |
|------|---------|---------------|
| 00 | Scaffold | Next.js 15 + Tailwind v4 + shadcn/ui |
| 01 | Shared Infra | Types, API clients, stores, locations |
| 02 | Base Layout | Sidebar, location selector, dashboard shell |
| 03 | Weather | Open-Meteo + 15min auto-refresh |
| 04 | Seismic | USGS earthquakes + 5min refresh |
| 05 | Fires | NASA FIRMS + CSV parsing |
| 06 | Crime | FBI Crime Data + rate aggregation |
| 07 | Astronomy | Sunrise/sunset/moon phase |
| 08 | Map | React Leaflet + fire/earthquake markers |
| 09 | Briefing | Claude API streaming + 5-section format |
| 10 | Integration | Watch list, responsive, error boundaries |

---

# What a Build Prompt Looks Like

Each of the 11 prompts is a self-contained feature spec (~200-400 words)

```markdown
# Feature: USGS Earthquake Monitoring

## What to build
- API route at app/api/seismic/route.ts
- Earthquake list component with magnitude-coded badges
- Map overlay with circle markers sized by magnitude
- TanStack Query hook in hooks/useSeismic.ts

## API Details
- Endpoint: https://earthquake.usgs.gov/fdsnws/event/1/query
- Parameters: format=geojson, latitude, longitude, maxradiuskm
- No authentication required

## Patterns to follow     ← THIS IS THE KEY SECTION
- See lib/api/weather.ts for API client wrapper pattern
- See app/api/weather/route.ts for route handler pattern
- See hooks/useWeather.ts for TanStack Query hook pattern

## Scope Control
- Implement ONLY what is specified above
- Do not add features beyond these requirements
```

**Key Elements**

- **"Patterns to follow"** — Points Claude to existing code. It reads those files first, then follows the same structure.
- **"API Details"** — Exact endpoints, parameters, auth requirements. No guessing.
- **"What to build"** — Concrete deliverables. Files that should exist when done.
- **"Scope Control"** — Prevents Claude from adding auth, dark mode, i18n, etc.

---

# Step 5: The Debug Loop

The pipeline built the app. Then reality hit — 3 out of 6 APIs had issues.

**Debug Method:** Open app in browser → See error → Save console log to debug-logs/ → Tell Claude Code "read this log" → Claude diagnoses and fixes

| API | Error | Cause | Resolution |
|-----|-------|-------|-----------|
| NASA FIRMS | 400 Error | URL used lat,lng,radius format — FIRMS expects bounding box west,south,east,north | One prompt, fixed |
| FBI Crime Data | 503 + 404 | Env var mismatch (FBI_API_KEY vs FBI_CRIME_API_KEY) AND wrong endpoint format entirely. Had to rewrite to /summarized/state/{state}/{offense}?from=MM-YYYY&to=MM-YYYY | Two prompts, complete rewrite |
| Weather | Wrong units | Open-Meteo defaults to Celsius/km/h. Needed temperature_unit=fahrenheit, wind_speed_unit=mph | One line fix |
| AI Briefing | Empty response | Anthropic API key had zero credits. Not a code bug at all. | No code fix — bought credits |

---

# The Result

| Metric | Value |
|--------|-------|
| Lines of TypeScript | 4,455 |
| Source Files | 58 |
| Git Commits | 20 |
| Build Steps | 11 |
| Build Failures | 0 |

**trailhead-pearl.vercel.app**

TRAILHEAD — Federal Lands Daily Briefing Tool

- Real-time weather, seismic, wildfire, crime, and astronomy data for 25 federal land sites
- AI-generated operational briefings via Claude API with streaming
- Interactive Leaflet map with fire and earthquake overlays
- Briefing history, multi-location watchlist, and shareable export
- Deployed to Vercel with all API keys configured

---

# Live Demo

trailhead-pearl.vercel.app

---

# What I Learned

1. **Don't prompt. Engineer.** — The prompt is the last step. Before it, you need research, a spec, a tech stack decision record, a build pipeline, and a conventions file. The system that builds the system is the real work.

2. **Fresh context beats long context.** — 11 separate claude -p calls with 50 lines of CLAUDE.md outperformed one long session that degraded by feature 4. Claude rediscovers the codebase from the filesystem — you just need to tell it the patterns.

3. **Verification gates are non-negotiable.** — TypeScript compilation + build between every step caught errors before they compounded. Without this, feature 7 would inherit broken assumptions from feature 3.

4. **Markdown in, software out.** — The entire process was: write a markdown file, feed it to Claude, get an artifact, use that artifact to write the next markdown file. The repo is the complete record.

5. **AI gets you 0–80%. You're still the engineer.** — API format mismatches, env var typos, wrong units — real-world integration still needs a human who reads the error and understands the domain.

---

# Questions?

App: trailhead-pearl.vercel.app
Repo: github.com/keepitsts/claude-ai-brown-bag

Every prompt, every research artifact, every build script is in the repo. The entire process is transparent.
