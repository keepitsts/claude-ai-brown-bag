# What Is a Token?

## Slide

**Title:** What Is a Token?

- Not words, not characters — **word fragments**. "tokenization" becomes ["token", "ization"]. Roughly **1 token ~ 4 characters ~ 3/4 of a word**
- Tokens are the **currency of AI** — you pay for them (money), they fill up the model's memory (space), and more of them means longer wait times (speed)
- **Reading is cheap, writing is expensive** — the model generating code costs 5x more than the model reading your code
- Think of the context window as a **whiteboard with a fixed size** — everything the model can see right now has to fit on it. System prompt, your files, the conversation, its own answers — all competing for space
- Every wasted token is like writing irrelevant notes on that whiteboard — less room for what actually matters

---

## Notes

### What Tokens Actually Are

- Tokens are not characters, not words, and not lines. They are **subword units** — chunks that a tokenizer algorithm decided are the most efficient way to break up text.
- Built using **Byte-Pair Encoding (BPE)**: the algorithm starts with individual characters, then iteratively merges the most frequent pairs into single tokens. Common words like "the" or "function" become single tokens. Rare words get split: "tokenization" becomes ["token", "ization"].
- Code tokenizes differently than prose. Common programming keywords (`return`, `const`, `import`) are single tokens. Variable names, especially camelCase or unusual identifiers, get split into multiple tokens.
- Whitespace and indentation consume tokens. A 4-space indent is typically 1 token. This is why heavily indented code costs more than flat code.

### Example: Anthropic's Claude Tokenizer in Action

**Plain English** — 44 characters, 9 words, **10 tokens** (4.4 chars/token)

```
"The quick brown fox jumps over the lazy dog."

→ [The] [ quick] [ brown] [ fox] [ jumps] [ over] [ the] [ lazy] [ dog] [.]
     1       2        3      4       5       6       7      8      9    10
```

Common English words map one-to-one to tokens. Punctuation is its own token. Leading spaces attach to the word that follows.

**AI-related prose** — 54 characters, 8 words, **12 tokens** (4.5 chars/token)

```
"Claude Code reads your codebase and writes TypeScript."

→ [Cl] [aude] [ Code] [ reads] [ your] [ code] [base] [ and] [ writes] [ Type] [Script] [.]
    1     2      3       4        5       6       7      8       9        10     11      12
```

Notice: "Claude" splits into `Cl` + `aude` (uncommon proper noun). "codebase" splits into `code` + `base` (compound word). "TypeScript" splits into `Type` + `Script` (camelCase). Common words like "reads," "your," and "and" stay as single tokens.

**Code** — 91 characters, 12 words, **26 tokens** (3.5 chars/token)

```
"function calculateTotal(items) { return items.reduce((sum, item) => sum + item.price, 0); }"

→ [function] [ calculate] [Total] [(] [items] [)] [ {] [ return] [ items] [.]
       1          2          3     4     5     6    7      8        9      10
  [reduce] [((] [sum] [,] [ item] [)] [ =>] [ sum] [ +] [ item] [.] [price]
     11     12    13   14    15    16   17     18    19     20    21    22
  [,] [ 0] [);] [ }]
   23   24   25   26
```

Code uses ~3.5 characters per token vs ~4.5 for prose — syntax characters like `(`, `)`, `.`, `,` each consume a full token. The keyword `function` is a single token, but `calculateTotal` splits into `calculate` + `Total`. Operators like `=>` and `+` get their own tokens.

**Key takeaway:** Code is ~25% more expensive per character than prose because of punctuation and syntax overhead. Every bracket, dot, comma, and semicolon costs a full token.

### The Three Cost Levers

**1. Money (API Charges)**

| Model | Input Cost (per MTok) | Output Cost (per MTok) | Output Multiplier |
|-------|----------------------|----------------------|-------------------|
| Haiku 4.5 | $1 | $5 | 5x |
| Sonnet 4.6 | $3 | $15 | 5x |
| Opus 4.6 | $5 | $25 | 5x |

