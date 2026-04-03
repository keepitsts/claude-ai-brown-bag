# Get Out of the Loop

## Slide

**Title:** Your Goal: Get Out of the Loop

- Three levels of agentic coding: **In-the-loop** (you prompt, review every step) → **Out-of-the-loop** (agent works autonomously, you review at the end) → **Zero-touch** (prompt to production, your review becomes the bottleneck)
- Your KPI: **how many touchpoints does a task need?** In-the-loop = many. Out-of-the-loop = two (prompt + review). Zero-touch = one (prompt only)
- Moving up the ladder requires **trust, and trust requires verification** — you can't skip the loop until verification gates prove the agent is reliable
- Every tactic in this presentation is designed to **push you toward out-of-the-loop** — better CLAUDE.md, consistent architecture, verification gates, feedback loops
- Start by identifying one repeating task you do every week and ask: **what would it take to make the agent do this without me watching?**

---

## Notes

### The Three Levels of Agentic Coding

**Level 1: In-the-Loop**
- You prompt the agent, watch it work, approve or correct each step
- Every tool call gets your review. Every file write needs your OK.
- This is where everyone starts. It builds understanding and trust.
- Touchpoints per task: many (5-20+)
- Analogy: pair programming where you're the driver and the AI is the navigator — except you keep switching seats

**Level 2: Out-of-the-Loop (AFK)**
- You write a prompt, kick off the agent, and walk away
- The agent works autonomously: reads code, writes code, runs builds, fixes errors, commits
- You come back and review the result — not the process
- Touchpoints per task: two (prompt + review)
- Analogy: delegating to a competent junior — you give clear instructions, they execute, you review the PR
- This is the TRAILHEAD model: `claude -p` with a feature spec, verification gates, auto-commit

**Level 3: Zero-Touch**
- A trigger (GitHub issue, scheduled job, webhook) launches the agent
- The agent completes the task end-to-end and opens a PR or deploys
- Human review becomes optional — the verification gates are trusted enough
- Touchpoints per task: one (prompt only) or zero (trigger-based)
- Analogy: CI/CD for AI — just as you stopped manually deploying, you stop manually prompting
- This is the PITER framework: Prompt Input → Trigger → Environment → Review

### The PITER Framework for Out-of-the-Loop Agents

Moving from in-the-loop to out-of-the-loop requires four things:

**Pi — Prompt Input**
- Where the work request comes from: GitHub issues, JIRA tickets, Slack messages, scheduled triggers
- The prompt must be complete enough for the agent to work without follow-up questions

**T — Trigger**
- What launches the agent: webhook on issue creation, cron schedule, manual dispatch
- Claude Code supports scheduled tasks, GitHub Actions integration, and API-triggered runs

**E — Environment**
- Where the agent runs: isolated git worktree, dedicated branch, sandboxed container
- Must be safe for unsupervised execution — can't accidentally push to main or delete production data

**R — Review**
- How you validate the output: PR review, test results, deployment preview
- This is the last human touchpoint — and the goal is to make it so reliable that even this becomes lightweight

### Measuring Progress: Agentic Coding KPIs

| KPI | In-the-Loop | Out-of-the-Loop | Zero-Touch |
|-----|------------|----------------|------------|
| Touchpoints per task | 5-20+ | 2 | 0-1 |
| Human time per feature | Hours | Minutes (prompt + review) | Seconds (glance at PR) |
| Agent autonomy | Low | High | Full |
| Trust requirement | Low | Medium | High |
| Verification investment | Manual review | Automated gates | Automated gates + tests |

### How to Move Up the Ladder

**From in-the-loop to out-of-the-loop:**
1. Write a complete CLAUDE.md with conventions and verification commands
2. Create detailed feature specs with "patterns to follow" and scope control
3. Add verification gates (`tsc --noEmit && npm run build`) after every step
4. Try `claude -p` with a feature prompt and review the result instead of watching the process
5. If the result is good, you're out of the loop for that type of task

**From out-of-the-loop to zero-touch:**
1. Template your prompts — turn one-off specs into reusable meta-prompts
2. Set up triggers — GitHub issues, cron jobs, webhooks that launch agents
3. Invest in tests — the agent needs automated validation, not human eyes
4. Build confidence incrementally — start with low-risk tasks (docs, tests, refactors) before high-risk ones (features, deployments)

### Daily Actions

- Identify one repeating task and try to move it one level up the ladder
- Track your touchpoints — how many times did you intervene on the last task?
- Invest in verification gates — they're the bridge between "I need to watch" and "I can walk away"
- Use the PITER framework to design your first out-of-the-loop workflow
- Accept that the goal isn't to eliminate humans — it's to eliminate busywork so you focus on judgment
