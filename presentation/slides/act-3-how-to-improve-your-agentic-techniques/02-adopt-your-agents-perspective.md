# Adopt Your Agent's Perspective

## Slide

**Title:** Adopt Your Agent's Perspective

- Your agent is brilliant but **born blind** — every session starts with zero memory, zero context, zero understanding of your project
- Before launching an agent, ask yourself: **"With what I'm giving it, could I do this job?"** If the answer is no, fix the inputs before you blame the output
- The **Core Four** — every agent needs these to succeed: **Context** (what it knows), **Model** (how smart it is), **Prompt** (what you're asking), **Tools** (what it can do)
- CLAUDE.md is how you give your agent your perspective — your conventions, your patterns, your "here's how we do things here"
- Bad output is usually a **context problem**, not a model problem — give better inputs before reaching for a bigger model

---

## Notes

### The Core Four: What Every Agent Needs

Every agent invocation has four levers you can adjust. When output quality is poor, diagnose which lever is the problem before retrying:

**1. Context — Information & Perspective**
- What the agent can "see": system prompt, CLAUDE.md, files it reads, conversation history, tool results
- This is the most common failure point. The agent doesn't know your project's conventions, your API's quirks, or your team's preferences unless you tell it
- Fix: Better CLAUDE.md, more targeted file reads in the prompt ("see lib/api/weather.ts for the pattern"), explicit constraints

**2. Model — Intelligence & Potential**
- Which model is running: Haiku (fast/cheap), Sonnet (balanced), Opus (deep reasoning)
- If the task is complex and Sonnet is struggling, upgrade to Opus. If it's simple and Opus is slow, drop to Haiku
- This is the lever people reach for first, but it's usually not the problem. A well-prompted Sonnet beats a poorly-prompted Opus

**3. Prompt — Communication Method**
- What you're asking the agent to do: the task description, constraints, scope, expected output
- Vague prompts produce vague results. "Fix the bug" vs "The weather API returns Celsius but should return Fahrenheit — update the Open-Meteo request params in lib/api/weather.ts to include temperature_unit=fahrenheit"
- Fix: Be specific about what to change, where to change it, and what patterns to follow

**4. Tools — Agent Capabilities**
- What the agent can interact with: Read, Write, Edit, Bash, Grep, Glob, MCP servers
- In headless mode, `--allowedTools` controls exactly which tools are available
- If the agent needs to run tests but doesn't have Bash access, it can't verify its own work
- Fix: Ensure the agent has the tools it needs for the full task cycle (implement + verify)

### The Perspective Exercise

Before every prompt, mentally simulate:

> "I'm a senior engineer who just started at this company today. I've never seen this codebase. Someone hands me CLAUDE.md and this prompt. Can I complete this task?"

If the answer is no, you're missing context. Common things you know but the agent doesn't:
- Which file has the pattern to follow
- What the API endpoint actually returns
- Why a certain approach was chosen over alternatives
- What "done" looks like for this task

### The 12 Leverage Points

Beyond the Core Four, there are 8 "through-agent" leverage points — things in your codebase that amplify the agent's effectiveness:

| # | Leverage Point | What It Does |
|---|---------------|-------------|
| 5 | **Standard Out** | Command output the agent can read — build errors, test results, logs |
| 6 | **Types** | TypeScript types, schemas, error types — information flow the agent can follow |
| 7 | **Documentation** | Internal and 3rd-party docs the agent can reference |
| 8 | **Tests** | Self-validating feedback loops — the agent runs tests to check its own work |
| 9 | **Architecture** | Consistent codebase structure — patterns the agent can follow |
| 10 | **Plans** | Detailed prompts for massive work — break down complex tasks |
| 11 | **Templates** | Reusable embeddable prompts — solve problem classes, not individual problems |
| 12 | **AI Developer Workflows** | End-to-end automated pipelines — prompt to production |

Each leverage point is something in your control that makes the agent more effective. The more of these you invest in, the more autonomous your agents become.

### The Diagnosis Flowchart

When agent output is poor:

```
Bad output?
  ├─→ Was the prompt specific enough?
  │     No → Fix the prompt (Lever 3)
  │     Yes ↓
  ├─→ Did the agent have the right context?
  │     No → Add to CLAUDE.md or prompt (Lever 1)
  │     Yes ↓
  ├─→ Did the agent have the right tools?
  │     No → Add tools / permissions (Lever 4)
  │     Yes ↓
  └─→ Is the task too complex for this model?
        Yes → Upgrade model (Lever 2)
        No → Break the task into smaller pieces
```