- The 5x output cost is the single most important pricing fact. When an agent writes a 200-line TypeScript file, those output tokens cost 5x what it costs to read the same file as input.
- **Prompt caching** saves 90% on repeated context (cached reads = 10% of input price). System prompts and CLAUDE.md benefit heavily from caching since they're identical across invocations.
- **Batch API** saves 50% on all costs for non-interactive workloads.
- Combined (caching + batch): up to 95% cost reduction for pipeline-style builds.

**2. Space (Context Window Consumption)**

- The context window has a hard token limit: 200K (Haiku), 1M (Sonnet/Opus).
- Everything competes for that space: system prompt (~1K tokens), CLAUDE.md (~2K tokens), tool definitions (~3K tokens), conversation history (grows over time), file reads (can be very large), and the model's own output.
- When the window fills up, older content gets compressed or dropped. The model loses access to earlier information.
- This is why "one agent, one prompt, one purpose" matters — a focused session uses context efficiently instead of bloating it with unrelated information.

**3. Speed (Latency)**

- The model generates output **one token at a time**, sequentially. Longer outputs take proportionally longer.
- Input tokens are processed in parallel (the "prefill" phase), so reading a large file is fast. But generating a large file is slow because each token depends on all previous tokens.
- More context = slightly slower processing due to the attention mechanism's computational cost scaling with context size.
- For interactive use, speed matters. For headless pipelines, cost usually matters more than speed.

### Token Budget Mental Model

Think of your context window as a budget. Here's how a typical agent session spends it:

```
Context Window Budget (200K example)
├── System prompt:          ~1,000 tokens  (fixed cost)
├── CLAUDE.md:              ~2,000 tokens  (fixed cost)
├── Tool definitions:       ~3,000 tokens  (fixed cost)
├── User prompt:            ~500 tokens    (per-task)
├── File reads:             ~20,000 tokens (variable)
├── Conversation history:   ~30,000 tokens (grows over time)
├── Model's responses:      ~40,000 tokens (grows over time)
└── Remaining budget:       ~103,500 tokens
```

- Fixed costs (system prompt, CLAUDE.md, tool definitions) are paid on every invocation. This is why keeping CLAUDE.md concise matters — a 500-line CLAUDE.md might cost 5,000+ tokens on every single call.
- Variable costs (file reads, conversation) grow during a session. This is why context degrades — as the window fills, less room remains for the model to reason effectively.
- Fresh sessions reset the variable costs to zero. This is the engineering argument for short, focused sessions over long, bloated ones.

### Practical Token Efficiency

- **CLAUDE.md**: Keep it under 150 lines. Every line competes for the model's attention budget. A tight CLAUDE.md with only essential conventions saves thousands of tokens per invocation.
- **Prompts**: Be specific and concise. "Build the weather API route following the pattern in lib/api/weather.ts" is cheaper and more effective than a 500-word description of what a weather API should do.
- **File reads**: Read only what you need. A focused `Grep` for a specific pattern is cheaper than reading an entire 2,000-line file.
- **Scope control**: "Implement ONLY what is specified" prevents the model from generating unnecessary output tokens for features you didn't ask for.

### Why Engineers Should Care

Tokens are the fundamental unit of everything in LLM engineering:

- **Cost estimation**: Tokens let you estimate what a build pipeline will cost before running it. 7 features x ~50K tokens each x Sonnet pricing = predictable budget.
- **Context planning**: Knowing your token budget lets you design sessions that stay within the effective range instead of degrading.
- **Performance tuning**: Understanding the 5x output cost shifts how you design prompts — point the model to existing patterns instead of asking it to generate everything from scratch.
- **Architecture decisions**: Token economics drive the choice of short, focused sessions over long ones, CLAUDE.md brevity over verbosity, and verification gates over manual review.
