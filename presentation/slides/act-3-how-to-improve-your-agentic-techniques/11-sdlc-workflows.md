# Agentic SDLC Workflows

## Slide

**Title:** From Writing Code to Directing Agents Who Write Code

- The SDLC still exists — research, spec, build, test, deploy — but **who does what changes.** You specify intent. Agents generate implementation
- **Template your engineering** — when you solve a problem with an agent, turn that prompt into a reusable template. Next time, it's a one-click solution
- One agent, one prompt, one purpose. **Don't cram everything into one session** — specialized agents with focused prompts produce better results than one overloaded generalist
- The progression: start **in-the-loop** (learn the tools) → move to **out-of-the-loop** (trust the verification) → target **zero-touch** (prompt to production)
- Start Monday: pick one repeating task, write a CLAUDE.md, add a verification gate, and **let the agent do it while you do something else**

---

## Notes

### The Agentic SDLC

Traditional SDLC phases still exist, but the human/agent roles shift:

| Phase | Traditional | Agentic |
|-------|------------|---------|
| **Research** | Human reads docs, browses web | Agent searches web, synthesizes findings into markdown |
| **Spec** | Human writes requirements | Human directs agent to write spec, reviews and refines |
| **Architecture** | Human designs system | Human defines constraints, agent proposes architecture |
| **Build** | Human writes code | Agent writes code, runs verification, auto-commits |
| **Test** | Human writes and runs tests | Agent writes tests, runs them, fixes failures |
| **Debug** | Human reads errors, fixes code | Agent reads errors, diagnoses, fixes — human handles edge cases |
| **Deploy** | Human runs deploy commands | Agent runs deploy commands, human manages credentials |
| **Review** | Human reviews PRs | Human reviews agent output — the last touch point |

The engineer's role evolves from **code producer** to **architect, reviewer, and system designer**. Your value shifts from typing to judgment.

### Template Your Engineering

When you solve a problem with an agent, you've created a recipe. Template it:

**Level 1: Save the prompt**
```markdown
# Bug Fix Template
Read the error log at {path}. Diagnose the root cause.
Fix the issue. Run `tsc --noEmit && npm run build` to verify.
```

**Level 2: Create a parameterized template**
```markdown
# New API Feature Template
Build an API route at app/api/{feature}/route.ts
Create a TanStack Query hook at hooks/use{Feature}.ts
Follow the pattern in lib/api/weather.ts
Run verification: tsc --noEmit && npm run build
```

**Level 3: Meta-prompts that generate prompts**
```markdown
Given the feature spec below, generate a build prompt that:
- Lists specific files to create
- Points to existing patterns to follow
- Includes scope control
- Includes verification commands
```

Each level increases reusability. Level 3 is where you start building the system that builds the system.

### One Agent, One Prompt, One Purpose

From the TAC framework — massive context windows lead to distracted, confused agents. The solution:

- **Dedicated agents for each workflow step** — research agent, build agent, test agent, deploy agent
- **Focused prompts** — each prompt has a single purpose, not "also fix the CSS and update the docs"
- **Free up the whiteboard** — a focused prompt leaves most of the context window available for the actual work
- **Commit and version control all prompts** — they're engineering artifacts, treat them like code

The headless pipeline pattern embodies this: each `claude -p` call is one agent, one prompt, one purpose. Feature 1 gets its own session, Feature 2 gets its own session. No cross-contamination.

### The AI Developer Workflow (ADW)

The end-state is a fully automated pipeline — the AI Developer Workflow:

```
Trigger (GitHub issue, cron, webhook)
  → Agent reads the issue/task description
  → Agent researches the codebase
  → Agent implements the solution
  → Agent runs verification gates
  → Agent opens a PR / deploys to preview
  → Human reviews (optional)
```

This is the PITER framework in production:
- **Prompt Input** — Issues, tickets, or scheduled tasks
- **Trigger** — Webhook, cron job, or GitHub Action
- **Environment** — Isolated worktree or branch for safe execution
- **Review** — PR review, automated test results, deployment preview

### Getting Started: Your First Week

**Monday:** Install Claude Code. Write your first CLAUDE.md with project conventions and a verification command.

**Tuesday:** Take a task you'd normally hand-code and try prompting Claude Code instead. Stay in-the-loop — watch what it does.

**Wednesday:** Try a headless prompt: `claude -p "$(cat your-prompt.md)"`. Review the result instead of watching the process.

**Thursday:** Identify something you do every week (update dependencies, write a test, fix a lint error) and write a reusable template for it.

**Friday:** Run the template. Review the result. If it's good, you just automated one task. Repeat next week with another one.

### Daily Actions

- Build higher-order prompts that pass plans into plans
- Create specialized templates for engineering tasks (bugs, features, refactors, chores)
- Review and refine templates based on execution outcomes
- Scale from single agent to multi-agent workflows as confidence grows
- Track your KPIs: touchpoints per task, time spent reviewing, autonomous success rate
