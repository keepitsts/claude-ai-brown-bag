# Why Do We Have to Be Token Efficient?

## Slide

**Title:** Why Do We Have to Be Token Efficient?

- **The whiteboard gets worse as it fills up** — the more you cram on, the harder it is for the model to find what matters. Research shows accuracy drops below 50% in bloated contexts
- **Writing costs 5x more than reading** — every unnecessary line of code the model generates burns the expensive tokens. "Build only what I asked for" saves real money
- **More tokens = slower responses** — the model writes one token at a time. Ask for too much and you're waiting
- **Junk in your instructions compounds** — a bloated CLAUDE.md wastes thousands of tokens on *every single call*. Multiply that across a pipeline and it adds up fast
- The difference between "AI is too expensive" and "that cost less than lunch" is **token discipline**

---

## Notes

### The Four Costs of Every Token

Every token you send or receive has four simultaneous costs. Understanding all four is what separates engineers who think AI is expensive from those who run it cheaply at scale.

**1. Money — API charges**

- Output tokens cost **5x input tokens** across all Claude models
  - Haiku: $1 input / $5 output per MTok
  - Sonnet: $3 input / $15 output per MTok
  - Opus: $5 input / $25 output per MTok
- This asymmetry means the most expensive thing your agent does is *write code* — not read it, not analyze it, not search for files
- A model generating 500 lines of unnecessary code (dark mode, i18n, extra error handling you didn't ask for) can cost 10-20x more than a focused implementation
- **Prompt caching** saves 90% on repeated input (cached reads = 10% of input price). System prompts and CLAUDE.md benefit heavily because they're identical across invocations
- **Batch API** saves 50% on all costs for non-interactive workloads
- Combined (caching + batch): up to 95% cost reduction

**2. Space — Context window consumption**

- The context window has a hard limit: 200K tokens (Haiku), 1M tokens (Sonnet/Opus)
- Everything competes for that space:
  - System prompt: ~1K tokens (fixed, every call)
  - CLAUDE.md: ~1-5K tokens (fixed, every call)
  - Tool definitions: ~3K tokens (fixed, every call)
  - Conversation history: grows over time
  - File reads: variable, can be very large
  - Model's own output: grows over time
- When the window fills, older content gets compressed or dropped — the model loses access to earlier instructions and context
- Wasting space on unnecessary tokens means less room for the information that actually matters

**3. Speed — Latency**

- **Input tokens are processed in parallel** (the "prefill" phase) — reading a 10,000-token file is fast
- **Output tokens are generated sequentially** — each token depends on all previous tokens. Longer output = proportionally longer wait
- More context also slows processing due to the attention mechanism's computational cost, which scales with context size
- For interactive use, this is the difference between a responsive agent and one that makes you wait. For headless pipelines, cost usually matters more than speed

**4. Attention — Quality degradation**

- This is the cost most people miss. Every token you add doesn't just take up space — it actively degrades the model's ability to attend to everything else
- The attention mechanism has a **quadratic cost**: adding token N means it must attend to all N-1 previous tokens, and all previous tokens must now attend to it
- **"Lost in the Middle" research**: at 32K tokens of context, 11 of 12 models tested dropped below 50% of their short-context performance. The model reliably processes the beginning and end but struggles with the middle
- This means a bloated CLAUDE.md doesn't just waste space — it actively makes the model worse at following the instructions that matter

### Why CLAUDE.md Brevity Compounds

CLAUDE.md is loaded on **every single invocation**. This makes it the highest-leverage place to be token efficient.

```
Scenario A: 500-line CLAUDE.md (~5,000 tokens)
  - 7 feature builds × 5,000 tokens = 35,000 input tokens wasted
  - At Sonnet pricing: 35,000 × $3/MTok = $0.11 per pipeline run
  - Plus: attention diluted across 5,000 tokens of instructions
  - Result: model misses critical conventions buried in the noise

Scenario B: 80-line CLAUDE.md (~800 tokens)
  - 7 feature builds × 800 tokens = 5,600 input tokens
  - At Sonnet pricing: 5,600 × $3/MTok = $0.02 per pipeline run
  - Plus: model focuses attention on only the critical conventions
  - Result: higher compliance with fewer, clearer instructions
```

The dollar savings are modest on a single run. The quality difference is what matters — every unnecessary line in CLAUDE.md is a line competing for the model's attention against your critical instructions.

### Scope Control as Token Efficiency

When a model generates code you didn't ask for, it wastes tokens in three ways:

1. **Output tokens** — The unnecessary code itself costs 5x input rates
2. **Context consumption** — That code now sits in the conversation, displacing useful information
3. **Downstream confusion** — Future turns have to reason about code that shouldn't exist

This is why "Implement ONLY what is specified" and "Do not add features beyond these requirements" in build prompts aren't just quality instructions — they're cost optimization.

Common unnecessary output that wastes tokens:
- Adding dark mode, i18n, or accessibility features not in the spec
- Generating verbose comments and JSDoc for every function
- Creating error handling for scenarios that can't happen
- Building configuration options and feature flags for a prototype
- Writing tests when you didn't ask for tests

### Fresh Context as Token Efficiency

Starting a fresh session is the most aggressive form of token efficiency:

- **Conversation history**: Reset to zero. No accumulated noise from previous turns
- **Tool results**: Reset to zero. No lingering file reads from earlier exploration
- **Model output**: Reset to zero. No previous implementations cluttering context
- **Only fixed costs remain**: System prompt + CLAUDE.md + tool definitions

This is why short, focused sessions produce better results than long, bloated ones. It's not just that context degrades — it's that a fresh session gives the model maximum space and attention for the task at hand.

### The Compound Effect

Token efficiency compounds across every dimension:

| Practice | Money Saved | Quality Gained | Speed Gained |
|----------|-------------|---------------|--------------|
| Tight CLAUDE.md (80 vs 500 lines) | ~80% fewer fixed input tokens | More attention on critical rules | Faster context loading |
| Scope control in prompts | Fewer unnecessary output tokens | Focused implementation | Less generation time |
| Fresh context per task | No wasted history tokens | Full attention on current task | No bloated prefill |
| Pointed file reads (Grep vs full Read) | Fewer input tokens per lookup | Less noise in context | Faster tool results |
| "Follow pattern in X" vs "generate from scratch" | Fewer output tokens | Consistent with existing code | Less generation time |

An engineer who practices token efficiency across all five dimensions can run the same workload at a fraction of the cost with higher quality output. The difference between "AI is expensive and unreliable" and "AI costs less than lunch and follows my conventions" is often just token discipline.
