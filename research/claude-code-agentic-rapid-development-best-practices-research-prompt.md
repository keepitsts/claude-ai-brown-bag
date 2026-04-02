# Research Prompt: Claude Code Agentic Rapid Development Best Practices

## My Situation

I'm building a demo web application called **TRAILHEAD** (a Federal Lands Daily Briefing Tool) for a brown bag presentation to Simple Technology Solutions (STS) — a federal IT and AI company — on Friday 4/3/2026. I have roughly 8 hours of build time left.

The application has 7 features (F1–F7) involving 6 external API integrations, an interactive map, AI-generated briefings via Claude API, and local state persistence. The full spec and tech stack are below.

### What I want to happen

I want to give the spec to Claude Code and have it build the entire application while I walk my dog Milo (a 28lb Cavapoo). Come back, and it's done.

### What I know won't work

Claude Code out of the box will not successfully build a 7-feature, 6-API application in a single prompt. The context window fills up. It loses track of earlier decisions. It makes mistakes it can't verify. It drifts from the spec. By feature 4 it's forgotten the patterns it established in feature 1.

### What I need

A recommended approach — whether that's an agentic harness, an SDLC pipeline, agent teams, custom subagents, skills, headless mode orchestration, or some combination — that lets me:

1. **Decompose the spec** into right-sized units that Claude Code can build successfully in one shot
2. **Sequence the build** so each unit builds on the last (shared types, API clients, etc.)
3. **Verify each unit** before moving to the next (does it compile? do the APIs respond? does the UI render?)
4. **Preserve context** so decisions made in unit 1 carry forward to unit 7 without re-reading the entire codebase each time
5. **Minimize human intervention** — ideally I set it running and check in periodically, not babysit every feature

### Tech Stack (decided)

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Zustand (client state) + TanStack Query v5 (server state)
- React Leaflet + OpenStreetMap (map)
- Claude API via Anthropic SDK (AI briefings)
- pnpm, ESLint, Prettier
- Deploy to Vercel

### The 7 Features

- **F1: Federal Lands Location Selector** — curated list of federal lands organized by agency, geocoding via Nominatim, persists across sessions
- **F2: Real-Time Conditions Dashboard** — single-screen summary pulling weather (Open-Meteo), seismic (USGS), fires (NASA FIRMS), astronomy (Open-Meteo), with auto-refresh
- **F3: AI-Generated Daily Briefing** — gathers all data, sends to Claude API, streams back a 5-section law enforcement briefing
- **F4: Interactive Situational Map** — Leaflet map with fire/earthquake markers, station pin, clickable details
- **F5: Briefing History** — localStorage persistence of past briefings, reverse chronological browsing
- **F6: Multi-Location Watch List** — save multiple locations, compact summary cards with alerts
- **F7: Shareable Briefing Export** — copy-to-clipboard and print-friendly view

### Data Sources (all free, no credit card)

| Source | API | Auth |
|--------|-----|------|
| Weather & forecasts | Open-Meteo | None |
| Seismic activity | USGS Earthquake Hazards | None |
| Wildfire detection | NASA FIRMS | API key (free) |
| Crime context | FBI Crime Data | API key (free) |
| Geospatial | Nominatim (OpenStreetMap) | None |
| Astronomy | Open-Meteo (astronomy extension) | None |

### Claude Code Capabilities Available

These are the mechanisms Claude Code provides that could be part of the solution:

- **Custom subagents** — specialized agents with custom system prompts, tool restrictions, and independent context windows. Run within a session. Can use different models (e.g., Haiku for cheap exploration, Opus for implementation).
- **Agent teams** (experimental) — multiple Claude Code instances coordinating via shared task list and direct messaging. Each has its own context window. Good for parallel independent work.
- **Skills** — markdown-based instruction sets that Claude loads automatically or via `/skill-name`. Can include supporting files.
- **Hooks** — shell commands/HTTP endpoints that fire at lifecycle events (PreToolUse, PostToolUse, Stop, etc.). Can enforce patterns, run verification, inject context.
- **Headless mode / Agent SDK** — run Claude Code programmatically via `claude -p "prompt"`. Supports `--allowedTools`, `--output-format json`, `--continue` for conversation chaining. Can be orchestrated from a shell script or Python.
- **`/batch` skill** — built-in skill that decomposes work into 5-30 independent units, spawns one agent per unit in isolated git worktrees, each implements and opens a PR.
- **CLAUDE.md** — project-level instructions loaded into every session. Can encode conventions, patterns, and constraints.
- **Plan mode** — separates exploration from execution. Claude researches first, proposes a plan, then implements after approval.
- **Context window management** — `/compact` to summarize and free context, subagents to keep exploration out of main context, `--bare` mode for scripted calls.

## What I Want From This Research

1. **Survey the current landscape** (April 2026) of how people are using Claude Code for rapid application development. What patterns are working? What's the state of the art for building a multi-feature application with Claude Code?

2. **Evaluate the options** for my specific situation:
   - Single session with careful prompting and `/compact` between features
   - Shell script orchestrating multiple `claude -p` headless calls in sequence
   - Python/TypeScript Agent SDK pipeline with structured outputs and verification gates
   - `/batch` skill for parallel feature development
   - Agent teams for parallel coordinated work
   - Custom subagents for specialized tasks (API integration, UI, etc.)
   - A combination of the above
   - Something I haven't thought of

3. **Recommend a specific approach** for building TRAILHEAD, including:
   - How to decompose the 7 features into build units
   - What order to build them (considering dependencies)
   - What mechanism to use (subagents, headless, agent teams, etc.)
   - How to handle verification between units
   - How much CLAUDE.md / skill / hook infrastructure to set up before starting
   - Realistic expectations for how much human intervention is needed
   - What can go wrong and how to recover

4. **Provide actionable implementation details** — not just "use headless mode" but the actual structure: what the orchestration script looks like, what the CLAUDE.md should contain, what skills or hooks to create, what the prompts for each build unit should look like.

5. **Consider the demo angle** — remember this is for a presentation. The build process itself is part of the story. A git history showing clean, sequential feature commits tells a better story than a messy merge of 7 parallel branches.

Write the recommendation in markdown. Be opinionated — I want "here's what you should do" not "here are 5 options to consider."
