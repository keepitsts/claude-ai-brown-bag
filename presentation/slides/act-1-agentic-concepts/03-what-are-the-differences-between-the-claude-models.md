# What Are the Differences Between the Claude Models?

## Slide

**Title:** What Are the Differences Between the Claude Models?

- **Haiku** — The intern. Fast, cheap, good at simple tasks. You send it to scan files and fetch information
- **Sonnet** — The senior engineer. Your daily workhorse — handles 90%+ of real coding work at a reasonable price
- **Opus** — The principal architect. Slowest but smartest. Bring it in for hard problems, big-picture decisions, and agent teams
- Like cloud compute tiers — **you don't run everything on the biggest server**. Match the model to the task
- Claude Code does this automatically — quick lookups go to Haiku, real work goes to Sonnet or Opus

---

## Notes

### The Model Hierarchy

Think of it like compute tiers in a cloud provider. You don't run everything on the largest instance — you match the model to the task. Claude's three models are designed to cover the full spectrum from quick lookups to deep architectural reasoning.

### Haiku 4.5 — The Fast Thinker

- **Cost:** $1 input / $5 output per million tokens — the cheapest tier
- **Context window:** 200K tokens
- **Max output:** 64K tokens
- **Speed:** Fastest of the three
- **Best for:**
  - Subagent tasks (file discovery, classification, simple code reads)
  - Routing decisions (is this task simple or complex?)
  - Quick summarization and extraction
  - High-volume, low-complexity operations
- **Not ideal for:** Complex multi-step reasoning, large codebase refactoring, nuanced architectural decisions
- **In Claude Code:** Automatically used for subagents spawned by the main agent. When Claude Code needs to quickly scan a directory or classify a task, Haiku handles it without burning expensive tokens on a larger model.

### Sonnet 4.6 — The Daily Driver

- **Cost:** $3 input / $15 output per million tokens
- **Context window:** 1M tokens (1,000,000)
- **Max output:** 64K tokens
- **Speed:** Fast — not as quick as Haiku, but responsive enough for interactive use
- **Best for:**
  - Day-to-day coding tasks (implementing features, fixing bugs, writing tests)
  - Code review and explanation
  - Multi-file edits with moderate complexity
  - The vast majority (90%+) of software engineering work
- **Why it's the default:** Best cost-to-quality ratio. Preferred over older models by 70% of developers in benchmarks. Capable enough for most tasks, cheap enough to use freely.
- **In Claude Code:** The default model for main implementation tasks. When you open Claude Code and start working, Sonnet is doing the heavy lifting unless you've explicitly selected Opus.

### Opus 4.6 — The Deep Reasoner

- **Cost:** $5 input / $25 output per million tokens
- **Context window:** 1M tokens (1,000,000)
- **Max output:** 128K tokens — double the output ceiling of Haiku and Sonnet
- **Speed:** Moderate — noticeably slower than Sonnet, but the quality difference is measurable on hard problems
- **Best for:**
  - Complex architecture decisions spanning many files
  - Large codebase analysis and understanding
  - Agent teams (requires Opus — multiple coordinating agents)
  - Multi-step planning and reasoning chains
  - Tasks where getting it right the first time matters more than speed
- **The 128K output ceiling:** Opus can generate twice as much output in a single turn. This matters for large refactors, comprehensive test suites, or generating multiple files in sequence.
- **In Claude Code:** Selected explicitly by the user for complex work, or required for features like Agent Teams. Available with the 1M extended context option for massive codebase analysis.

### Side-by-Side Comparison

| | Haiku 4.5 | Sonnet 4.6 | Opus 4.6 |
|---|---|---|---|
| **Input cost** (per MTok) | $1 | $3 | $5 |
| **Output cost** (per MTok) | $5 | $15 | $25 |
| **Context window** | 200K | 1M | 1M |
| **Max output** | 64K | 64K | 128K |
| **Speed** | Fastest | Fast | Moderate |
| **Primary role** | Subagents, classification | Daily coding (90%+) | Architecture, agent teams |
| **Analogy** | Intern who's quick | Senior engineer | Principal architect |

### The 5x Output Cost Rule

- Across all three models, output tokens cost exactly **5x input tokens**
- This has real engineering implications:
  - **Reading code is cheap.** An agent scanning 10 files to understand your codebase costs relatively little.
  - **Writing code is expensive.** The implementation — every line the model generates — costs 5x more per token.
  - **Design prompts to minimize unnecessary output.** Point the model to existing patterns ("follow the pattern in lib/api/weather.ts") instead of asking it to generate everything from scratch.
  - **Scope control matters financially.** "Implement ONLY what is specified" isn't just about quality — it prevents the model from generating thousands of extra output tokens for features you didn't ask for.

### How Claude Code Routes Between Models

- Claude Code uses **smart model switching** — it doesn't run everything on the same model
- **Automatic routing:**
  - Subagents (file exploration, code search, classification) → Haiku
  - Main implementation tasks → Sonnet (default) or Opus (if selected)
- **User-controlled selection:**
  - Default mode uses Sonnet for main tasks
  - `/model` command switches to Opus for complex work
  - Headless pipelines (`claude -p`) use whichever model is configured
- **The routing principle:** Use the smallest model that can handle the task reliably. Don't pay Opus prices for a file read that Haiku handles perfectly.

### Cost Estimation for Real Work

A practical way to think about costs:

- **A single feature implementation** (Sonnet): ~40-60K tokens total, ~$0.50-1.50
- **A full-day coding session** (Sonnet, interactive): ~500K-1M tokens, ~$5-15
- **A headless pipeline building 7 features** (Sonnet): ~350K-500K tokens, ~$5-15
- **A complex architecture analysis** (Opus): ~100-200K tokens, ~$3-8

These costs are rough estimates — actual usage depends on codebase size, conversation length, and how many iterations the agent needs. The key insight: an afternoon of agentic engineering costs less than a lunch.

### When to Upgrade to a Bigger Model

Move up the hierarchy when:

- **Haiku → Sonnet:** The task requires multi-step reasoning, nuanced code generation, or understanding complex relationships between files
- **Sonnet → Opus:** The task involves architectural decisions across a large codebase, requires agent teams for parallel work, or needs the 128K output ceiling for large-scale generation
- **Rule of thumb:** Start with Sonnet. If the output quality isn't meeting your standards on a specific task, try Opus. If you're running high-volume simple tasks, drop to Haiku.
