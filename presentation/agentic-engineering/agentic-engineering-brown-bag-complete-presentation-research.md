# Agentic Engineering Brown Bag: Complete Presentation Research

**Bottom line:** This document provides everything needed to build a 45–60 minute presentation on agentic engineering for ~110 software engineers. It covers 13 concepts with slide-ready content, speaker notes, TRAILHEAD demo tie-ins, curated source materials, best visual metaphors, narrative sequencing, and flags on what's changed in 2025–2026. Each concept section is structured for direct translation into PowerPoint slides.

---

## PART 1: Key existing resources and educational materials

### Anthropic's own materials (highest priority)

**"Building Effective Agents"** — Anthropic Research Blog (Dec 2024). The single most-cited resource in the agentic AI space. Defines the critical distinction between *workflows* (predefined code paths) and *agents* (dynamic LLM-directed processes). Contains architecture diagrams for five workflow patterns: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer, plus the core agent loop. Written by Erik Schluntz and Barry Zhang. URL: anthropic.com/research/building-effective-agents

**"Effective Context Engineering for AI Agents"** — Anthropic Engineering Blog (Sep 2025). Establishes context engineering as the successor discipline to prompt engineering. Introduces the **"LLM as CPU, context window as RAM"** metaphor. Covers four strategies: Write, Select, Compress, Isolate. URL: anthropic.com/engineering/effective-context-engineering-for-ai-agents

**"Introduction to Agentic Coding"** — Claude Blog (Oct 30, 2025). Clean three-stage evolution framework: Autocomplete → Chat AI → Agentic Systems. Explains context gathering, planning, and implementation coordination. URL: claude.com/blog/introduction-to-agentic-coding

**"Effective Harnesses for Long-Running Agents"** — Anthropic Engineering Blog. Introduces the "initializer agent + worker agent" pattern and the powerful analogy: *"Imagine a software project staffed by engineers working in shifts, where each new engineer arrives with no memory of what happened on the previous shift."* URL: anthropic.com/engineering/effective-harnesses-for-long-running-agents

**"Building Agents with the Claude Agent SDK"** — Anthropic Engineering Blog. Practical guide covering tool design, feedback loops, agent evaluation. Reveals Claude Code is used internally for research, video creation, and note-taking — not just coding. URL: anthropic.com/engineering/building-agents-with-the-claude-agent-sdk

**Claude Code Documentation** — Complete reference for CLI usage, VS Code extension, MCP integration, CLAUDE.md, git workflows, scheduled tasks, CI/CD integration. URL: code.claude.com/docs/en/overview

**Anthropic Academy: Claude Code in Action** — Free official course on Skilljar. URL: anthropic.skilljar.com/claude-code-in-action

### Conference talks and video resources

**O'Reilly AI Codecon: "Coding for the Agentic World"** (Sep 9, 2025). Free virtual conference co-hosted by Tim O'Reilly and Addy Osmani. Featured Thomas Dohmke (GitHub), talks on MCP, agent workflows, context engineering. URL: oreilly.com/AgenticWorld

**Addy Osmani — "The AI-Native Software Engineer"** (JSNation US 2025). Practical playbook for the "imperative to declarative" shift. Introduces the learnings.md pattern, comprehension debt concept, spec-driven development.

**Addy Osmani — "Mastering Context Engineering"** (~14 min, LinkedIn). Concise talk on tokens, context windows, and the Write/Select/Compress/Isolate framework.

**Armin Ronacher — "Agentic Coding: The Future of Software Development with Agents"** (37 min YouTube). Creator of Flask demonstrating practical Claude Code usage: --dangerously-skip-permissions, Playwright MCP for browser automation, combined logs pattern. Endorsed by Simon Willison.

**AI Engineer Code Summit** (Nov 19–22, 2025, NYC). Speakers from Anthropic, OpenAI, Google DeepMind, Cursor, Cognition. Production-focused content.

### Key blog posts and frameworks

**Anthropic "Building Effective AI Agents"** — Architecture patterns and diagrams (see above).

**OpenAI "Function Calling" Guide** — Detailed 5-step tool calling flow. URL: developers.openai.com/api/docs/guides/function-calling

**Prompting Guide — "Function Calling in AI Agents"** — Clear educational breakdown of the agent loop. URL: promptingguide.ai/agents/function-calling

**Arthur AI — "The Agent Development Lifecycle (ADLC)"** — Complete rethinking of SDLC for probabilistic systems with visual ADLC vs. SDLC comparison. URL: arthur.ai/blog/introducing-adlc

**Microsoft — "An AI-led SDLC with Azure and GitHub"** — Practical walkthrough building end-to-end agentic SDLC. URL: techcommunity.microsoft.com

**IndyDevDan / Tactical Agentic Coding (TAC)** — Production-focused course introducing the PITER framework and TAC methodology. URL: agenticengineer.com/tactical-agentic-coding

### MCP resources

**Official MCP Documentation** — The canonical "USB-C for AI" analogy. Architecture diagrams, JSON-RPC transport, three primitives (Tools, Resources, Prompts). URL: modelcontextprotocol.io

**Vercel — "MCP Explained: An FAQ"** — Developer-focused. Key framing: "MCP isn't a library or SDK. It's a spec, like REST or GraphQL, but for AI agents." URL: vercel.com/blog/model-context-protocol-mcp-explained

### Community resources

**Awesome Claude Code** (GitHub) — Curated list of skills, hooks, slash-commands, and plugins. URL: github.com/hesreallyhim/awesome-claude-code

**Claude Code Ultimate Guide** (GitHub) — Beginner to power user with production-ready templates. Includes company metrics: Fountain 50% faster, CRED 2x speed, TELUS 500K hours saved. URL: github.com/FlorianBruniaux/claude-code-ultimate-guide

---

## PART 2: Presentation-ready content for 13 concepts

---

### CONCEPT 1: What is a model?

**Slide title:** "A reasoning engine, not a search engine"

