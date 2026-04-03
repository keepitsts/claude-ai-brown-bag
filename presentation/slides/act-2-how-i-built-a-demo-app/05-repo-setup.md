# Repo Setup: ai-brown-bag.md

## Slide

**Title:** Step 5 — Bootstrap the Repo with One Prompt

- Wrote a **master setup prompt** (`ai-brown-bag.md`) and ran it in Claude Code — it bootstrapped the entire repo in one shot
- Created: git repo, GitHub remote, CLAUDE.md, prompt capture system, memory files, downloaded Claude Code docs
- **CLAUDE.md is the key artifact** — 50 lines of conventions distilled from the tech stack decision record. It's loaded on every future agent call
- This is where **claude.ai hands off to Claude Code** — research phase is done, build phase begins
- One prompt, 6 tasks completed, initial commit pushed to main

---

## Notes

### The Actual Prompt

The master prompt (`ai-brown-bag.md`) instructed Claude Code to:

1. Initialize git repo with `main` branch, create `CLAUDE.md` and `.gitignore`
2. Create GitHub repo under the keepitsts organization
3. Design and implement a prompt capture system (`prompts/` directory with sequential numbering)
4. Download latest Claude Code documentation (75 markdown files)
5. Capture all pre-existing research actions as prompt files (prompts 001–006)
6. Set up memory system for user preferences and project context

### What Claude Code Produced

- **`CLAUDE.md`** — The conventions file, distilled from the tech stack decision record:
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
  ## Verification (run after every feature)
  npx tsc --noEmit && npm run build
  ```
- **`prompts/`** — Sequential prompt capture system (001–007 at this point)
- **GitHub repo** — `github.com/keepitsts/claude-ai-brown-bag` (public)
- **Claude Code docs** — 75 markdown files fetched for reference

### Why CLAUDE.md Is the Most Important File

- Every future `claude -p` call loads CLAUDE.md automatically
- It's how conventions survive across fresh context windows — each build step starts from zero memory but reads this file first
- Under 80 lines — every line competes for the model's attention (the whiteboard is finite)
- The data flow pattern (`lib/api/ → route → hook → component`) kept all 11 build steps consistent
- Critical "gotchas" are encoded: Tailwind v4 uses CSS config not JS, Next.js 15 params are Promises, Leaflet needs `ssr: false`

### The Handoff Point

This is where the workflow shifts:

| Phase | Tool | Purpose |
|-------|------|---------|
| Steps 1–4 | claude.ai (web search) | Research and decisions — markdown artifacts |
| Step 5 onward | Claude Code (terminal) | Implementation — code, builds, deploys |

The research artifacts (STS briefing, API list, app spec, tech stack) informed CLAUDE.md. From here forward, CLAUDE.md carries the knowledge.

### The Chain So Far

```
STS Briefing → App Spec → Tech Stack → CLAUDE.md + Repo
                                            ↓
                                    Ready to build
```
