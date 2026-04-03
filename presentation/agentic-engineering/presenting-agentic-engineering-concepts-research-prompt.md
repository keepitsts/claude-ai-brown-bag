# Research Prompt: Agentic Engineering Concepts for a Brown Bag Presentation

## My Situation

I'm building a PowerPoint presentation for a brown bag session at Simple Technology Solutions (STS) — a federal IT and AI company with ~110 engineers. The audience is software engineers who have heard of AI coding tools but haven't deeply engaged with agentic engineering concepts. I need to take them from "what is a model?" to "how do you engineer systems where AI agents build software for you."

The presentation accompanies a live demo of TRAILHEAD — a 7-feature Next.js application I built entirely with Claude Code in one afternoon using a headless build pipeline. But the presentation itself needs to be broader than my specific project. It should teach the foundational concepts of agentic engineering so the audience understands *why* the approach works, not just *that* it works.

### What I Already Have

I have a reference framework called "Tactical Agentic Coding" (TAC) with 7 tactics and 12 leverage points that I want to weave into the presentation where relevant. The key concepts from TAC:

- **Core Four**: Context, Model, Prompt, Tools — the four things an agent needs
- **12 Leverage Points**: Core Four + Standard Out, Types, Documentation, Tests, Architecture, Plans, Templates, AI Developer Workflows
- **PITER Framework**: Prompt Input, Trigger, Environment, Review — for AFK (out-of-loop) agents
- **Three levels of agentic coding**: In-loop (back-and-forth), Out-of-loop (AFK agents with review), Zero-touch (prompt to production)

I also have the full story of building TRAILHEAD as a concrete example to illustrate abstract concepts.

## Concepts I Need to Cover

I need presentation-ready content (slide titles, key points, visual layout suggestions, speaker notes) for each of these topics. The progression should build from fundamentals to advanced, with each concept preparing the audience for the next.

### Foundational Concepts

1. **What is a model?**
   - LLMs explained for software engineers (not for a general audience — skip the "it predicts the next word" oversimplification)
   - Neural networks trained on code and text, with emergent reasoning capabilities
   - The key mental model shift: it's not a search engine, not a database, not a calculator — it's a reasoning engine that can write and understand code
   - What models are good at vs. what they struggle with

2. **The Claude Code models — Haiku, Sonnet, Opus**
   - The model hierarchy and when to use each
   - Haiku: fast, cheap, good for simple tasks and exploration
   - Sonnet: balanced, the workhorse for most coding tasks
   - Opus: most capable, best for complex reasoning, architecture decisions, and multi-step planning
   - How Claude Code uses different models (e.g., Haiku for quick exploration subagents, Sonnet/Opus for implementation)
   - Cost and speed tradeoffs that matter for engineering workflows

3. **How does a model know things?**
   - Training data and knowledge cutoffs
   - The difference between "knowing" (training data) and "learning" (in-context)
   - Why models hallucinate and what that means for code generation
   - Why you can't just trust generated code — you need verification
   - How context (CLAUDE.md, file reads, tool outputs) supplements what the model "knows"

### Agent Architecture Concepts

4. **What is an agent?**
   - The distinction between a model (the brain) and an agent (brain + tools + context + loop)
   - An agent is: a model that can take actions, observe results, and decide what to do next
   - The agent loop: think → act → observe → think → act → ...
   - Why agents are more useful than one-shot model calls for software engineering
   - Real example: Claude Code as an agent (reads files, writes code, runs commands, observes errors, fixes them)

5. **System prompts**
   - What they are: persistent instructions that shape agent behavior across an entire session
   - How they differ from user prompts (always present, set the rules vs. make requests)
   - CLAUDE.md as a system prompt for Claude Code — conventions, patterns, constraints
   - The "50 lines that matter" principle: every line competes for the model's attention
   - How system prompts create consistency across fresh context windows (the TRAILHEAD build pipeline example)

6. **Context**
   - What goes into a model's context window: system prompt + conversation history + tool results + file contents
   - Context as the agent's "working memory" — everything it can see right now
   - Context window sizes (Claude: 200K standard, 1M for Opus 4.6) and what that means in practice
   - **Context rot / degradation**: why quality drops as context fills — the model loses track of earlier instructions, contradicts itself, gets verbose and hedging
   - Fresh context as a strategy: why 11 short sessions beat one long session
   - The TRAILHEAD example: each `claude -p` call starts fresh, CLAUDE.md carries the conventions

7. **Tokens**
   - What tokens are (subword units, not characters or words)
   - Why engineers should care: tokens = cost, tokens = context window consumption, tokens = speed
   - Input tokens vs. output tokens and their different costs
   - **Token efficiency**: why concise CLAUDE.md files, focused prompts, and scoped tool calls matter
   - The cost of wasted context: reading unnecessary files, verbose instructions, unfocused conversations
   - Practical mental model: think of tokens as a budget — every token you waste on noise reduces what's available for signal

