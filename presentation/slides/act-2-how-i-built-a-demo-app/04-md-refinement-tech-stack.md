# Markdown Refinement: Tech Stack

## Slide

**Title:** Step 4 — What Tech Stack Should I Use?

- Attached the app spec and asked Claude: **"make an opinionated choice about what tech stack should be"**
- Claude produced a full decision record — not just "use React" but *why* Next.js App Router, *why* Zustand over Redux, *why* TanStack Query
- Every choice documented with rationale: what was picked, what was rejected, and why
- This becomes the foundation for CLAUDE.md — the conventions file that guides every build step
- Still zero code written. Four markdown files deep into the refinement chain

---

## Notes

### The Actual Prompt

```markdown
I want to use react and spec driven development to build out this
demo application **make an opinionated choice about what tech stack
should be**
- consider the functionality being requested to build
  - sts-demo-spec.md
```

- Tool: claude.ai (Opus 4.6 Extended + Research + Web Search)
- App spec attached as context
- Result saved to: `research/trailhead-tech-stack.md`

### The Tech Stack Decision Record

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 15 (App Router) | Server components by default, API routes built in, Vercel deploy |
| Language | TypeScript strict | Type safety catches agent errors at compile time |
| Styling | Tailwind CSS v4 + shadcn/ui | Utility-first, component library, fast iteration |
| Client state | Zustand | Minimal boilerplate vs Redux, good for location/watchlist state |
| Server state | TanStack Query v5 | Auto-refresh intervals, caching, loading/error states built in |
| Map | React Leaflet + OpenStreetMap | Free, no API key, good React integration |
| AI | Claude API via Anthropic SDK | Streaming support, matches the presentation topic |
| Package manager | pnpm | Fast, disk-efficient |
| Deploy | Vercel | Zero-config Next.js deploy |

### What Was Deliberately Left Out

The tech stack record also documented what was *excluded* and why:
- **Database** — localStorage is sufficient for a demo. No persistence complexity.
- **Authentication** — unnecessary for a demo app. Would add scope without value.
- **Testing** — deprioritized for time. Verification gates (tsc + build) are the quality check.
- **CI/CD** — deploy manually via Vercel CLI. No pipeline needed for a one-afternoon build.

### Why a Decision Record Matters for Agentic Builds

- When Claude Code builds the app, it needs to know *why* choices were made, not just *what* was chosen
- "Use Zustand" is less useful than "Use Zustand because we need minimal boilerplate for location and watchlist state"
- The rationale prevents the agent from second-guessing decisions or introducing alternatives mid-build
- This document feeds directly into CLAUDE.md — the conventions get distilled into the 50 lines that matter

### The Chain So Far

```
STS Briefing (.md)  ─┐
                      ├─→  App Spec (.md)  ─→  Tech Stack (.md)  ─→  Next step: repo setup
100 Free APIs (.md)  ─┘
```
