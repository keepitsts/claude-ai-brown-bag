# Document Your App for Your Agent

## Slide

**Title:** Document Your App — Your Agent Reads It Too

- Your agent reads your docs the same way a new hire would. **If a new developer couldn't understand your app from the docs, neither can the agent**
- Use **progressive disclosure** — CLAUDE.md has the 50 most important lines. Detailed docs live in markdown files the agent reads when it needs them
- Don't cram everything into CLAUDE.md. **Point to deeper docs**: "For API patterns see docs/api-conventions.md" — the agent follows the link when relevant
- READMEs, architecture docs, decision records, onboarding guides — **all of these are agent context now**, not just human reference
- The documentation you wish you had when you joined the project? **Write it. Your agent needs it more than you did**

---

## Notes

### Documentation as a Leverage Point

Documentation is one of the 12 leverage points of agentic coding. It serves a dual purpose:
- **For humans:** Onboarding, reference, decision history
- **For agents:** Context that supplements training data and CLAUDE.md

The agent's training data covers general knowledge (how React works, how REST APIs work). Your documentation covers **project-specific knowledge** (why you chose Zustand over Redux, how your API error handling works, what the data flow pattern is).

### Progressive Disclosure for Agent Context

Not all documentation belongs in CLAUDE.md. The whiteboard is finite — every line in CLAUDE.md competes for attention on every single invocation. Instead, layer your documentation:

**Layer 1: CLAUDE.md (~50-80 lines)**
- Tech stack and versions
- Critical conventions (the ones that cause bugs if violated)
- Build/verification commands
- The 3-5 rules that apply to every task

**Layer 2: Pointed references in CLAUDE.md**
```markdown
## Detailed Documentation
- API patterns: see docs/api-conventions.md
- Component patterns: see docs/component-guide.md
- Data flow: see docs/data-flow.md
- Testing: see docs/testing-strategy.md
```

The agent reads CLAUDE.md on every invocation but only reads the detailed docs when working on a relevant task. This keeps the whiteboard clean while making deep context available.

**Layer 3: Inline documentation**
- TypeScript types and interfaces (self-documenting)
- Code comments on non-obvious decisions
- README files in subdirectories

The agent discovers these naturally when it reads files in the relevant area of the codebase.

### What to Document for Agents

| Document | What It Contains | When the Agent Reads It |
|----------|-----------------|------------------------|
| `CLAUDE.md` | Critical conventions, build commands, tech stack | Every session (automatic) |
| `docs/api-conventions.md` | API client pattern, route handler pattern, error handling | When building API features |
| `docs/component-guide.md` | Component structure, props patterns, state management | When building UI |
| `docs/data-flow.md` | How data moves: lib/api → route → hook → component | When debugging data issues |
| `docs/decisions/` | Architecture Decision Records (ADRs) — what was chosen and why | When making architectural changes |
| `README.md` per directory | What this directory contains and how it's organized | When exploring unfamiliar areas |

### The "New Hire" Test

Before starting a complex task, ask:

> "If I hired a senior engineer today and pointed them at this repo, could they complete this task from the docs alone?"

If the answer is no, the missing information is what you need to document. Common gaps:
- **Why** a pattern was chosen (not just what it is)
- **Where** the boundaries are between modules
- **What** the non-obvious conventions are (the ones that cause bugs when violated)
- **How** data flows through the system end-to-end

### The Payoff

Documentation compounds:
- Write `docs/api-conventions.md` once → every API feature prompt can say "follow the pattern in docs/api-conventions.md" → consistent output across all features
- Write an ADR for a tech stack decision once → the agent never second-guesses the choice or introduces alternatives
- Write a component guide once → new components match existing patterns without per-prompt instructions

The upfront cost is one prompt to generate the doc (have Claude write it, you review). The ongoing benefit is better agent output on every future task in that area.

### Daily Actions

- Keep CLAUDE.md tight — 50-80 lines of critical conventions only
- Create detailed docs in a `docs/` directory and point to them from CLAUDE.md
- Use progressive disclosure: CLAUDE.md → pointed references → inline docs
- Apply the "new hire" test before complex tasks — if the docs aren't enough, fix the docs
- Have the agent write the documentation — it can read the codebase and produce docs faster than you