8. **Tools**
   - What tools are in the agent context: functions the model can call to interact with the world
   - Claude Code's tool set: Read, Write, Edit, Bash, Glob, Grep, and more
   - How tool use works: model decides to call a tool → tool executes → result returns to context → model continues
   - Tools as the bridge between "reasoning about code" and "actually changing code"
   - MCP (Model Context Protocol) — extending agent capabilities with custom tools
   - The `--allowedTools` pattern for headless automation

### Claude Code Specifics

9. **Claude Code running a bash shell**
   - Claude Code has a real terminal — it can run any command you can
   - Why this is powerful: install packages, run builds, execute tests, curl APIs, check git status
   - The verification gate pattern: `npx tsc --noEmit && npm run build` between features
   - How Bash tool results feed back into context — Claude sees the output and reasons about it
   - The debug loop: run app → see error → Claude reads logs → diagnoses → fixes → re-runs
   - Security model: permission levels, tool approval, sandboxing

10. **Use markdown for everything**
    - Markdown as the universal interchange format between humans and agents
    - Why markdown works: structured, readable by both humans and models, version-controllable, diffable
    - The TRAILHEAD refinement chain: every artifact was a .md file that produced the next .md file
    - CLAUDE.md, feature prompts, research docs, specs, tech stack decisions — all markdown
    - "Markdown in, software out" as an engineering principle
    - Markdown as the unit of work for agentic pipelines

### Advanced Agentic Concepts

11. **Agent coordination**
    - Single agent vs. multi-agent patterns
    - Sequential pipeline (TRAILHEAD: `claude -p` calls in sequence)
    - Parallel agents (isolated worktrees, `/batch` for independent tasks)
    - Agent Teams (experimental: peer-to-peer coordination with shared task lists)
    - The coordination overhead tradeoff: more agents = more parallelism but more complexity
    - When to use each: single agent for focused work, pipeline for features with dependencies, parallel for independent tasks

12. **Agent lifecycle**
    - Session start → context loading (CLAUDE.md, system prompt) → task execution → verification → session end
    - Fresh context vs. continued context (session resumption with `--resume`)
    - Context compaction: what happens when the window fills up
    - The headless lifecycle: `claude -p` starts fresh every time — no memory, no history, just CLAUDE.md and the filesystem
    - How agents "remember" without memory: reading the filesystem, git history, typed code patterns
    - The Core Four at each lifecycle stage: what context, model, prompt, and tools are active

13. **Agentic Software Development Lifecycle**
    - How the traditional SDLC maps to agentic engineering
    - Research phase: use AI to research (claude.ai with web search), produce markdown artifacts
    - Spec phase: write detailed specs as markdown — the agent's requirements document
    - Architecture phase: tech stack decisions, CLAUDE.md, project structure
    - Build phase: headless pipeline, verification gates, auto-commit
    - Debug phase: human-in-the-loop for real-world integration issues
    - Deploy phase: agent handles deployment commands
    - The shift: engineers become architects, reviewers, and system designers — not typists
    - The three levels from TAC: in-loop → out-of-loop (AFK) → zero-touch
    - PITER framework for productionizing agentic workflows

## What I Want From This Research

1. **Find existing presentations, slide decks, or visual explanations** of these concepts that I can reference or adapt. Look for:
   - Conference talks on agentic coding / AI-assisted development (2025-2026)
   - Published slide decks on LLM fundamentals for engineers
   - Visual diagrams of agent architectures, context windows, token economics
   - Anthropic's own educational materials on Claude Code and agent concepts
   - YouTube talks or blog posts with good visual explanations I could adapt to slides

2. **For each concept above, provide presentation-ready content:**
   - A slide title (concise, memorable)
   - 3-5 key bullet points for the slide
   - A suggested visual or diagram description (what would make this concept click visually)
   - A one-paragraph speaker note explaining what to say
   - A concrete example tied to the TRAILHEAD build where possible

3. **Suggest a narrative flow** for the full presentation:
   - How to sequence these 13 topics into a coherent 45-60 minute presentation
   - Where to insert the live TRAILHEAD demo for maximum impact
   - Which concepts can be combined onto one slide vs. need multiple slides
   - Where to use the TAC framework (7 tactics, 12 leverage points, PITER) as organizing structure
   - Transitions between concepts that build understanding progressively

4. **Identify the best visual metaphors and analogies** for explaining these concepts to software engineers who understand traditional development but are new to agentic patterns. The audience is technical — don't dumb it down, but do make abstract concepts concrete.

5. **Flag any concepts where current best practices have changed significantly in 2025-2026** — my training data may be stale on topics like agent teams, MCP adoption, context window strategies, or multi-agent coordination patterns.

Write the result as a single markdown document organized by concept, with clear sections I can directly translate into PowerPoint slides. Be specific and actionable — I need to build slides from this, not read an essay.
