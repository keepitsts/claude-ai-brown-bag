# Always Add Feedback Loops

## Slide

**Title:** Claude Makes Mistakes — Make It Find Them Before You Do

- Your work is useless unless it's tested. **Add validation to every agentic prompt** — don't just say "build the feature," say "build the feature and verify it compiles"
- The magic of agents: they can **write code, test it, see the failure, and fix it** — all in one loop, without you lifting a finger
- Stack your feedback loops: **type checker → build → lint → tests → runtime check**. Each layer catches what the previous one missed
- The more feedback loops you add, the **less you need to review** — this is what moves you from in-the-loop to out-of-the-loop
- Spending compute on testing increases your confidence. **A $0.50 test run is cheaper than 30 minutes of your review time**

---

## Notes

### The Closed-Loop Prompt Pattern

The most important prompt design pattern: **request → validate → resolve**

**Open-loop prompt (bad):**
```
Build the seismic data feature with a USGS API route and dashboard card.
```

**Closed-loop prompt (good):**
```
Build the seismic data feature with a USGS API route and dashboard card.

After implementation:
1. Run `npx tsc --noEmit` — fix any type errors
2. Run `npm run build` — fix any build errors
3. Verify the API route returns valid JSON: `curl localhost:3000/api/seismic`
```

The difference: the open-loop prompt trusts the agent's self-assessment ("I think this is correct"). The closed-loop prompt forces the agent to prove it with deterministic tools.

### Stacking Feedback Loops

Each feedback loop catches a different category of error:

| Layer | Tool | What It Catches | Speed |
|-------|------|----------------|-------|
| 1. Types | `tsc --noEmit` | Wrong types, missing imports, shape mismatches | < 1 second |
| 2. Build | `npm run build` | SSR issues, bundling errors, missing modules | 5-15 seconds |
| 3. Lint | `eslint .` | Style violations, unused vars, potential bugs | 2-5 seconds |
| 4. Tests | `npm test` | Logic errors, regression bugs, wrong behavior | 10-60 seconds |
| 5. Runtime | `curl` / browser | API format issues, wrong data, integration bugs | Manual |

Layers 1-4 can all be automated in the agent's loop. Layer 5 requires a human (or a browser automation tool like Playwright MCP).

**The key insight:** each layer is cheap. Running all four automated layers costs maybe 30 seconds and a few cents of compute. Skipping them and relying on human review costs 15-30 minutes of your time.

### How Feedback Loops Enable Autonomy

The relationship between feedback loops and autonomy:

```
No feedback loops    → You must review every line          → In-the-loop
Type checker only    → You review for logic, not syntax    → Partially out
Types + build + lint → You review for design, not errors   → Mostly out
Types + build + tests → You review for intent, not correctness → Out-of-the-loop
Full CI/CD pipeline  → You review PRs, not code            → Approaching zero-touch
```

Every feedback loop you add is a category of errors you no longer need to check manually. This is the mechanism that moves you up the autonomy ladder.

### The Economics of Agent Testing

```
Scenario A: No feedback loops
  - Agent generates feature
  - You review 200 lines of code manually: 20-30 minutes
  - You find 3 bugs, describe them to the agent
  - Agent fixes, you review again: 10 minutes
  - Total: 30-40 minutes of your time

Scenario B: Full feedback loops
  - Agent generates feature
  - Agent runs tsc: catches 2 type errors, fixes them
  - Agent runs build: catches 1 SSR issue, fixes it
  - Agent runs tests: all pass
  - You review the committed code: 5 minutes (confidence is high)
  - Total: 5 minutes of your time + $0.50 compute
```

The agent spent an extra 2-3 iterations and maybe $0.50 in tokens to run those feedback loops. You saved 25-35 minutes. That tradeoff gets better every single time.

### Building Feedback Loops into CLAUDE.md

Add verification commands directly to CLAUDE.md so the agent runs them automatically:

```markdown
## Verification (run after every feature)
npx tsc --noEmit && npm run build

## Testing (run after logic changes)
npm test

## Linting (run before committing)
eslint . --fix
```

When verification is in CLAUDE.md, the agent treats it as a convention — it will run these commands as part of its workflow without being asked in every prompt.

### Daily Actions

- Add validation commands to every agentic prompt — never just "build it," always "build it and verify"
- Create closed-loop prompts: request, validate, resolve
- Set up end-to-end tests for high-ROI agent self-validation
- Put verification commands in CLAUDE.md so they run automatically
- Chain feedback mechanisms: types → build → lint → tests
- Accept that spending compute on testing is an investment in your time
