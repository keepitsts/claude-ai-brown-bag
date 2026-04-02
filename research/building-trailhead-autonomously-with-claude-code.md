# Building TRAILHEAD autonomously with Claude Code

**A shell script pipeline orchestrating sequential `claude -p` headless calls — with per-feature verification gates, fresh context windows, and a concise CLAUDE.md — is the most reliable way to build a 7-feature Next.js application in ~8 hours with minimal babysitting.** This approach outperforms single long sessions (context degradation kills quality after 60% utilization), experimental Agent Teams (too unstable for a demo build), and `/batch` (designed for parallel independent migrations, not interdependent features). The community consensus as of early 2026 is clear: start simple, add complexity only when needed, and enforce quality gates deterministically through hooks rather than hoping the model self-checks.

---

## The landscape has matured rapidly since mid-2025

Claude Code's feature set now includes **five GA orchestration mechanisms** — headless mode (`claude -p`), the Agent SDK (Python/TypeScript), custom subagents (`.claude/agents/*.md`), skills (`.claude/skills/*/SKILL.md`), and hooks (12 lifecycle events) — plus one experimental feature, Agent Teams (peer-to-peer coordinated multi-instance work, shipped February 2026 with Opus 4.6). The ecosystem around these primitives is thriving: frameworks like Gas Town (Steve Yegge), Multiclaude (Dan Lorenc), Claude Squad, and claude-pipeline offer turnkey multi-agent orchestration, while Anthropic's own autonomous-coding quickstart demonstrates a two-agent (initializer + coder) pattern that tracks progress via `feature_list.json` and `claude-progress.txt` across sessions.

The core constraint driving all best practices remains the context window. Even with the **1M token window now GA for Opus 4.6**, quality degrades well before the limit. Auto-compaction fires at 64–75% capacity, but by then recall is already lossy. The Fixify CTO case study captures the community consensus: "Will we ever ship a fully autonomous integration? Probably not without human oversight. But we're rooting for the day when that oversight shrinks from hours to minutes." For your 8-hour TRAILHEAD build, the goal is to keep oversight under 2 hours total — periodic check-ins rather than continuous supervision.

---

## Why a sequential headless pipeline wins for TRAILHEAD

Three approaches were seriously evaluated for this use case:

**Shell script with `claude -p` (recommended).** Each feature gets its own headless invocation with a fresh context window. A bash script sequences the calls, runs `npx tsc --noEmit` and `npm run build` between steps, and commits only on success. Session IDs can be captured via `--output-format json | jq -r '.session_id'` for `--resume` if a feature needs a follow-up fix. The `--allowedTools` flag auto-approves Read, Write, Edit, and Bash without human confirmation. This is the simplest approach that delivers clean git history with sequential feature commits — exactly what a demo requires.

**Agent SDK pipeline (strong alternative).** The Python `claude_agent_sdk` or TypeScript `@anthropic-ai/claude-agent-sdk` packages expose the same agentic loop as a library, enabling structured outputs, programmatic decision-making, and custom MCP tools. This is more powerful but adds deployment complexity. For an 8-hour build where the orchestration script itself shouldn't consume significant development time, shell scripting is faster to set up. Reserve the SDK for production agent applications where you need tool approval callbacks, typed message streams, or in-process MCP servers.

**Agent Teams (not recommended for this build).** The experimental feature requires `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`, works best with Opus 4.6, has no session resumption, and costs significantly more tokens (each teammate is a full Claude instance). The peer-to-peer messaging and shared task list are powerful for complex refactoring, but for 7 features built by one developer in 8 hours, the coordination overhead and instability risk outweigh the parallelism benefit. Similarly, `/batch` (v2.1.63+) is designed for independent parallel migrations — it explicitly **cannot handle cross-unit dependencies**, which rules it out for features sharing types, API clients, and state stores.

---

## The orchestration script structure

The pipeline has three phases: setup, sequential feature builds, and final integration. Here is the recommended architecture:

