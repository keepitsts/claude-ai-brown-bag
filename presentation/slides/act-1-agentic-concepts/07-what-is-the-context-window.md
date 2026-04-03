# What Is the Context Window?

## Slide

**Title:** What Is the Context Window?

- The model's **whiteboard** — everything it can see right now. System prompt, your files, the conversation, its own answers, all sharing one fixed-size surface
- When the whiteboard fills up, **it starts erasing the middle**. Research shows accuracy drops below 50% in bloated contexts — a cluttered whiteboard is worse than a big one
- **~120K tokens is your danger zone.** Once you cross that threshold, start thinking about compacting, clearing, or starting a fresh agent — don't wait until quality visibly degrades
- **`/compact` is Claude's built-in eraser** — it summarizes older conversation to free up space. Handy, but it's a lossy summary — sometimes Claude loses the plot after a compact and forgets what it was doing
- **Fresh whiteboard = fresh attention.** Starting a new session resets everything. 11 short focused sessions beat one long degrading marathon. When in doubt, start fresh instead of compacting
- **New task? New agent.** When you shift to a different problem, clear the whiteboard and start fresh — don't let leftover context from the last task pollute the next one

---

## Notes

### What's Actually on the Whiteboard

The context window holds everything the model can "see" at inference time. It all competes for the same fixed space:

```
Context Window (e.g., 1M tokens for Sonnet/Opus)
├── System prompt         ~1,000 tokens   (Claude Code's built-in instructions)
├── CLAUDE.md             ~1,000-3,000    (your project conventions)
├── Tool definitions      ~3,000          (Read, Write, Edit, Bash, etc.)
├── Conversation history  grows over time (every message back and forth)
├── Tool results          grows over time (file contents, build output, grep results)
├── Model's own output    grows over time (every response it's generated)
└── Remaining capacity    shrinks over time
```

Early in a session, most of the whiteboard is empty — the model has maximum room to work. As the conversation continues, history and tool results accumulate, and the remaining capacity shrinks.

### The ~120K Token Threshold

The models technically support massive context windows (200K–1M tokens), but the usable sweet spot is much smaller. Around **~120K tokens**, you should start actively managing context:

- **Below 120K** — The model is generally sharp. Attention is focused, instructions are followed well, code quality is consistent.
- **120K–200K** — Degradation starts creeping in. The model may miss conventions, repeat itself, or lose track of earlier context. This is your signal to compact, clear, or start fresh.
- **Above 200K** — Quality drops noticeably even on models that support 1M. The "Lost in the Middle" effect is in full force. You're fighting the architecture instead of using it.

**How fast do you hit 120K?**
- A single large file read: 5–10K tokens
- A verbose conversation with 20 back-and-forth turns: 50–100K tokens
- Tool results (build output, grep results, file contents) accumulate fast
- The model's own responses are often the biggest consumer — output is verbose
- A focused coding session can hit 120K in 30–60 minutes of active work

**What to do when you're approaching the threshold:**
1. **Compact** — Use `/compact` in Claude Code to summarize older conversation
2. **Clear** — Use `/clear` to reset the conversation entirely
3. **Start fresh** — Open a new session. CLAUDE.md reloads, the filesystem persists, nothing is lost
4. **Isolate** — Delegate subtasks to subagents that get their own clean context

The key insight: don't wait until you *notice* quality dropping. By the time you notice, you've already wasted several turns of degraded output. Treat 120K as a proactive checkpoint, not a reactive alarm.

### Context Degradation: Why It Happens

**The "Lost in the Middle" Problem:**
- Research by Liu et al. (2023) tested 12 language models on information retrieval tasks at various context lengths
- At 32K tokens, 11 of 12 models dropped below 50% of their short-context performance
- Models reliably process the **beginning** (system prompt, CLAUDE.md) and the **end** (recent messages) but struggle with the **middle** (older conversation, earlier tool results)
- This is why critical instructions belong in CLAUDE.md (loaded at the start) or in the current prompt (at the end) — not buried in conversation history

