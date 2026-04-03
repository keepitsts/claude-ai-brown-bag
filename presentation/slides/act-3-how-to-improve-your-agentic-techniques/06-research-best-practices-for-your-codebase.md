# Research Best Practices for Your Codebase

## Slide

**Title:** Your Codebase Is Growing — Research How to Handle It

- When your app gets more complex, **don't guess at best practices — research them.** Use the markdown refinement technique: write a research prompt with context about your codebase, run it in claude.ai with web search, save the result
- The research prompt includes **what your codebase looks like today** — tech stack, file count, pain points, what's getting unwieldy. Claude searches for how other teams solved the same problem at this scale
- The result is a **best practices document tailored to your situation** — not generic advice, but "given your Next.js app with 58 files and 6 API integrations, here's how to handle state management as you grow"
- Use that document to **update your standards and refactor** — it becomes the new input to CLAUDE.md, architecture docs, and refactoring prompts
- This is the refinement chain applied to maintenance: **codebase context → research prompt → best practices → updated standards → agent-driven refactor**

---

## Notes

### The Problem: Complexity Creeps In

Every codebase hits inflection points where what worked at 10 files breaks at 100:

- State management that was fine with 3 stores gets tangled at 10
- API routes that were simple with 2 integrations get inconsistent at 8
- Component patterns that worked for a dashboard don't scale to multi-page flows
- Error handling that was ad-hoc needs standardization
- Testing that was optional becomes necessary

The instinct is to Google it, read a few blog posts, and wing it. The agentic approach: create a research prompt with your specific context and get a tailored recommendation.

### The Technique: Research Prompt with Codebase Context

**Step 1: Write a research prompt that describes your situation**

Have Claude Code write this for you. It can read the actual codebase and generate an accurate description:

```
Create a standalone research prompt and save it to
research/state-management-best-practices-prompt.md

I will paste this into claude.ai with web search enabled.

Context: our app has grown from 7 features to 15. We have 3 Zustand
stores that are starting to overlap. Some components reach into
multiple stores. The data flow pattern (lib/api → route → hook →
component) is getting complex with cross-feature dependencies.

Research: what are the current best practices for state management
in a Next.js 15 App Router application at this scale? Should we
restructure our stores? Add a state machine? Use a different pattern?

Be opinionated — I want "here's what you should do" not "5 options."
```

**Step 2: Run the research in claude.ai**

- Paste the prompt into claude.ai with Opus 4.6 Extended + Research + Web Search
- Claude searches the web for current best practices, reads documentation, and synthesizes a recommendation
- Save the result as a markdown file in your repo: `research/state-management-best-practices.md`

**Step 3: Use the result to update standards**

The research document becomes input for:
- **CLAUDE.md updates** — new conventions, updated patterns
- **Architecture docs** — updated decision records explaining why the approach changed
- **Refactoring prompts** — specific instructions for the agent to migrate existing code

**Step 4: Agent-driven refactor**

```
Refactor our Zustand stores following the recommendations in
research/state-management-best-practices.md

Specifically:
- Split the location store into location-selection and location-data
- Extract shared data fetching logic into a unified hook
- Update all components that import from the old stores

Verify: tsc --noEmit && npm run build
```

### Examples of When to Use This

| Inflection Point | Research Prompt Context |
|-----------------|----------------------|
| State management getting tangled | "We have 3 Zustand stores, components reaching across stores, cross-feature dependencies" |
| API error handling inconsistent | "6 API routes with 3 different error handling patterns, no standard error types" |
| Testing strategy needed | "58 files, 0 tests, about to add authentication — what's the highest-ROI testing strategy?" |
| Performance degradation | "Dashboard loads 5 API routes on mount, render time increasing, no caching strategy" |
| Authentication being added | "Currently no auth, need to add role-based access for federal users, Next.js App Router" |
| Monorepo structure needed | "Single app growing into shared components used by 2 apps, need to split without breaking" |

Each of these is a standalone research prompt with specific codebase context that produces a tailored best practices document.

### Why This Beats Generic Advice

Generic advice: "Use Zustand for client state in Next.js apps."

Researched-for-your-codebase advice: "Given your 3 overlapping Zustand stores and the pattern where WeatherCard and SeismicCard both read from locationStore, split locationStore into selection state (which location is active) and derived data state (what data has been fetched). Use TanStack Query's dependent queries to cascade data fetching from selection changes. Here's the migration path..."

The difference is specificity. The research prompt encodes your exact situation, and the result addresses your exact problems.

### The Refinement Chain for Maintenance

```
Codebase context (what it looks like now)
  → Research prompt (.md) — Claude Code writes this from reading the code
    → Best practices result (.md) — claude.ai researches and recommends
      → Updated standards (.md) — CLAUDE.md, architecture docs, conventions
        → Refactoring prompts (.md) — specific migration instructions
          → Agent-driven refactor — Claude Code executes the migration
```

This is the same refinement chain from Act 2, applied to an existing codebase instead of a greenfield build. Each step produces a markdown artifact that feeds the next step.

### Daily Actions

- When you hit a complexity wall, don't wing it — write a research prompt with your codebase context
- Have Claude Code write the research prompt — it can read the actual code and describe the situation accurately
- Run the research in claude.ai with web search for current best practices
- Save results in `research/` and use them to update CLAUDE.md and architecture docs
- Use the updated standards as input for agent-driven refactoring
