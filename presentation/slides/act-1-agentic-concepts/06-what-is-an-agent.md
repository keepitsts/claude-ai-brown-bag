# What Is an Agent?

## Slide

**Title:** What Is an Agent?

- A model by itself is a **brain in a jar** — it can think, but it can't do anything. An agent is that brain with hands, eyes, and a terminal
- The agent loop: **think → do something → look at what happened → think again → repeat** until the job is done
- Claude Code is an agent — it reads your files, writes code, runs the build, sees the error, fixes it, and tries again. That loop is the whole game
- Every agent framework (Claude Code, Cursor, Copilot, Codex) converges on the **same 6 lines of logic** — a while loop that calls a model, checks for tool calls, runs them, and loops
- One-shot answers are guesses. **The loop is what makes it reliable** — the agent can recover from mistakes, iterate, and verify its own work

---

## Notes

### Model vs. Agent — The Core Distinction

**Model (one-shot):**
- Text in → text out → done
- A stateless function call. No memory of what happened, no ability to take action, no way to verify its output
- Like asking a colleague a question over email — you get one response, and if it's wrong, you have to write another email

**Agent (loop):**
- Model + tools + context + loop
- A running process that persists, decides, acts, observes, and iterates
- Like having that colleague sit next to you with access to your codebase, terminal, and browser — they can try things, see what happens, and keep going until it works

The distinction is not about intelligence. The same model powers both. The difference is the architecture around it.

### The Agent Loop

Every agent follows the same four-step cycle:

```
┌─→ THINK    — The model reasons about the current state
│     ↓
│   ACT      — Call a tool (read a file, run a command, write code)
│     ↓
│   OBSERVE  — Examine the tool's result (build output, error message, file contents)
│     ↓
└── REPEAT   — Loop back to THINK with the new information
         ↓
      DONE   — No more tool calls needed, return the final response
```

This is the ReAct (Reasoning + Acting) pattern. The model doesn't just reason about what to do — it actually does it, sees the result, and adjusts.

### The Canonical Agent Loop in Code

Every major agent framework converges on this same structure:

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

Six lines. That's the core of Claude Code, Cursor, Codex, LangGraph, Vercel AI SDK — all of them. Steve Kinney (Temporal) called them "the same six lines of logic wearing different costumes."

The engineering challenge isn't the loop itself — it's everything around it:
- **Context management** — what information goes into the model at each step
- **Tool design** — what actions the agent can take and how results feed back
- **Security** — what the agent is allowed to do (permission levels, sandboxing)
- **Cost control** — how many iterations to allow before stopping
- **Verification** — how to confirm the agent's work is correct

### Why Agents Beat One-Shot Calls

**Error recovery:**
- A one-shot model call that generates broken code just gives you broken code. You have to manually read the error, figure out the fix, and prompt again.
- An agent generates code, runs the build, reads the error, reasons about the fix, applies it, and runs the build again — automatically.

**Task decomposition:**
- Complex tasks rarely succeed in a single generation. The agent naturally breaks work into steps: read the existing code first, plan the approach, implement piece by piece, verify at each step.

**Self-verification:**
- The agent can run `tsc --noEmit`, `npm run build`, or a test suite and check its own work. The model's self-assessment ("I think this is correct") is unreliable. The compiler's assessment is deterministic.

**Research shows the difference:**
- The ReAct framework demonstrated 34% improvement on complex tasks compared to one-shot reasoning.
- Multi-step allows the agent to gather information it needs (reading files, checking types, inspecting errors) before committing to an implementation.

### Claude Code as an Agent — Concrete Example

When you give Claude Code a task like "add a search feature to the dashboard," here's what actually happens:

1. **THINK** — Reasons about the task. Decides it needs to understand the existing dashboard structure first.
2. **ACT** — Calls Glob to find dashboard-related files. Calls Read to examine the main dashboard component.
3. **OBSERVE** — Sees the component structure, state management pattern, existing imports.
4. **THINK** — Plans the search implementation: new component, filter logic, integration with existing state.
5. **ACT** — Calls Write to create the search component. Calls Edit to add it to the dashboard layout.
6. **OBSERVE** — Files written successfully.
7. **ACT** — Calls Bash to run `tsc --noEmit`.
8. **OBSERVE** — TypeScript error: missing type for the search prop.
9. **THINK** — Reads the error, identifies the missing type definition.
10. **ACT** — Calls Edit to add the type. Calls Bash to run `tsc --noEmit` again.
11. **OBSERVE** — Clean compilation. Calls Bash to run `npm run build`.
12. **OBSERVE** — Build passes.
13. **DONE** — Returns summary of what was built.

That's 5-6 iterations of the loop for a single feature. Each iteration gathers information or takes action that the previous iteration couldn't. A one-shot call would have to get all of that right on the first try — and it almost never would.

### Claude Code's Tool Set

The tools are what give the agent its "hands":

| Tool | What It Does | Analogy |
|------|-------------|---------|
| **Read** | Inspect file contents | Opening a file in your editor |
| **Write** | Create new files | Saving a new file |
| **Edit** | Targeted string replacements | Find-and-replace in your editor |
| **Bash** | Execute shell commands | Typing in your terminal |
| **Glob** | Find files by pattern | `find` or file explorer search |
| **Grep** | Search file contents | `grep` or IDE search |
| **Agent** | Spawn sub-agents | Delegating a subtask to a teammate |

Each tool call generates a result that feeds back into context. The model sees exactly what you would see if you ran the same command — the output of `npm run build`, the contents of a file, the list of matching files.

### The "While Loop" Mental Model

For the audience of software engineers, the simplest mental model is:

- An agent is a **while loop** that calls an LLM on each iteration
- The LLM can return either a **final answer** (break the loop) or a **tool call** (continue the loop)
- Tool calls are just function invocations — the LLM specifies the function name and arguments as JSON, the runtime executes them, and the result goes back to the LLM
- The loop continues until the LLM decides it's done or a safety limit is hit

This is familiar territory for any engineer who's built a REPL, a game loop, or an event loop. The only novel element is that the "controller" deciding what happens next is an LLM instead of hardcoded logic.