```bash
#!/bin/bash
set -euo pipefail

PROJECT_DIR="$(pwd)"
LOG_DIR="$PROJECT_DIR/.claude/build-logs"
mkdir -p "$LOG_DIR"

verify() {
  echo "→ Running verification..."
  cd "$PROJECT_DIR"
  npx tsc --noEmit 2>&1 | tee "$LOG_DIR/tsc-$(date +%s).log"
  npm run build 2>&1 | tee "$LOG_DIR/build-$(date +%s).log"
  echo "✓ Verification passed"
}

build_step() {
  local step_name="$1"
  local prompt="$2"
  echo "═══ Building: $step_name ═══"
  
  claude -p "$prompt" \
    --output-format json \
    --allowedTools "Read,Write,Edit,Bash,Glob,Grep" \
    --append-system-prompt "After completing all changes, run 'npx tsc --noEmit' to verify TypeScript compiles. Fix any errors before finishing." \
    | tee "$LOG_DIR/$step_name.json"
  
  verify
  cd "$PROJECT_DIR" && git add -A && git commit -m "feat: $step_name"
  echo "✓ Committed: $step_name"
}

# Phase 1: Scaffold + shared infrastructure
build_step "scaffold" "$(cat prompts/00-scaffold.md)"
build_step "shared-infra" "$(cat prompts/01-shared-infra.md)"
build_step "base-layout" "$(cat prompts/02-base-layout.md)"

# Phase 2: Features (sequential, each with fresh context)
for i in 03 04 05 06 07 08 09; do
  prompt_file="prompts/$i-*.md"
  step_name=$(basename $prompt_file .md | sed 's/^[0-9]*-//')
  build_step "$step_name" "$(cat $prompt_file)"
done

# Phase 3: Final integration + polish
build_step "integration" "$(cat prompts/10-integration.md)"
echo "═══ BUILD COMPLETE ═══"
```

Each prompt file in `prompts/` contains a detailed, self-contained feature specification. The `--append-system-prompt` flag adds a verification instruction while preserving Claude Code's default system prompt and CLAUDE.md loading. Each `claude -p` call starts fresh — no context bleed between features.

---

## How to decompose TRAILHEAD into build units

The 7 features should be preceded by 2-3 infrastructure steps and followed by an integration pass. **Build shared code first, then features in dependency order, with simpler features early** to establish patterns that later features can follow.

| Step | Build unit | ~Time | Key outputs |
|------|-----------|-------|-------------|
| 0 | Project scaffold | 15 min | Next.js 15, TypeScript, Tailwind v4, shadcn/ui, package.json |
| 1 | Shared infrastructure | 30 min | Types (`lib/types/`), API clients (`lib/api/`), Zustand stores, TanStack Query config |
| 2 | Base layout + map shell | 30 min | App layout, sidebar, dynamic-imported Leaflet map component |
| 3 | Weather briefing (Open-Meteo) | 45 min | API route, weather card, map weather overlay |
| 4 | Seismic activity (USGS) | 45 min | API route, earthquake list, map markers |
| 5 | Wildfire tracking (NASA FIRMS) | 45 min | API route, fire alert card, map heat markers |
| 6 | Crime data (FBI Crime Data API) | 45 min | API route, crime statistics card |
| 7 | Location search (Nominatim) | 30 min | Geocoding search bar, map fly-to, location state |
| 8 | Astronomy data (Open-Meteo) | 30 min | Sunrise/sunset, moon phase card |
| 9 | AI briefing (Claude API) | 45 min | API route calling Claude, briefing summary card |
| 10 | Integration + polish | 45 min | Cross-feature wiring, responsive layout, error states |

This sequence respects dependencies: shared types and API clients exist before any feature touches them. The Leaflet map shell exists before features add overlays. Nominatim geocoding exists before features that need location context. The AI briefing comes last because it synthesizes data from all other features.

---

## The CLAUDE.md that makes this work

Keep it under **80 lines**. Claude Code's system prompt already consumes ~50 of the ~150–200 instruction slots frontier models reliably follow. Every unnecessary line in CLAUDE.md dilutes the instructions that matter. Do not auto-generate it — write it deliberately.

