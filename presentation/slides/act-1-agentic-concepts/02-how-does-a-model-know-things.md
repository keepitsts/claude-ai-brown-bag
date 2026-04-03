# How Does a Model Know Things?

## Slide

**Title:** How Does a Model Know Things?

- Two kinds of knowledge: **what it learned in school** (training data — broad but frozen on graduation day) and **the briefing you hand it before the meeting** (context — temporary, gone when the session ends)
- It stores knowledge as **math, not facts** — "Michael Jordan is the GOAT" isn't in a database, it's that "Michael Jordan" and "greatest basketball player" are close together in vector space
- It **graduated on a specific date** — Opus: May 2025, Sonnet: August 2025. Ask about anything after that and it's guessing or making things up
- It **confidently makes things up** — there's no internal fact-checker. If it sounds right, the model says it, even if it's wrong
- **You fill the gaps** — CLAUDE.md, file reads, and tool outputs are how you give it knowledge it doesn't have

---

## Notes

### Two Ways a Model "Knows" Something

There are exactly two mechanisms, and understanding the distinction is critical for engineering with AI agents.

**1. Parametric Knowledge (Training Data)**

- During training, the model processes enormous amounts of code and text. The patterns it learns get encoded into its neural network weights — billions of numerical parameters.
- These weights represent knowledge as **high-dimensional vectors** — lists of hundreds or thousands of numbers that encode meaning as positions in mathematical space. Every word, concept, and pattern the model has learned lives somewhere in this vector space.
- **Vector arithmetic captures relationships.** The classic example: the vector for "king" minus "man" plus "woman" lands near the vector for "queen." Not exactly on it — these are approximate, probabilistic representations — but close enough that the model has learned the *relationship* between gendered and royal concepts purely from patterns in text. Similarly, `vector("Paris") - vector("France") + vector("Germany") ≈ vector("Berlin")`.
- **This is how the model "knows" things nobody explicitly wrote down.** There is no database row that says "Michael Jordan is the greatest basketball player of all time." Instead, the vector for "Michael Jordan" sits in a region of vector space near "basketball," "championships," "GOAT," "greatness," and "NBA legend." When you ask the model who the GOAT is, it's not looking up a stored answer — it's navigating vector space where "Michael Jordan" and "greatest basketball player" are geometrically close because millions of texts placed those concepts together. The answer emerges from the math of proximity, not from a fact table.
- This means the model doesn't store facts like a database stores rows. It stores *relationships between concepts* as geometric distances and directions in high-dimensional space. "Knowing" that Python is a programming language means Python's vector is near other programming languages and far from snakes — the model learned the context determines which meaning applies.
- This is the model's "education." It covers most programming languages, frameworks, APIs, design patterns, and general world knowledge up to the training cutoff.
- It's broad — the model has seen millions of codebases, documentation pages, and Stack Overflow answers.
- It's frozen — the weights don't change after training. The model cannot learn new facts, update its understanding of an API, or know about a library released last week.
- Think of it as a very well-read colleague who graduated on the cutoff date and hasn't read anything since.

**2. In-Context Learning (Session Knowledge)**

- Information you provide in the conversation: system prompts, CLAUDE.md, file contents read by tools, previous messages, tool results.
- The model adapts its behavior based on this information *within the session* — no weight updates, purely attention-based.
- This is the briefing document you hand someone before a meeting. It's temporary and disappears entirely when the session ends.
- In-context information can override parametric knowledge — if CLAUDE.md says "use Tailwind v4 CSS-based config, NOT tailwind.config.js," the model follows that even though its training data is full of tailwind.config.js examples.
- The limit is the context window size. Everything the model can "see" right now has to fit within this window.

### Why Models Hallucinate

- The model generates text token by token, optimizing for "what is most likely to come next" based on the patterns it learned.
- There is **no internal verification step**. The model doesn't check whether its output is factually correct, whether a function actually exists, or whether an API endpoint returns the shape it claims.
- When fluency and accuracy conflict, fluency wins. The model will confidently generate a plausible-looking API call to an endpoint that doesn't exist, because the *pattern* of API calls is well-represented in training data even if that specific endpoint isn't.
- This is not a bug that will be fixed — it's a fundamental property of how probabilistic generation works. The engineering response is verification, not trust.

### The Cutoff Problem

| Model | Knowledge Cutoff | Implication |
|-------|-----------------|-------------|
| Opus 4.6 | May 2025 | Reliable for frameworks/APIs stable before mid-2025 |
| Sonnet 4.6 | August 2025 | Slightly more current, still months behind |
| Haiku 4.5 | — | Smallest model, fastest, same cutoff constraints |

- If a library released a breaking change after the cutoff, the model will generate code for the old API.
- If a new framework or tool launched after the cutoff, the model either doesn't know it exists or confuses it with something similar.
- **This is why context matters so much**: you supply the model with current documentation, your project's actual code, and explicit instructions about which versions and patterns to use.

### How Context Fills the Gap

The practical engineering response to the knowledge gap:

- **CLAUDE.md** — Encodes your project's conventions, tech stack versions, and patterns. Overrides stale parametric knowledge with current project reality.
- **File reads (Read, Glob, Grep tools)** — The agent reads your actual codebase. It doesn't guess what your code looks like — it reads it. This is live, accurate information that supplements training data.
- **Tool outputs (Bash results)** — When the agent runs `npm run build` and gets an error, that error message is current, real-world information. The agent reasons about actual compiler output, not imagined behavior.
- **Conversation history** — Previous messages in the session provide continuity. If you corrected the model's approach earlier, that correction persists in context for the rest of the session.

### The Two-Layer Diagram

Think of the model's knowledge as two layers:

```
┌─────────────────────────────────────────────┐
│  Context Window (temporary, session-scoped)  │
│  CLAUDE.md + files + tool results + convo    │
│  ↓ Supplements & Overrides ↓                 │
├─────────────────────────────────────────────┤
│  Parametric Knowledge (permanent, frozen)    │
│  Training data — broad but stops at cutoff   │
│                                    ✕ cutoff  │
│                              "Here be dragons"│
└─────────────────────────────────────────────┘
```

Everything above the line is what you control. Everything below the line is what the model came with. Your job as an agentic engineer is to make that top layer precise enough that the frozen bottom layer doesn't lead the model astray.

### Why This Matters for Agentic Engineering

- **Verification gates exist because of hallucination** — you can't trust the model's self-assessment that its code is correct. You trust `tsc`, `npm run build`, and test suites.
- **CLAUDE.md exists because of knowledge cutoffs** — you encode current project reality so the model doesn't fall back on stale training data.
- **Fresh context per session exists because in-context learning is temporary** — each new session needs the full briefing. There's no accumulated learning between sessions.
- **The entire agentic pipeline** (research → spec → CLAUDE.md → build prompts → verification) is an engineering response to these two knowledge mechanisms and their limitations.
