# Markdown Refinement: Building Autonomously with Claude Code

## Slide

**Title:** Step 6 — How Do I Make Claude Code Build It While I Walk My Dog?

- The big question: "I want to give the spec to Claude Code and walk my dog Milo. Come back, and it's done."
- I knew it wouldn't work in one shot — **context fills up by feature 4, it forgets patterns, mistakes compound**
- Created a research prompt asking Claude to evaluate approaches: single session, headless pipeline, Agent SDK, agent teams, /batch
- The recommendation: **sequential headless pipeline** — `claude -p` with fresh context per feature, verification gates between each step
- This is the "building the system that builds the system" moment — one more markdown file before any code runs

---

## Notes

### The Actual Prompt

```
create a standalone research prompt for me and put the prompt in
research/claude-code-agentic-rapid-development-best-practices-research-prompt.md

I will copy and paste that prompt into a claude.ai/chat using Opus 4.6
Extended with Research and Web Search checked then store the result
.md file in this project.

given our tech stack and the functionality that we want to create
research the current best ways to use claude code to rapidly create
this functionality using spec driven development.

I'd prefer it if I could give the research/sts-demo-spec.md to claude
code and it would just build it in one shot while I walk my dog
(Milo - a cute 28lb Cavapoo). But I realize that claude code out of
the box will not do that successfully, I first need to build an agentic
harness/sdlc pipeline/agent teams/some-other-new-fangled-thing so that
it can iteratively build out features of a certain size scope before
continuing on to the next feature.

in the prompt give context of our situation and provide a recommendation
for the best way to rapidly build out this demo application.
```

- This prompt asked Claude Code to *write a research prompt* — a meta-prompt
- That research prompt was then pasted into claude.ai with web search for the actual research
- Result saved to: `research/building-trailhead-autonomously-with-claude-code.md`

### The Research Prompt Claude Code Wrote

The generated research prompt included:
- Full situation context (7 features, 6 APIs, 8 hours remaining, tech stack)
- All Claude Code capabilities that could be part of the solution (subagents, agent teams, skills, hooks, headless mode, Agent SDK, `/batch`, CLAUDE.md, plan mode)
- Request to evaluate specific approaches with pros/cons
- Constraint: clean sequential git history (tells a better demo story than parallel branch merges)
- Request for an opinionated recommendation, not a menu of options

### The Recommendation: Sequential Headless Pipeline

Claude's research evaluated 6 approaches and recommended:

| Approach | Verdict | Why |
|----------|---------|-----|
| Single long session | Rejected | Context degrades by feature 4, quality drops |
| Agent Teams | Rejected | Experimental, unstable, coordination overhead |
| `/batch` | Rejected | Can't handle shared dependencies between features |
| Agent SDK pipeline | Rejected | Overkill for this scope, more setup time than value |
| Custom subagents | Rejected | Unnecessary complexity for sequential work |
| **Sequential headless** | **Chosen** | Fresh context per feature, simple, reliable, clean git history |

### The Recommended Architecture

```
For each feature:
  1. claude -p "$(cat build/prompts/XX-feature.md)"    ← fresh context
  2. npx tsc --noEmit && pnpm build                    ← verification gate
  3. git add -A && git commit -m "feat: feature-name"   ← auto-commit on success
```

Key design decisions:
- **Fresh context per feature** — avoids degradation. Each call starts clean with only CLAUDE.md
- **Verification gates** — TypeScript compiler + build between every step. Deterministic check on probabilistic output
- **Auto-commit on success** — clean git history, one commit per feature
- **CLAUDE.md under 80 lines** — persistent memory across fresh contexts
- **11 self-contained prompts** — each prompt file is a complete feature spec with "patterns to follow" pointers

### Why This Step Is "Building the System That Builds the System"

- No code has been written yet
- We've produced 5 markdown files: STS briefing, API list, app spec, tech stack, build strategy
- Each one refined the last, adding specificity and making decisions
- The next step uses this research to create the actual build pipeline and 11 feature prompts
- Then the pipeline runs and produces the app — markdown in, software out