**Quadratic Attention Cost:**
- The transformer attention mechanism has O(n²) complexity with respect to context length
- Every token added doesn't just take up space — it requires every other token to attend to it
- At 100K tokens, adding 1K more tokens creates 100 million new attention computations
- This isn't just a performance cost — it dilutes the model's attention across more information, making it harder to focus on what matters

**Symptoms of Context Degradation:**
- The model starts contradicting earlier decisions
- It forgets conventions established in CLAUDE.md
- Responses become verbose and hedging ("I think maybe we could consider...")
- It re-reads files it already read earlier in the session
- Code quality drops — more bugs, less consistency with established patterns

### Fresh Context as a Strategy

Starting a new session (`claude -p` or a new conversation) resets the context window completely:

- **What's preserved:** Files on disk, git history, CLAUDE.md — the filesystem is the persistent memory
- **What's lost:** Conversation history, previous reasoning, tool results from earlier turns
- **What's gained:** Full attention capacity, no degradation, clean whiteboard

This is counterintuitive — it feels wasteful to "forget" previous work. But the model doesn't need to remember building Feature 1 to build Feature 2. It just needs to read the code Feature 1 left behind on disk. The filesystem is the memory; the context window is the working scratch space.

### New Task, New Agent — Clear the Whiteboard Between Concepts

The most common mistake is treating one agent session as a general-purpose workhorse for an entire workday. Context left over from debugging a CSS issue will pollute the agent's attention when you pivot to designing an API schema.

**The rule: when you change what you're thinking about, start a fresh agent.**

- Finished debugging? Start a new session before implementing the next feature.
- Done with research? Start a new session to begin coding.
- Switching from frontend to backend work? Fresh session.
- About to do something complex? Don't fight through a degraded whiteboard — restart.

**In practice:**
- In Claude Code interactive: use `/clear` to reset the conversation, or close and reopen
- In headless mode: each `claude -p` call is already a fresh session by design
- In claude.ai: start a new chat instead of continuing a long thread

**Why this works:**
- CLAUDE.md reloads automatically on every fresh session — your conventions carry forward
- The codebase is on disk — the agent re-reads what it needs from the filesystem
- Git history preserves everything — no work is lost by resetting context
- The only thing you "lose" is conversation history, and that's usually noise by the time you're changing topics

**The analogy:** You wouldn't keep yesterday's meeting notes on the whiteboard when starting today's design session. You'd erase the board and start clean. Same principle.

### The Four Context Management Strategies

From Anthropic's "Effective Context Engineering for AI Agents" (Sep 2025):

**1. Write — Externalize to persistent storage**
- Save intermediate results to files instead of keeping them in context
- Use scratchpads, todo lists, or summary files that the agent can read back later
- Example: Agent writes a plan to `plan.md`, then reads it back in a fresh session

**2. Select — Only load what's relevant**
- Use targeted file reads (Grep for a pattern) instead of reading entire files
- Search for specific functions instead of loading whole codebases
- Example: `Grep("handleSubmit")` instead of `Read("src/app.tsx")` when you only need one function

**3. Compact — Summarize older context**
- Claude Code's automatic context compaction summarizes older conversation when the window fills
- Older messages get condensed while recent messages retain full detail
- This happens automatically but still degrades quality vs. a fresh session

**4. Isolate — Give subtasks their own context**
- Spawn subagents (via the Agent tool) that get their own clean context window
- The subagent does focused work and returns a concise result to the parent
- Example: Main agent delegates "find all files that import UserContext" to a Haiku subagent — the search results fill the subagent's context, not the parent's

### The Computer Architecture Analogy

For a software engineering audience, the most intuitive mental model:

| Computer Component | LLM Equivalent |
|-------------------|----------------|
| CPU | The model itself (reasoning engine) |
| RAM | Context window (working memory — fast, limited, volatile) |
| Hard drive | Training data / parametric knowledge (large, slow, persistent) |
| I/O ports | Tools (Read, Write, Bash — how the model interacts with the world) |
| Swap space | Context compaction (when RAM fills, older data gets compacted) |

Just like a computer slows down when RAM is full and starts swapping to disk, a model degrades when context is full and starts compacting older conversation. The solution is the same: manage your memory carefully, and restart when things get sluggish.