```markdown
# TRAILHEAD — Federal Lands Daily Briefing Tool

## Tech Stack
- Next.js 15 App Router (NO Pages Router patterns), TypeScript strict
- Tailwind CSS v4 (CSS-based config, NOT tailwind.config.js)
- shadcn/ui components, Zustand for client state, TanStack Query v5

## Project Structure
app/           → Pages, layouts, API routes
components/    → Shared UI (shadcn) and feature components
lib/api/       → External API client wrappers
lib/types/     → Shared TypeScript interfaces
hooks/         → Custom React hooks
stores/        → Zustand store slices

## Critical Conventions
- Server Components by default. Add 'use client' ONLY for interactivity
- Next.js 15: URL params are Promises — must await: `const p = await props.params`
- React Leaflet REQUIRES 'use client' + dynamic import with ssr: false
- All external API calls: lib/api/ wrapper → app/api/ route → TanStack Query hook
- Named exports for all components. Conventional commits (feat:, fix:, refactor:)
- Do NOT use getServerSideProps, getStaticProps, or Pages Router patterns

## External APIs (all free, no auth or free API key)
- Open-Meteo: weather forecasts (no key needed)
- USGS Earthquake API: seismic data (no key needed)
- NASA FIRMS: wildfire data (free API key)
- FBI Crime Data API: crime statistics (free API key)
- Nominatim: geocoding/search (no key, respect usage policy)
- Open-Meteo Astronomy: sun/moon data (no key needed)

## Verification (run after every feature)
npx tsc --noEmit && npm run build

## Git
Commit after each completed feature. Subject < 72 chars. Do not push.
```

Use `.claude/rules/` for path-specific rules if needed (e.g., a rule scoped to `components/**/*.tsx` enforcing shadcn patterns), but for a demo build the root CLAUDE.md is sufficient.

---

## Hooks and skills to configure before starting

**Two hooks deliver the highest leverage** for autonomous builds:

**Stop hook (verification gate).** This fires before Claude finishes its turn, running a verification agent that checks TypeScript compilation. If verification fails, Claude is forced to continue fixing:

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "cd \"$CLAUDE_PROJECT_DIR\" && npx tsc --noEmit 2>&1 | head -30; exit $?"
      }]
    }]
  }
}
```

**PostToolUse feedback hook (not blocking).** After file edits, run a quick type-check and feed errors back into context. This catches issues immediately rather than at session end. The critical insight from Shrivu Shankar (Abnormal AI, processing billions of Claude Code tokens monthly): block at commit time, not at write time. Blocking mid-edit confuses the model — let it finish its plan, then verify the result.

**One useful skill** — a `/verify` skill that runs the full test suite:

```markdown
---
name: verify
description: Run full project verification
context: fork
allowed-tools: Bash, Read
---
Run these checks in order and report results:
1. npx tsc --noEmit
2. npm run build  
3. curl -s http://localhost:3000/api/health (if dev server running)
Report: PASS or FAIL with specific errors.
```

---

## Context preservation without context window bloat

The headless pipeline approach sidesteps context management almost entirely — each `claude -p` call starts fresh. But Claude still needs to understand the existing codebase when building feature 7. Three mechanisms handle this:

**CLAUDE.md loads automatically** at session start, giving Claude the project structure, conventions, and API patterns in ~50 lines. This is the persistent "memory" across all sessions.

**Claude reads the filesystem.** When given a feature prompt like "Build the USGS earthquake feature following the patterns established in lib/api/ and the weather feature," Claude's first action is reading the relevant files. Opus 4.6 models are explicitly designed to rediscover state from the filesystem rather than relying on conversation history. This is why clean, well-organized code matters more than conversation continuity.

**The prompt file carries context.** Each `prompts/04-earthquakes.md` file should reference existing patterns: "Follow the same API route → TanStack Query hook → component pattern used in the weather feature. Reuse the MapOverlay component pattern from components/map/." This gives Claude a breadcrumb trail without stuffing the context window.

For the rare case where a feature spans multiple turns within a single `claude -p` call, the `--append-system-prompt` can include: "Your context window will auto-compact as needed. If compacted, re-read CLAUDE.md and the most recently modified files to re-orient."

---

## What each feature prompt should contain

Each prompt file in `prompts/` should follow this template (~200-400 words):

```markdown
# Feature: USGS Earthquake Monitoring

## What to build
- API route at app/api/earthquakes/route.ts that fetches from USGS API
- Earthquake list component showing recent seismic events near selected location
- Map overlay with circle markers sized by magnitude, colored by depth
- Zustand store slice for earthquake filter state (magnitude threshold, time range)
- TanStack Query hook in hooks/useEarthquakes.ts

## API Details
- Endpoint: https://earthquake.usgs.gov/fdsnws/event/1/query
- Parameters: format=geojson, starttime, endtime, latitude, longitude, maxradiuskm
- No authentication required

