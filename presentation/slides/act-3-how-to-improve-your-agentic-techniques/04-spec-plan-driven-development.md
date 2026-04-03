# Spec First, Plan Second, Build Last

## Slide

**Title:** Don't Just Build — Iterate on What You Plan to Build

- The biggest mistake: jumping straight from idea to code. **Spec → Plan → Build.** Each step is a checkpoint where you catch bad ideas before they become bad code
- A spec says **what** to build. A plan says **how** to build it. Both are markdown files the agent writes and you review — **iterate on the plan, not the implementation**
- It's 100x cheaper to change a line in a spec than to rewrite a feature. **Catch the wrong API, the missing edge case, the scope creep in markdown — not in TypeScript**
- Use Claude's plan mode: ask it to **plan first, then confirm before building.** Review the plan, ask questions, refine — then say "go"
- The refinement chain is this principle applied to the whole project: **spec the spec, plan the plan, then build from a solid foundation**

---

## Notes

### Why Spec-Driven Development Matters More with Agents

In traditional development, you can course-correct as you code — you notice a problem mid-implementation and adjust. With agents, especially in headless/out-of-the-loop mode, course correction is expensive:

- The agent builds exactly what you specified
- If the spec is wrong, you get a complete, well-built implementation of the wrong thing
- Fixing it means a new prompt, a new agent session, and potentially undoing work
- Each iteration costs tokens, time, and context

**The fix: iterate on the spec, not the code.** Changing a bullet point in a markdown spec costs nothing. Rewriting a feature costs everything.

### The Three Stages

**Stage 1: Spec — What to build**

A spec answers:
- What features does this need?
- What data does it consume and produce?
- What does "done" look like?
- What is explicitly out of scope?

```markdown
# Feature: Earthquake Monitoring

## What it does
- Shows recent earthquakes near the selected location
- Color-coded by magnitude
- Auto-refreshes every 5 minutes

## Data source
- USGS Earthquake API (free, no auth)
- Endpoint: earthquake.usgs.gov/fdsnws/event/1/query

## Out of scope
- Historical earthquake data
- Push notifications
- Custom alert thresholds
```

**Stage 2: Plan — How to build it**

A plan answers:
- What files need to be created or modified?
- What existing patterns should be followed?
- What order should things be built in?
- What verification steps confirm it's done?

```markdown
# Plan: Earthquake Monitoring

## Files to create
1. lib/api/seismic.ts — API client wrapper (follow weather.ts pattern)
2. app/api/seismic/route.ts — Next.js route handler
3. hooks/useSeismic.ts — TanStack Query hook (5min refresh)
4. components/SeismicCard.tsx — Dashboard card

## Build order
1. API client first (no dependencies)
2. Route handler (depends on API client)
3. Hook (depends on route)
4. Component (depends on hook)

## Verification
- tsc --noEmit passes
- npm run build passes
- curl localhost:3000/api/seismic returns valid GeoJSON
```

**Stage 3: Build — Execute the plan**

Now the agent has a clear, reviewed spec and a concrete plan. The build prompt is essentially: "Execute this plan, following the patterns specified, and verify with these commands."

### The Review Checkpoints

Each stage is a checkpoint where you catch problems cheaply:

| Stage | What You Review | Cost of Change | Example Catch |
|-------|----------------|---------------|---------------|
| Spec | Is this the right feature? | Free (edit markdown) | "We don't need push notifications for a demo" |
| Plan | Is this the right approach? | Free (edit markdown) | "Use the weather.ts pattern, not the crime.ts pattern — it's cleaner" |
| Build | Is this the right implementation? | Expensive (re-prompt, re-build) | "The API URL format is wrong" — now you're debugging |

Problems caught at the spec stage cost nothing to fix. Problems caught at the build stage cost a full agent session. The earlier you catch them, the less you waste.

### Using Claude's Plan Mode

Claude Code has a built-in plan mode for this workflow:

- **`/plan`** — Ask Claude to create a plan before acting. It will outline what it intends to do and wait for your approval.
- **Review the plan** — Ask questions, suggest changes, point out issues. The plan is just markdown in the conversation.
- **Approve** — Say "go" or "looks good" and Claude executes the plan.
- **Multi-step planning** — For complex tasks, have Claude plan the overall approach, then plan each step individually.

For headless pipelines, the plan lives in a markdown file:
- `claude -p "Create a plan for this feature and save it to plans/seismic-plan.md"`
- Review the plan file
- `claude -p "Execute the plan in plans/seismic-plan.md"`

### The Iteration Principle

The refinement chain from Act 2 is this principle applied at project scale:

```
Idea → Spec (review) → Plan (review) → Build (verify)
```

At each arrow, you can loop back:
- Spec doesn't look right? Refine the spec before planning.
- Plan looks wrong? Revise the plan before building.
- Build fails? Check if the issue is in the plan or the spec first.

**Never iterate on the implementation when you should be iterating on the plan.** If the agent built the wrong thing, the fix is usually in the spec, not in the code.

### Daily Actions

- Write a spec before every non-trivial task — even a 5-line bullet list
- Have the agent generate a plan, review it, then approve the build
- Keep specs and plans in the repo — they're documentation for what was built and why
- When a build goes wrong, ask "was the spec right?" before asking "was the code right?"
- Use progressive refinement: rough spec → detailed spec → plan → build. Each step adds specificity