**Key bullets:**
- Transformer neural networks trained on code and text that predict the next token — fundamentally probabilistic pattern-completion engines, not knowledge retrieval systems
- Emergent reasoning: predicting what comes next sometimes requires genuine insight (Sutskever: predicting a detective novel's ending requires understanding the entire plot)
- Good at: pattern recognition, code generation, reasoning through well-represented problems, summarization, brainstorming. Struggles with: precise arithmetic, guaranteed factual accuracy, knowledge after training cutoff, deterministic behavior
- Mental model shift: same input can produce different outputs — this is probabilistic, not procedural
- Not autocomplete on steroids — a reasoning engine that generates new text from learned patterns

**Suggested visual:** A three-column comparison diagram. Column 1: "Database" (key → exact value, deterministic). Column 2: "Search Engine" (query → existing documents, retrieval). Column 3: "LLM" (prompt → generated response, probabilistic reasoning). Each column shows a different icon and data flow. Below, a "temperature dial" showing how randomness is controlled.

**Speaker notes:** "When most people first encounter an LLM, they treat it like a search engine or a database. They type a question and expect it to look up the answer. That's not what's happening. The model is a neural network that has absorbed statistical patterns from enormous amounts of code and text. When you give it a prompt, it generates what's most likely to come next, token by token. Sometimes that requires genuine reasoning — predicting the next word in a complex chain of logic means the model has to have internalized that logic. But it's not retrieving a stored answer. It's generating one. This is why the same prompt can give you slightly different results each time, and why models can be confidently wrong. Think of it as a very well-read colleague who can reason through most problems but occasionally makes things up."

**TRAILHEAD tie-in:** "When we built TRAILHEAD, every feature prompt was crafted knowing the model would *reason* about the implementation, not look up a template. For the GPS tracking feature, Claude didn't copy an existing GPS component — it reasoned about the Next.js architecture, the Leaflet.js API patterns it had seen in training, and generated a novel implementation specific to our app structure."

---

### CONCEPT 2: The Claude Code models

**Slide title:** "Three brains, three price points, one pipeline"

**Key bullets:**
- **Haiku 4.5** ($1/$5 per MTok, 200K context) — The fast thinker. Used for subagents, classification, quick file reads, routine tasks. Smart model switching routes simple work here automatically
- **Sonnet 4.6** ($3/$15 per MTok, 1M context) — The daily driver. Handles 90%+ of coding tasks. Preferred over older models by 70% of developers. Best cost/quality ratio
- **Opus 4.6** ($5/$25 per MTok, 1M context, 128K max output) — The deep reasoner. Complex architecture decisions, agent teams, large codebase analysis. Required for Agent Teams feature
- Claude Code automatically routes between models — Haiku for subagents, Sonnet/Opus for main implementation tasks
- Output tokens cost **5× input tokens** across all tiers — generating code is much more expensive than reading context

**Suggested visual:** A pyramid or tier diagram. Haiku at the base (widest — high volume, fast, cheap), Sonnet in the middle (balanced — daily work), Opus at the top (deep reasoning, complex tasks). Each tier shows: speed indicator, cost per MTok, context window size, and a one-line use case. Arrows show Claude Code's automatic routing between tiers.

| Feature | Haiku 4.5 | Sonnet 4.6 | Opus 4.6 |
|---|---|---|---|
| Input / Output cost | $1 / $5 | $3 / $15 | $5 / $25 |
| Context window | 200K | 1M | 1M |
| Max output | 64K | 64K | 128K |
| Speed | Fastest | Fast | Moderate |
| Best for | Subagents, classification | Daily coding (90%+ tasks) | Architecture, agent teams |

**Speaker notes:** "Claude Code isn't one model — it's a hierarchy of three. Think of it like compute tiers in AWS. You don't run everything on the largest instance. Haiku handles the quick, routine stuff: reading a file to check its structure, classifying whether a task is simple or complex, running subagent tasks. Sonnet is your daily driver — it handles the vast majority of coding work at a great quality-to-cost ratio. Opus is the heavyweight — you bring it in for complex architecture decisions, analyzing a large codebase, or running agent teams. Claude Code handles the routing automatically. In our TRAILHEAD build, most feature implementation ran on Sonnet, while subagents doing file discovery and simple edits ran on Haiku."

**TRAILHEAD tie-in:** "Our headless pipeline used Sonnet for each feature build. The cost for building 7 features in one afternoon was remarkably low because 90% of the work stayed on Sonnet's $3/$15 tier. Subagent calls for file reads and code analysis automatically routed to Haiku at $1/$5."

---

### CONCEPT 3: How does a model know things?

**Slide title:** "Frozen knowledge meets live context"

**Key bullets:**
- **Parametric knowledge** (training data): Encoded in neural network weights during training. Broad but frozen at a cutoff date — like a textbook published on a specific date
- **In-context learning**: Temporary knowledge loaded into the prompt. No weight updates — the model adapts to new information within a single session, then forgets it entirely
- **Knowledge cutoffs matter**: Sonnet 4.6 is reliable through August 2025; Opus 4.6 through May 2025. Anything after is unknown unless supplied in context
- **Why hallucination happens**: No internal fact-check step. Token-by-token generation optimizes for fluency, not accuracy. When fluency and accuracy conflict, fluency wins
- **Context supplements knowledge**: CLAUDE.md, file reads, tool outputs, and RAG fill gaps between what the model learned and what it needs to know now

**Suggested visual:** Two-layer diagram. Bottom layer: "Parametric Knowledge" (a large frozen block labeled "Training Data — frozen at cutoff date," showing broad world knowledge, code patterns, APIs). Top layer: "Context Window" (a smaller, dynamic container showing CLAUDE.md, file contents, tool results, conversation). An arrow labeled "Supplements & Overrides" connects context to the model. A red "X" marks the cutoff date with "Here be dragons" beyond it.

**Speaker notes:** "There are exactly two ways a model 'knows' something. First, parametric knowledge — patterns encoded in its weights during training. This is like everything it learned in school. It's broad, it covers most programming languages and frameworks, but it's frozen at a specific date. Second, in-context learning — information you provide in the conversation. This is the briefing document you hand someone before a meeting. It's temporary and disappears when the session ends, but it can override parametric knowledge. Hallucinations happen because the model generates text optimized for 'what sounds right,' not 'what is right.' There's no internal verification step. This is exactly why we use verification gates — tsc, build commands, test suites — to catch the 5% of code that sounds right but isn't."

**TRAILHEAD tie-in:** "In TRAILHEAD, CLAUDE.md provided the project's architecture rules, Next.js conventions, and component patterns. The model's parametric knowledge covers React and Next.js well, but *our specific* project structure — the app router layout, the shared component library, the API patterns we chose — had to come from context. Every feature prompt included markdown specs that told the model exactly what it needed to know beyond its training data."

---

### CONCEPT 4: What is an agent?

**Slide title:** "A brain with hands: the while loop that changes everything"

**Key bullets:**
- **Model**: text in → text out → done. Stateless function call. **Agent**: model + tools + context + loop. A running process that persists, decides, acts, and iterates
- The agent loop in 4 steps: **Think** (LLM reasons about current state) → **Act** (call a tool — read file, run bash, write code) → **Observe** (examine tool result) → **Repeat** until task is complete
- Every agent framework converges on the same architecture — "the same six lines of logic wearing different costumes" (Steve Kinney)
- Agents beat one-shot calls: ReAct framework showed 34% improvement on complex tasks. Multi-step allows error recovery, iteration, and task decomposition
- Claude Code is an agent: it reads your codebase, reasons about changes, writes code, runs the build, reads errors, fixes them, and repeats

**Suggested visual:** Two diagrams side by side. Left: "Model (One-Shot)" — a simple arrow from Prompt → Response. Right: "Agent (Loop)" — a circular flow: User Input → LLM Reasoning → Tool Call? → [Yes: Execute Tool → Feed Result Back → LLM Reasoning] / [No: Return Response]. The loop arrow is the key visual element. Below both, the canonical 9-line agent loop in Python:

```python
def agent_loop(llm):
    msg = user_input()
    while True:
        output, tool_calls = llm(msg)
        if tool_calls:
            msg = [execute(tc) for tc in tool_calls]
        else:
            return output
```

**Speaker notes:** "This is the single most important concept in this presentation. A model by itself is a function — text in, text out, done. An agent wraps that model in a loop with tools. The model reasons about what to do, calls a tool to take action, observes the result, and decides what's next. That loop is literally the entire difference between a chatbot and an agent. And here's the remarkable thing — I've read through the source code of Claude Code, Cursor, Codex, LangGraph, Vercel AI SDK. They all converge on the same architecture. A while loop that calls an LLM, checks for tool calls, executes them, and loops. That's it. The engineering challenge isn't the loop — it's everything around the loop: context management, security, cost control, verification."

**TRAILHEAD tie-in:** "Every TRAILHEAD feature was built by this loop in action. Claude Code received the feature prompt, read the existing codebase structure, reasoned about the implementation approach, wrote files, ran `npm run build`, observed the errors, fixed them, ran the build again, and repeated until the feature compiled cleanly. The GPS tracking feature took 3 agent loop iterations — write code, hit a TypeScript error, fix the import, build clean."

---

### CONCEPT 5: System prompts

**Slide title:** "50 lines that shape every decision"

**Key bullets:**
- System prompts are persistent developer instructions that define an agent's role, behavior, and constraints — loaded before any user interaction
- **System prompt = constructor/initialization; user prompt = method call.** The system prompt creates the agent's "personality" and rules; the user prompt says what to do right now
- CLAUDE.md is Claude Code's project-level system prompt — automatically loaded at session start, defines build commands, conventions, architecture rules
- Claude Code's built-in system prompt uses ~50 of the model's ~150–200 reliable instruction slots — leaving ~100–150 for your CLAUDE.md
- Consistency across fresh contexts: when you start a new session, the system prompt ensures the agent behaves the same way every time, even with no memory of previous work

**Suggested visual:** A layered stack diagram showing prompt hierarchy. Bottom layer: "Claude Code System Prompt (~50 instructions)" — built-in, always present. Middle layer: "CLAUDE.md (~100 instructions)" — project-specific, you control. Top layer: "User Prompt (your feature request)" — task-specific, changes each time. Arrows show all three flowing into the context window. A gauge on the side shows "Instruction Budget: ~150–200 max" with the fill level.

**Speaker notes:** "Think of the system prompt as a configuration file for the model. When you initialize a software component, you pass in configuration that determines its behavior. The system prompt does exactly that — it tells the model who it is, what it can do, what it should never do, and how to format its output. In Claude Code, there are two layers: the built-in system prompt that Anthropic wrote, and your CLAUDE.md file. The built-in prompt uses about 50 of the model's reliable instruction-following capacity. You get the remaining 100–150 instructions for your CLAUDE.md. This is why CLAUDE.md should be ruthlessly concise — every unnecessary line degrades the model's ability to follow the important instructions. The '50 lines that matter' principle: write the 50 most important lines of project context and rules, and make every one count."

**TRAILHEAD tie-in:** "TRAILHEAD's CLAUDE.md contained the project's build command (`npm run build`), TypeScript strictness rules, component naming conventions, the app router structure, and critical 'DO NOT' instructions (like never using deprecated APIs). Every headless `claude -p` invocation loaded this file first, which is why all 7 features followed the same conventions even though each was built in a fresh context window."

---

### CONCEPT 6: Context

**Slide title:** "RAM, not a hard drive — and it leaks"

**Key bullets:**
- Context window = everything the model can "see" at once: system prompt + CLAUDE.md + conversation history + tool results + file contents + the model's response. It's working memory with a hard size limit
- Window sizes: **200K tokens** (Haiku 4.5), **1M tokens** (Sonnet 4.6, Opus 4.6). 1M tokens ≈ 750K words — but bigger isn't always better
- **Context degradation is real**: "Lost in the Middle" research shows models favor tokens at the beginning and end. At 32K tokens, 11 of 12 models dropped below 50% of short-context performance. Adding context taxes everything already there (quadratic attention cost)
- **Fresh context as strategy**: Each new session gets clean working memory. 11 short, focused sessions produce dramatically better results than one long degrading session
- Four strategies from Anthropic: **Write** (scratchpads/external memory), **Select** (retrieval/search), **Compress** (summarization), **Isolate** (subagents with separate context)

**Suggested visual:** A stacked bar chart showing context window usage across turns. Turn 1: thin (system prompt + CLAUDE.md + first prompt). Turn 5: medium (growing conversation + tool results). Turn 15: nearly full (most space consumed, small sliver remaining). A "quality curve" line overlaid showing performance declining as the bar fills. A "fresh start" icon at the bottom showing a clean, empty bar with high quality. Alternatively, the "computer architecture" diagram: CPU = Model, RAM = Context Window, Hard Drive = Training Data, I/O Ports = Tools.

**Speaker notes:** "Context is the most misunderstood concept in agentic engineering. Everyone's heard that models now support 1 million tokens — and the instinct is 'great, load everything.' That's wrong. Context is RAM, not a hard drive. And unlike RAM, adding to context has a quadratic cost from the attention mechanism — every token you add makes every other token slightly harder for the model to attend to. Research consistently shows that focused, curated context beats dumping everything in. The 'Lost in the Middle' effect means the model reliably processes the beginning and end of context but struggles with the middle. This is why fresh context wins. When we built TRAILHEAD, each feature got a fresh `claude -p` invocation — a clean context window with only the system prompt, CLAUDE.md, and that specific feature's specification. No accumulated noise from previous features."

**TRAILHEAD tie-in:** "The TRAILHEAD pipeline ran each of 7 features as a separate `claude -p` call — fresh context every time. This wasn't a limitation; it was the strategy. Feature 7 got the same quality of attention as Feature 1 because there was no context degradation from previous work. The build artifacts on disk (via git) served as the persistent memory between sessions."

---

### CONCEPT 7: Tokens

**Slide title:** "The currency you're spending with every keystroke"

**Key bullets:**
- Tokens are subword units — the atoms of LLM I/O. Built via Byte-Pair Encoding. Rule of thumb: **1 token ≈ 4 characters ≈ ¾ of a word in English**. "tokenization" → ["token", "ization"]
- Three cost levers engineers must track: **Money** (API charges per token), **Space** (context window consumption), **Speed** (more tokens = more latency, output generated one token at a time)
- **Output tokens cost 5× input tokens** across Claude models — generating code is far more expensive than reading context. Opus 4.6: $5 input / $25 output per million tokens
- **Prompt caching** saves 90% on repeated context (cache reads = 10% of input price). **Batch API** saves 50% on all costs. Combined: up to 95% reduction
- Token efficiency in CLAUDE.md and prompts matters: a verbose 500-line CLAUDE.md wastes budget on every single invocation. A tight 100-line version saves thousands of tokens per session

**Suggested visual:** A "token budget" dashboard. Show a 200K token context window as a container. Annotate what consumes tokens: System prompt (~1K), CLAUDE.md (~2K), tool definitions (~3K), conversation so far (~20K), file reads (~50K), remaining budget (~124K). Below, a cost calculator: "7 TRAILHEAD features × ~50K tokens each × $3/$15 Sonnet pricing = $X total build cost." Include the key ratio: "Output is 5× more expensive than input."

**Speaker notes:** "Tokens are the fundamental unit of cost in LLM engineering. They're not words — they're subword pieces. Common words get one token; unusual words get split into two or three. You care about tokens for three reasons: money, space, and speed. On cost: output tokens are five times more expensive than input tokens across all Claude models. That means the code the agent writes costs five times more than the code it reads. On space: everything in the context window is measured in tokens. A verbose CLAUDE.md wastes budget on every invocation. On speed: the model generates output one token at a time, so longer outputs take proportionally longer. The practical mental model: tokens are your bandwidth. Budget them carefully, especially for system prompts and CLAUDE.md that get loaded on every single call."

**TRAILHEAD tie-in:** "Each TRAILHEAD feature consumed roughly 40–60K tokens per `claude -p` invocation — mostly output tokens as the model wrote implementation code. At Sonnet 4.6 pricing ($3/$15 per MTok), the entire 7-feature build cost somewhere between $5–15 in API costs. That's an afternoon of engineering for the price of a lunch. Token efficiency in our CLAUDE.md — keeping it under 150 lines — saved thousands of input tokens across all 7 invocations."

---

### CONCEPT 8: Tools

**Slide title:** "The hands on the keyboard: Read, Write, Edit, Bash"

**Key bullets:**
- Tools are functions the model can call to take action in the real world. **The model generates a JSON call specification; your system executes the function.** The LLM decides *what* to call; the runtime handles the *how*
- Claude Code's core toolset: **Read** (inspect files), **Write** (create files), **Edit** (targeted string replacements), **Bash** (execute shell commands), **Glob** (find files by pattern), **Grep** (search file contents), **Agent** (spawn subagents), **LSP** (code intelligence — type errors, jump to definition)
- **MCP (Model Context Protocol)** extends tools beyond built-in ones. MCP is an open standard — "USB-C for AI" — with 5,800+ servers for GitHub, Slack, Postgres, and more. Donated to Linux Foundation Dec 2025
- **--allowedTools** for headless automation: explicitly specify which tools the agent can use (`--allowedTools "Read,Write,Edit,Bash"`) for controlled pipeline execution
- Tool results feed back into context, creating the ReAct cycle: **Reason → Act (tool call) → Observe (tool result) → Reason again**

**Suggested visual:** A diagram showing the tool-calling flow. Center: LLM "brain." Surrounding it: tool icons in a ring — terminal (Bash), file (Read/Write/Edit), magnifying glass (Grep/Glob), code brackets (LSP), puzzle piece (MCP). Arrows show: (1) LLM decides to call tool, (2) generates JSON specification, (3) runtime executes tool, (4) result feeds back into context. Below, a before/after: "Without tools: 'Here's how you would fix the bug...'" vs. "With tools: *reads file, edits line 47, runs build, confirms fix*"

**Speaker notes:** "Tools are what make an agent an agent rather than a chatbot. Without tools, the model can explain how to fix a bug. With tools, it actually fixes the bug. The mechanism is elegant: the model outputs a structured JSON object specifying which function to call and with what arguments. Your system — Claude Code's runtime — deserializes that JSON and executes the function. The result goes back into context, and the model reasons about what to do next. Claude Code ships with about 30 built-in tools. The big six for coding: Read, Write, Edit, Bash, Glob, Grep. But here's where it gets interesting — MCP lets you extend the toolset with any external service. Need to query a database? There's an MCP server. Need to check Slack? MCP server. It's like USB-C — one standard protocol for connecting any tool to any AI system."

**TRAILHEAD tie-in:** "In the TRAILHEAD headless pipeline, we used `--allowedTools 'Read,Write,Edit,Bash,Glob,Grep'` to give the agent exactly the tools it needed: read the existing codebase, write new components, edit existing files, and run `npm run build` via Bash for verification. No web search, no unnecessary permissions. Each feature build was a controlled, scoped agent session. The Bash tool was critical — it let the agent run TypeScript compilation and catch its own errors in a tight feedback loop."

---

### CONCEPT 9: Claude Code running a bash shell

**Slide title:** "A developer with a terminal — and a verification reflex"

**Key bullets:**
- Claude Code runs a **persistent Bash shell** with real terminal access — it can execute any command, read output, and act on results. Working directory persists between commands; environment variables do not
- **The verification gate pattern**: after every code change, the agent runs `tsc --noEmit` and `npm run build`. If the build fails, the error output feeds back into context and the agent self-corrects. This is the "deterministic check on probabilistic output" principle
- The debug loop: write code → build → read errors → fix → build again → repeat until clean. This mirrors how human developers work but runs in seconds, not minutes
- **Security model**: tools requiring side effects (Bash, Write, Edit) need explicit permission. `--allowedTools` restricts which tools are available. Hooks system can block dangerous operations (e.g., prevent `git push --force`)
- **The core insight**: "AI agents are probabilistic systems making deterministic claims. An agent can conclude its code is correct — while `tsc` catches three type errors in under a second." Never trust self-assessment; trust linters, type checkers, and test suites

**Suggested visual:** A terminal-style flowchart showing the verification gate pattern: `Write feature code` → `Run tsc --noEmit` → [Errors?] → [Yes: read error output → fix code → run tsc again] / [No: run npm run build] → [Build errors?] → [Yes: fix → rebuild] / [No: ✅ Feature complete]. Show this as a loop with iteration count (e.g., "Typical: 2–4 iterations"). Highlight the key insight: "The model writes code; the compiler verifies it."

**Speaker notes:** "This is where the rubber meets the road. Claude Code has a real Bash shell. Not a sandbox, not a simulation — a real terminal where it can run real commands. And this is what enables the most important pattern in agentic coding: the verification gate. After writing code, the agent runs the TypeScript compiler. If there are errors, the error output feeds directly back into context — the agent can read the exact error message, fix the exact line, and try again. This is the tight feedback loop that makes agentic coding work. The key principle: the model is probabilistic, but the compiler is deterministic. We don't trust the model's claim that the code is correct. We trust `tsc`. We trust `npm run build`. We trust the test suite. The agent writes the code; deterministic tools verify it."

**TRAILHEAD tie-in:** "Every one of TRAILHEAD's 7 features went through this exact cycle. The headless pipeline ran `claude -p` with a feature prompt, and within each session, the agent would write code, run `npm run build`, and iterate until the build passed. Feature 3 — the data visualization dashboard — took 4 debug iterations because of a complex type error with the charting library. The agent read the TypeScript error, traced it to a wrong generic parameter, fixed it, and the build passed. Total time: ~90 seconds for what would have taken a human developer 10–15 minutes of debugging."

---

### CONCEPT 10: Use markdown for everything

**Slide title:** "Markdown in, software out"

**Key bullets:**
- Markdown is the universal interchange format between humans and models — it's readable by both, parseable by both, and rich enough to express architecture, specs, and constraints
- **CLAUDE.md** (project rules) is markdown. Feature prompts are markdown. Architecture docs are markdown. The model's output can be markdown. Every interface is text
- The "markdown in, software out" principle: write a markdown specification describing what you want → feed it to the agent → receive working software. The spec *is* the prompt
- Markdown's structure (headers, lists, code blocks, emphasis) naturally maps to how models parse priority and hierarchy — **bold text** gets more attention, code blocks signal exact syntax
- This eliminates the "prompt engineering" mystique: if you can write a clear README, you can drive an agent. Software specs, architecture decisions, and feature requirements are the new input format

**Suggested visual:** A transformation diagram. Left side: a markdown document showing a feature spec (with headers, bullet points, code examples). Arrow labeled "claude -p" pointing right. Right side: a Next.js component file, a test file, and a "✅ Build passes" indicator. Below: examples of markdown documents that serve as agent inputs — CLAUDE.md, feature-spec.md, architecture.md. The message: "Your spec IS your prompt."

**Speaker notes:** "Here's a principle that simplifies everything: markdown in, software out. Markdown is the universal interchange format in agentic engineering. Your project rules are markdown — that's CLAUDE.md. Your feature specs are markdown. Your architecture decisions are markdown. The model reads markdown natively and generates code from it. This means the skill of driving an agent is not some exotic 'prompt engineering' — it's the skill of writing a clear specification. If you can write a good README, you can write a good prompt. For TRAILHEAD, every feature was specified in a markdown document: what the feature should do, what components to create, what patterns to follow, what tests to include. That markdown document went into `claude -p`, and working software came out the other end."

**TRAILHEAD tie-in:** "TRAILHEAD's entire build pipeline was driven by 7 markdown files — one per feature. Each file was a structured spec: feature name, description, components to create, API patterns to follow, acceptance criteria. These files are human-readable documentation AND machine-executable prompts. After the build, those same markdown specs serve as documentation for what was built and why. The pipeline is literally: `cat feature-spec.md | claude -p`."

---

### CONCEPT 11: Agent coordination

**Slide title:** "Monolith vs. microservices — the same tradeoff, again"

**Key bullets:**
- **Single agent**: simple to build, debug, and govern. Good for focused, sequential tasks. Start here — a single agent with the right tools beats poorly coordinated multi-agent systems
- **Sequential pipeline**: chain agents linearly, each processing the previous agent's output. TRAILHEAD's feature pipeline: Feature 1 → build → Feature 2 → build → ... → Feature 7
- **Parallel agents**: Claude Code's worktrees and /batch enable parallel execution. Each agent gets an isolated git worktree, implements independently, merges back. Agent Teams (Feb 2026, Opus 4.6) adds built-in coordination
- **Coordination overhead is real**: 3 agents = 3 relationships; 10 agents = 45. Research shows coordination gains plateau beyond 4 agents and multi-agent networks amplify errors 17×
- **Current best practice**: start single, add agents only when you need concurrency, isolation, or distinct context boundaries. The "skills" pattern — single agent loading specialized prompts — is often better than multi-agent

**Suggested visual:** Three architecture diagrams. (1) **Sequential Pipeline**: boxes connected in a line (Feature 1 → Feature 2 → ... → Feature 7), each with a verification gate between them. (2) **Parallel Agents**: a fan-out/fan-in pattern showing an orchestrator splitting work into 3 parallel agents, each in its own worktree, results merging back. (3) **Agent Teams**: multiple agents with bidirectional communication arrows, a shared git repo in the center, and a "coordination overhead" indicator growing with agent count. A note: "Start with #1. Move to #2 only when proven necessary."

**Speaker notes:** "If you've ever debated monolith versus microservices, you already understand multi-agent coordination. Same tradeoffs. A single agent is simpler to build, debug, and reason about. Multi-agent gives you parallelism and specialization but adds coordination overhead. The research is clear: coordination gains plateau beyond about 4 agents, and multi-agent networks can amplify errors by 17×. The current best practice — and this has shifted toward pragmatism in 2025-2026 — is to start with a single agent and only add agents when you have a proven need for concurrency or isolation. Claude Code's skills pattern often provides the specialization benefits of multi-agent without the coordination cost: one agent dynamically loads different specialized prompts instead of routing to separate sub-agents."

**TRAILHEAD tie-in:** "TRAILHEAD used the simplest effective coordination pattern: a sequential pipeline. Each feature was a separate `claude -p` call, run one after another. Feature 2 built on Feature 1's committed code. This sequential approach meant zero coordination overhead and perfect isolation — each agent session had fresh context and could only see the codebase as committed to git. For a more complex project, we could parallelize independent features using worktrees, but sequential was the right call for a one-afternoon build."

---

### CONCEPT 12: Agent lifecycle

**Slide title:** "Born with amnesia, remembers through files"

**Key bullets:**
- Agent lifecycle: **Session start** → context loading (system prompt + CLAUDE.md + tool definitions) → **execution loop** (think → act → observe → repeat) → **verification** (build check) → **session end** (context discarded)
- **Agents are stateless between sessions** — each new session starts with zero memory of previous work. Like a new developer showing up for their first day, every time
- **Memory is externalized**: agents "remember" via the filesystem (code, configs, docs) and git (commits, branches, diffs). The codebase IS the persistent memory
- **Headless lifecycle with `claude -p`**: initialize → load CLAUDE.md → execute prompt → produce output → exit. No interactive loop, no continued context. `--resume <session_id>` to continue a previous session when needed
- **Context compaction**: when context grows too large, Anthropic's server-side compaction summarizes older conversation while preserving recent detail. But fresh sessions still outperform compacted ones for complex work

**Suggested visual:** A horizontal timeline/lifecycle diagram: `Session Start` → `Load Context` (CLAUDE.md, system prompt, tool defs) → `Execute` (the agent loop, shown as a spiral) → `Verify` (build gate) → `Session End` → `[GAP: No memory]` → `Next Session Start` (load context fresh). Below the gap, show what persists: git commits, files on disk, CLAUDE.md. Above the gap, show what's lost: conversation history, intermediate reasoning, tool results. The key visual: the gap between sessions, bridged only by the filesystem.

**Speaker notes:** "Here's the fundamental constraint that shapes everything: agents are born with amnesia. Every session starts from zero. The model has no memory of the brilliant debugging it did in the last session. It doesn't remember the architectural decision it made an hour ago. All of that is gone when the context window resets. This sounds like a limitation, but it's actually a feature. Fresh context means fresh attention, no accumulated noise, no degradation. The key insight is that agents remember through the filesystem. The code they committed, the CLAUDE.md they updated, the architecture docs they wrote — those persist in git. The codebase is the persistent memory. In headless mode with `claude -p`, each invocation is a complete lifecycle: load context, execute, verify, exit. The next invocation sees only what's on disk."

**TRAILHEAD tie-in:** "TRAILHEAD's 7-feature pipeline is a textbook example of agent lifecycle management. Each `claude -p` invocation was a complete, self-contained lifecycle: load CLAUDE.md, read the feature spec, implement, build-check, exit. Between features, the only thing that persisted was the git repository — the committed code, the package.json, the component directory structure. Feature 4 'knew' about Features 1–3 not because it remembered building them, but because it could read the files they left behind. Amnesia by design, memory through git."

---

### CONCEPT 13: Agentic Software Development Lifecycle

**Slide title:** "From writing code to directing agents who write code"

**Key bullets:**
- Traditional SDLC maps directly to agentic phases: **Research** (agent explores codebase, reads docs) → **Spec** (human writes markdown specification) → **Architecture** (human designs, agent validates) → **Build** (agent implements) → **Debug** (agent self-corrects via verification gates) → **Deploy** (standard CI/CD)
- Three levels of human involvement: **In-the-loop** (review every output, approve every action), **Out-of-the-loop/AFK** (agent works autonomously, human reviews at checkpoints), **Zero-touch** (fully autonomous pipeline, human reviews only PRs/results)
- **PITER framework**: Prompt → Iterate → Test → Evaluate → Refine — a structured cycle for agentic development. Write a prompt, let the agent iterate, test the output, evaluate quality, refine the prompt/approach
- The engineer's role evolves: from **code producer** to **architect + reviewer + system designer**. You specify intent; agents generate implementation. Your value shifts to judgment, architecture, and quality standards
- The evolution spectrum: **Autocomplete** (2023, line-level) → **Chat AI** (2024, multi-file) → **Agentic** (2025+, full workflow delegation). Each stage increases scope and autonomy

**Suggested visual:** Two side-by-side SDLC diagrams. Left: "Traditional SDLC" — Requirements → Design → Code → Test → Deploy, with "Human" labeled at every step. Right: "Agentic SDLC" — same phases but with role markers: Spec (Human), Architecture (Human + Agent), Build (Agent), Verify (Deterministic tools), Review (Human), Deploy (CI/CD). Below both: a spectrum bar showing three levels: "In-the-loop" (left, highest human involvement) → "Out-of-the-loop" (middle) → "Zero-touch" (right, lowest). Mark TRAILHEAD's position on this spectrum (out-of-the-loop — human wrote specs, agent built features, human reviewed results).

**Speaker notes:** "The agentic SDLC isn't a replacement for traditional software engineering — it's a remapping. Every phase still exists. You still need requirements. You still need architecture. You still need testing and deployment. What changes is *who does what*. In the agentic SDLC, humans focus on the high-judgment work: defining what to build, designing the architecture, setting quality standards, reviewing output. Agents handle the implementation. This is the PITER cycle in practice: you Prompt the agent with a clear spec, let it Iterate on the implementation, Test the output with deterministic tools, Evaluate whether it meets your standards, and Refine your approach if needed. The three levels of involvement — in-the-loop, out-of-the-loop, and zero-touch — represent a maturity spectrum. Most teams start in-the-loop and gradually increase autonomy as they build trust. TRAILHEAD was built out-of-the-loop: I wrote specs, the agent built features headlessly, and I reviewed the committed code."

**TRAILHEAD tie-in:** "TRAILHEAD demonstrates the 'out-of-the-loop' level of the agentic SDLC. The human work was: (1) write CLAUDE.md project rules, (2) write 7 feature specs in markdown, (3) design the sequential pipeline. The agent work was: implement each feature, run verification gates, self-correct errors. The human review was: inspect committed code, run the full application, verify features work as specified. One afternoon, 7 features, zero lines of code written by hand. But every line of architecture, specification, and quality criteria was human-defined."

---

## PART 3: Narrative flow and presentation structure

### Recommended sequence: 45–60 minute presentation

**Act 1: Foundation (12–15 minutes)**

| Time | Slide(s) | Concept | Notes |
|---|---|---|---|
| 0:00 | Opening | Hook: "One afternoon. 7 features. Zero hand-written code." | Show TRAILHEAD running. 60-second wow factor. |
| 2:00 | 1 | What is a model? | Reasoning engine, not search engine |
| 5:00 | 2 | The Claude Code models | Haiku/Sonnet/Opus pyramid, pricing |
| 8:00 | 3 | How does a model know things? | Frozen knowledge + live context |
| 11:00 | Transition | "Now you know what the brain is. Let's give it hands." | Bridge to Act 2 |

**Act 2: Agent Architecture (18–20 minutes)**

| Time | Slide(s) | Concept | Notes |
|---|---|---|---|
| 12:00 | 4 | What is an agent? | THE key slide — the while loop. Show pseudocode. |
| 16:00 | 5 + 6 | System prompts + Context | Combine into "The agent's briefing" mini-section. CLAUDE.md as system prompt, context as RAM |
| 22:00 | 7 | Tokens | Quick — cost, space, speed. Show the budget visual |
| 24:00 | 8 | Tools + MCP | Claude Code's toolset, USB-C analogy for MCP |
| 28:00 | Transition | "Let's see this in action." | Bridge to demo |

**Act 3: Live TRAILHEAD Demo (10–12 minutes)**

| Time | Content | Notes |
|---|---|---|
| 29:00 | Show the headless pipeline | Run `claude -p` with a feature spec. Show the agent loop in real time: reading files, writing code, running build, fixing errors |
| 34:00 | Show the verification gate | Highlight the tsc → error → fix → tsc → pass cycle |
| 37:00 | Show the CLAUDE.md file | Walk through the 50 critical lines |
| 39:00 | Show the result | Open TRAILHEAD in browser, demonstrate the feature just built |

**Act 4: Advanced Patterns (10–12 minutes)**

| Time | Slide(s) | Concept | Notes |
|---|---|---|---|
| 41:00 | 9 + 10 | Bash shell + Markdown for everything | Combine into "The headless build pipeline" |
| 45:00 | 11 | Agent coordination | Monolith vs. microservices analogy |
| 48:00 | 12 | Agent lifecycle | Born with amnesia, remembers through files |
| 51:00 | 13 | Agentic SDLC | The big picture — PITER, three levels, your evolving role |

**Act 5: Close (3–5 minutes)**

| Time | Content | Notes |
|---|---|---|
| 54:00 | Key takeaways | 3 things to remember: (1) Agents = while loops with tools, (2) Context engineering > prompt engineering, (3) Your value shifts to architecture, specs, and judgment |
| 56:00 | Getting started | Practical next steps: install Claude Code, write your first CLAUDE.md, try `claude -p` on a small task |
| 58:00 | Q&A | |

### Concepts that can be combined onto one slide

- **Concepts 5 + 6** (System Prompts + Context): Both deal with "what information the agent has access to." Present as "The agent's briefing" — CLAUDE.md as the persistent briefing, context window as the working memory that holds it.
- **Concepts 9 + 10** (Bash Shell + Markdown): Both deal with the headless build pipeline mechanics. Present as "The headless pipeline: markdown in, software out, bash verifies."
- **Concept 7** (Tokens): Can be a quick 2-minute slide within the Context section rather than standalone.

### Where to use TAC framework elements

The **PITER framework** (Prompt → Iterate → Test → Evaluate → Refine) maps naturally to the live demo — narrate each step as you show it. The **three levels of human involvement** (in-loop → out-of-loop → zero-touch) are the climax of Concept 13, providing the audience a clear path for their own adoption. Use this as the "where you can go from here" closer.

### Transitions between concepts

- Concepts 1–3 → 4: "Now you know what the brain is. Let's give it hands and a terminal."
- Concepts 4–8 → Demo: "Theory is great. Let's watch it happen in real time."
- Demo → 9–10: "What you just saw was the headless pipeline. Let's break down the mechanics."
- Concepts 11–12 → 13: "We've covered individual agent sessions. Let's zoom out to the full development lifecycle."

---

## PART 4: Best visual metaphors and analogies for software engineers

### Top-tier analogies (rated 5/5 for technical audiences)

**Agent = While Loop + LLM + Tools.** The single most effective analogy. Show the 9-line Python agent loop. Steve Kinney: "Every agent framework I've looked at converges on the same architecture. Not similar. The same." Simon Willison's definition: "An AI agent is an LLM that runs tools in a loop." Engineers get this instantly because it's literal code.

**Context Window = RAM (with caveats).** The "computer architecture" analogy from Karpathy: LLM = CPU, Context = RAM, Training Data = Hard Drive, Tools = I/O Ports, System Prompt = OS Configuration. **Critical nuance** from Nate Meyvis: unlike RAM, context has quadratic dilutive effects — adding tokens taxes everything already there. "It's more like a conference call — the more people you add, the harder it is for anyone to follow the conversation."

**LLM = Reasoning Engine, Not Database.** "An LLM is not a filing cabinet you query — it's a well-read collaborator who reasons through problems but can misremember facts." The key correction: it doesn't *look up* answers; it *generates* them.

**CLAUDE.md = Onboarding Document for a Developer with Amnesia.** From HumanLayer: "Every morning, your developer wakes up with zero memory. CLAUDE.md is the document you hand them before they start." This makes context engineering tangible and explains why CLAUDE.md must be ruthlessly concise.

**Hallucination = Junior Developer Who Guesses Instead of Saying "I Don't Know."** "A hallucination is like a junior developer who, instead of admitting ignorance, writes plausible-looking code that calls functions that don't exist." OpenAI's own framing: "Like a multiple-choice test — leaving it blank guarantees a zero, so the model always guesses." Models are trained to produce output, never to abstain.

**Multi-Agent = Microservices Architecture.** Same tradeoffs: simplicity vs. scalability, debugging ease vs. fault tolerance, monolith vs. distributed coordination overhead. "Single agent = monolith. Multi-agent = microservices with natural language APIs."

### Strong analogies (rated 4/5)

**Tokens = API Request Payload Size / Cloud Compute Billing.** "You wouldn't send a 10MB payload for a simple query. Don't waste tokens on unnecessary context." Tokens look cheap per unit but compound fast at scale — just like cloud compute.

**System Prompt = Constructor/Initialization; User Prompt = Method Call.** The system prompt creates the object's state and configuration. User prompts are method invocations on that initialized object.

**Headless Mode = CI/CD Pipeline / Cron Job.** Running `claude -p` is like running a CI/CD job — takes inputs, executes autonomously, produces outputs. The Ona.com autonomy spectrum: seconds (copilot) → minutes (Cursor) → hours (agent) → days (staff-level agent).

**Verification Gate = CI Checks / PR Review.** "You wouldn't merge code without tests passing. Don't accept agent output without verification." The compiler is deterministic; the model is probabilistic. Trust the compiler.

**Context Degradation = Log File Bloat / Memory Leak.** At first, every log entry is useful. Eventually, signal-to-noise ratio collapses and you can't find the needle. "The longer the context runs without cleanup, the worse it performs."

**Fresh Context = Process Restart.** Each new session is like restarting a process — clean state, no accumulated garbage, no memory leaks. State must be explicitly persisted to disk (git/filesystem) between sessions.

### The "aha moment" framing

The most commonly reported "aha moment" for engineers: **"The loop is solved. The engineering around the loop is where the decisions live."** The agent loop itself is trivial — 9 lines of code. The hard problems are context management, security, cost control, verification, and coordination. Engineers who grasp this stop trying to build novel agent architectures and start focusing on context engineering and tool design.

---

## PART 5: Concepts where best practices have changed in 2025–2026

### Context engineering replaced prompt engineering

**Old (2024):** "Prompt engineering" was the skill — crafting the perfect question. **New (2025–2026):** "Context engineering" is the discipline — curating the entire information ecosystem (system prompt, CLAUDE.md, tool definitions, retrieved context, conversation history) that surrounds the prompt. Andrej Karpathy coined the term mid-2025; Anthropic published the definitive guide in September 2025. The shift: **it's not about asking better questions; it's about loading the right information before the question is even asked.**

### Single agent + skills beats multi-agent by default

**Old (2024):** Enthusiasm for multi-agent swarms, AutoGPT-style systems, every task decomposed into multiple agents. **New (2025–2026):** Industry consensus has shifted dramatically toward pragmatism. Google DeepMind research (Dec 2025) found multi-agent networks amplify errors **17×** and coordination gains plateau beyond 4 agents. Best practice: start with a single agent loading specialized "skills" (lightweight prompt files) on demand. Multi-agent only when you have proven need for concurrency, isolation, or distinct security boundaries. The "prompting fallacy" — believing prompt tweaks fix systemic coordination failures — is a named anti-pattern.

### MCP is now the universal standard

**Old (2024):** Custom integrations for every AI-tool connection. Vendor-specific connectors. **New (2025–2026):** MCP (released Nov 2024 by Anthropic) achieved universal adoption: OpenAI (Mar 2025), Google DeepMind (Apr 2025), Microsoft (May 2025). **97 million+** monthly SDK downloads. **5,800+** servers available. Donated to the Linux Foundation's Agentic AI Foundation in December 2025 (co-founded by Anthropic, Block, OpenAI). It's no longer a bet — it's the standard. Security concerns remain the primary caveat: prompt injection through MCP tools, excessive permissions, and "shadow agents" risk.

### 1M context windows are GA — but fresh context still wins

**Old (2024):** 200K tokens max, heavy reliance on RAG. **New (2025–2026):** Opus 4.6 and Sonnet 4.6 ship with **1M token context at standard pricing** (no surcharge, Feb 2026). But research consistently shows that focused, curated context outperforms dumping everything in. Anthropic's own research confirms contexts >100K tokens degrade reasoning quality. The winning pattern: "just-in-time" context — agents maintain lightweight identifiers and dynamically load data using tools (grep/find/read) rather than pre-loading entire codebases. The Claude Code "skills" pattern loads only **~80 tokens** at rest and expands to full instructions only when activated.

### Claude Code matured from beta tool to production platform

**Old (early 2025):** Basic terminal-based AI coding assistant in beta. **New (early 2026):** Full-featured platform with: Agent Teams (Feb 2026, Opus 4.6), git worktrees for isolation, /batch for parallel operations, hooks system (17 lifecycle points), skills system, LSP integration, remote control from mobile, structured outputs, deferred hooks for headless permission management. The `--bare` flag (Mar 2026) optimizes scripted pipeline calls by skipping unnecessary initialization. The Agent SDK (Python/TypeScript) enables programmatic integration.

### Security frameworks emerged for agentic systems

**Old (2024):** Traditional application security applied loosely. No agent-specific frameworks. **New (2025–2026):** Multiple authoritative frameworks arrived: NIST published a Federal Register RFI on agent security (Jan 2026), Cloud Security Alliance released the **Agentic Trust Framework** with Zero Trust for AI agents and a 5-level maturity model (Intern → Principal), OWASP released Top 10 for Agentic Applications (Dec 2025), AWS published the Agentic AI Security Scoping Matrix. **Non-human identities now outnumber human identities 40:1 to 144:1** in some enterprises. The consensus: treat AI agents as non-human identities requiring the same identity management, least privilege, and audit trails as human users.

### Model price-performance converged dramatically

**Old (2024):** Massive price differences between model tiers; significant quality gaps. **New (2026):** Sonnet 4.6 ($3/$15) performs within **1.2% of Opus 4.6** on SWE-bench coding benchmarks (79.6% vs. 80.8%). The practical recommendation: use Sonnet for 80% of coding work, reserve Opus for complex architecture and agent teams. Opus 4.6 is **67% cheaper** than Opus 4.0/4.1 ($5/$25 vs. $15/$75). Haiku 4.5 matches earlier Sonnet 4 quality at $1/$5. The cost of agentic coding has plummeted.

### The adoption-production gap is the defining challenge

**Old:** Excitement about potential. **New:** Data shows 79% adoption but only 11% in production (Deloitte). The NBER study (Feb 2026) found **89% of firms reported zero productivity change from AI**, while firms deploying AI "as workers, not tools" saw significant gains. Gartner warns **40%+ of agentic AI projects will be canceled by 2027**. The presentation should acknowledge this honestly: agentic engineering works spectacularly well for the right use cases (like TRAILHEAD), but success requires the discipline of context engineering, verification gates, and clear specifications — not just pointing an agent at a problem.

---

## Quick-reference: Slide-by-slide summary table

| # | Concept | Slide Title | Key Metaphor | TRAILHEAD Tie-in |
|---|---|---|---|---|
| 1 | What is a model? | A reasoning engine, not a search engine | Well-read colleague who can misremember | Claude *reasoned* about GPS implementation, didn't copy a template |
| 2 | Claude Code models | Three brains, three price points, one pipeline | Compute tiers (like AWS instance types) | Sonnet for features, Haiku for subagents, $5–15 total cost |
| 3 | How models know things | Frozen knowledge meets live context | Textbook (training) + briefing doc (context) | CLAUDE.md supplied project-specific knowledge beyond training |
| 4 | What is an agent? | A brain with hands: the while loop | Running process vs. function call | Each feature was the agent loop in action: reason, code, build, fix |
| 5 | System prompts | 50 lines that shape every decision | Constructor/config file | CLAUDE.md as persistent system prompt across all 7 features |
| 6 | Context | RAM, not a hard drive — and it leaks | Conference call (more people = harder to follow) | Fresh `claude -p` per feature = no degradation |
| 7 | Tokens | The currency you're spending | API payload size / cloud billing | ~$5–15 total for 7-feature build |
| 8 | Tools | The hands on the keyboard | USB-C for MCP | `--allowedTools "Read,Write,Edit,Bash,Glob,Grep"` |
| 9 | Bash shell | A developer with a terminal | Compiler verifies, model writes | tsc → error → fix → tsc → pass in ~90 seconds |
| 10 | Markdown for everything | Markdown in, software out | Your spec IS your prompt | 7 markdown specs → 7 working features |
| 11 | Agent coordination | Monolith vs. microservices | Same architecture tradeoffs | Sequential pipeline: simple, effective, zero overhead |
| 12 | Agent lifecycle | Born with amnesia, remembers through files | Process lifecycle (init → execute → cleanup) | Git commits as persistent memory between sessions |
| 13 | Agentic SDLC | From writing code to directing agents | Raising a team member vs. building a machine | Out-of-the-loop: human specs, agent builds, human reviews |