## Patterns to follow
- See lib/api/weather.ts for API client wrapper pattern
- See app/api/weather/route.ts for API route pattern
- See components/weather/ for component organization pattern
- See hooks/useWeather.ts for TanStack Query hook pattern

## Requirements
- Use existing types from lib/types/earthquake.ts (create if missing)
- Add to existing Zustand store in stores/briefingStore.ts
- Error and loading states using shadcn Skeleton and Alert components
- Map markers must use React Leaflet's CircleMarker component

## Verification
After implementation, run: npx tsc --noEmit && npm run build
```

The "Patterns to follow" section is the highest-leverage content. It tells Claude exactly where to look for established conventions, reducing hallucination risk and ensuring consistency across features.

---

## Realistic expectations for human intervention

Anthropic's own February 2026 research paper on agent autonomy found that **unguided attempts succeed ~33% of the time**, experienced users average 3.3 human interventions per session (down from 5.4 in August 2025), and the 99.9th percentile autonomous run time is ~45 minutes. The Opus 4.6 model achieves a **~14.5 hour time horizon at 50% task completion** for unattended work — impressive but far from guaranteed.

For TRAILHEAD specifically, expect:

- **~60–70% autonomous operation** with the headless pipeline and proper setup
- **10–15 human interventions** across the full 8-hour build, concentrated at API integration boundaries (response format mismatches), React Leaflet SSR issues (the dynamic import pattern is a consistent stumbling block), and Tailwind CSS v4 configuration (Claude frequently generates v3 `tailwind.config.js` patterns)
- **2–3 features will likely need a second pass** — the verification gate catches the failure, and you either re-run the prompt or manually fix 5-10 lines
- **The AI briefing feature (Claude API integration) will need the most oversight** because it depends on all other features' data structures

Plan to check in every 45–60 minutes. Review the git log, spot-check the dev server, and redirect if needed. The build script's `tee` logging means you can review what happened in each step. If a step fails verification, the `set -e` flag stops the pipeline — you inspect, fix or re-run, and resume.

---

## Common failure modes and recovery playbook

**The Loop (most common).** Claude tries the same fix with slight variations, never diagnosing the root cause. Recovery: kill the session, write the error to a file, start a fresh `claude -p` call with: "Read error-log.txt. This is a persistent error from the previous attempt. Diagnose the root cause — do not try the same approach. Explain your diagnosis before implementing."

**Context drift (long sessions only).** In the headless pipeline, this is largely avoided because each call starts fresh. If you're debugging interactively and hit degradation signals (Claude contradicts itself, reconstructs filenames incorrectly, responses get verbose and hedging), run `/clear` and restart.

**Scope creep.** Claude adds authentication, dark mode, or internationalization you didn't ask for. Prevention: each prompt file ends with "Implement ONLY what is specified above. Do not add features, optimizations, or improvements beyond these requirements."

**React Leaflet SSR crash.** This hits almost every Claude Code session involving maps. The fix is always `dynamic(() => import('./Map'), { ssr: false })`, but Claude sometimes forgets. Include this pattern explicitly in CLAUDE.md and in the map feature's prompt.

**Tailwind v4 confusion.** Claude frequently generates `tailwind.config.js` (v3 pattern) instead of the CSS-based v4 configuration. State explicitly in CLAUDE.md: "Tailwind CSS v4 uses @import 'tailwindcss' in CSS files, NOT tailwind.config.js."

---

## Conclusion: the opinionated recommendation

For TRAILHEAD, use the **sequential headless pipeline**: a bash script running `claude -p` calls with fresh context per feature, TypeScript verification gates between steps, and automatic git commits on success. Set up CLAUDE.md (under 80 lines), a Stop hook for verification, and 10 prompt files in `prompts/` before starting the build. Run the script, check in every 45 minutes, and budget 2 hours of total human attention across the 8-hour window.

Do not use Agent Teams (experimental, too risky for a demo). Do not use `/batch` (cannot handle shared dependencies). Do not attempt a single long interactive session (context degradation will derail feature 4 or 5). Do not over-engineer the orchestration — the Agent SDK is powerful but takes longer to set up than a 30-line bash script, and for a one-off demo build, simplicity wins.

The pattern that works: **infrastructure first, features sequentially, verify everything, commit often, fresh context always.** Claude gets you 0–80% remarkably fast. The headless pipeline with verification gates is how you keep that last 20% from consuming all your time.