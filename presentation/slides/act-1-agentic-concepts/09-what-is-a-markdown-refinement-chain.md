# What Is a Markdown Refinement Chain?

## Slide

**Title:** What Is a Markdown Refinement Chain?

- **Have Claude write a prompt, paste it into claude.ai with web search, save the result as a .md file in your repo** — that's the whole system
- **Each markdown file feeds the next one** — company briefing → demo spec → tech stack → build prompts → working software. Every step refines the last
- **Use the right tool for the job** — claude.ai can search the web and read live docs. Claude Code can write code and run builds. Don't make one do the other's job
- **Research gets its own whiteboard** — a dedicated session means the model's full attention is on research, not split with your codebase and conversation history
- **Everything is in the repo** — prompts, research results, specs, build prompts. The whole chain is transparent, repeatable, and version-controlled

---

## Notes

### The Core Idea: Separate Research from Implementation

A markdown refinement chain is a pipeline where each step produces a markdown file that becomes the input to the next step. You tell Claude what you need, Claude writes it, you review and refine, then feed it forward. It's a deliberate separation of two fundamentally different tasks:

- **Research** — browsing the web, reading documentation, synthesizing information from multiple sources, finding current best practices. Needs: web access, large context for synthesis, deep reasoning.
- **Implementation** — writing code, editing files, running builds, debugging. Needs: terminal access, file system tools, compiler feedback loops.

Claude.ai and Claude Code are optimized for different halves of this work. Trying to do both in one session wastes the model's attention on the wrong things.

### Why claude.ai for Research?

**Web search and live browsing**

- Claude.ai with "Research" and "Web Search" enabled can search the internet, follow links, read documentation sites, and synthesize findings from multiple sources in real time.
- Claude Code operates on your local filesystem and terminal. It can read files and run commands, but it doesn't natively browse the web the same way.
- For a task like "find me the best conference talks on agentic engineering from 2025-2026," you need a model that can actually go look.

**Opus 4.6 Extended thinking**

- The "Extended" option in claude.ai gives the model more reasoning capacity for complex synthesis tasks.
- Research isn't just finding links — it's reading 10 sources and producing a coherent synthesis. Extended thinking gives the model room to reason through contradictions, weigh sources, and organize a large body of information.

**Full context dedicated to one task**

- A research session that reads 15 web pages and synthesizes them into a structured document can easily consume 100K+ tokens.
- If you tried to do this inside a Claude Code session that's also holding your codebase context, CLAUDE.md, and conversation history, you'd be competing for whiteboard space.
- A dedicated claude.ai session gives the research task the model's full attention and full context window.

### Why Store the Result as a Markdown File?

**It becomes a link in the refinement chain**

- The research prompt system is one step in a larger pipeline where each markdown artifact produces the next:
  1. Research prompt (.md) → fed into claude.ai
  2. Research result (.md) → informs the next prompt
  3. Spec or decision record (.md) → informs build prompts
  4. Build prompts (.md) → fed into Claude Code
  5. Working software → verified and committed
- Each file is both an output of one step and an input to the next. The chain is only as good as each link.

**It's reusable and improvable**

- The research result stays in the repo as a reference document. When you need to make decisions later, the research is there — you don't have to redo it.
- If the research becomes stale (new frameworks, updated best practices), you re-run the prompt and get a fresh result. The prompt itself is the repeatable recipe.

**It's transparent and auditable**

- Anyone on the team can read the research prompt to understand what was asked and read the result to understand what was found.
- There's no hidden context or lost conversation. The entire reasoning chain is committed to the repo as plain text.

### Why the Research Prompt Lives in the Repo

**Prompts are engineering artifacts**

- A well-crafted research prompt is like a well-written test — it encodes your intent precisely enough that a machine can execute it and produce a reliable result. And Claude writes it for you — you describe what you need, review the prompt, ask for changes, and approve it.
- Committing it to the repo means it's version-controlled, diffable, and reviewable. You can see how the prompt evolved and why.

**Anyone can re-run or adapt it**

- A teammate can copy the prompt into their own claude.ai session and get comparable results.
- For a different topic, they can adapt the prompt's structure (the "what I already have," "what I need," "what I want from this research" sections) without starting from scratch.

**It separates "what to ask" from "what was found"**

- The prompt file and the result file are separate artifacts. This matters because:
  - The prompt captures your intent and constraints
  - The result captures the model's findings at a point in time
  - You can re-run the same prompt months later and compare results to see what's changed

### The Refinement Chain Pattern

This research prompt system is one instance of a broader pattern: **markdown refinement chains**.

```
Idea (in your head)
  → Research prompt (.md)        — Claude writes this, you review
    → Research result (.md)      — claude.ai produces this
      → Spec / decision (.md)    — Claude writes this, you review
        → Build prompts (.md)    — Claude writes these, you review
          → Working software     — Claude Code produces this
```

At each step:
- You tell Claude what you need — Claude writes the markdown document
- You review the result — maybe ask Claude to revise it, maybe it's good as-is
- That document becomes the input to the next step

You're not writing any of it. You're directing, reviewing, and deciding when each artifact is good enough to feed into the next step. The human role is judgment and intent, not authorship.

This is the "building the system that builds the system" principle in action. You're not writing code, and you're not even writing the documents — you're directing the AI that writes the documents that produce the documents that produce the code.
