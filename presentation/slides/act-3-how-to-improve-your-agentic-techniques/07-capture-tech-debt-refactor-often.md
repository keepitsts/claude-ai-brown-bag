# Capture Tech Debt, Refactor Often

## Slide

**Title:** Capture Tech Debt, Refactor Often

- Every time the agent produces something that "works but isn't right," **capture it** — don't just move on. Tech debt compounds faster when agents generate at scale
- Agents are **cheap refactoring machines** — what used to be a half-day chore is now a prompt. "Refactor all API routes to use the new error handling pattern" takes minutes
- Keep a running list: `TODO.md`, GitHub issues, inline `// TODO:` comments — give the agent a backlog it can work through
- **Refactoring improves future agent output** — every inconsistency you fix is one fewer bad pattern the agent might copy
- Schedule refactoring like you schedule features. **An hour of agent-driven refactoring per week** keeps the codebase clean and the agent effective

---

## Notes

### Why Tech Debt Matters More in Agentic Codebases

In traditional development, tech debt slows down humans — but humans can work around it with tribal knowledge. In agentic development, tech debt actively degrades agent output:

- **Agents copy what they see.** If three API routes use different error handling patterns, the agent picks one — maybe the worst one.
- **Inconsistency confuses "patterns to follow" instructions.** If you say "see weather.ts for the pattern" but weather.ts uses a deprecated approach, the agent propagates that debt.
- **Agents generate at scale.** A human might write one bad pattern. An agent told to build 7 features from that pattern produces 7 copies of the debt.

The cost of tech debt is no longer just "slower development" — it's "worse agent output across the entire codebase."

### Agents as Refactoring Machines

The economics of refactoring have fundamentally changed:

**Before agents:**
- "Rename all instances of `userId` to `accountId` across 40 files" = half a day of tedious find-and-replace with manual verification
- "Migrate all API routes from Express to Next.js route handlers" = multi-day effort
- Result: refactoring gets deferred, debt accumulates

**With agents:**
- "Rename all instances of `userId` to `accountId` across the codebase, update all types, tests, and imports" = one prompt, 5 minutes
- "Refactor all API routes to use the new error handling pattern from lib/api/weather.ts" = one prompt, 15 minutes
- Result: refactoring is cheap enough to do continuously

### How to Capture Debt for Agents

**`TODO.md` in the project root:**
```markdown
# Tech Debt Backlog
- [ ] Migrate crime API route to new error handling pattern
- [ ] Extract location selector into shared component
- [ ] Add TypeScript strict null checks to legacy modules
- [ ] Standardize date formatting across all API responses
```

The agent can read this file and work through items. Each item is a self-contained prompt.

**Inline `// TODO:` comments:**
```typescript
// TODO: This uses the old error handling pattern — refactor to match weather.ts
```

The agent finds these with Grep and can fix them systematically.

**GitHub Issues:**
- Label issues with `tech-debt` or `refactor`
- Include enough context that the agent can pick up the issue and work on it
- This is the beginning of the PITER framework — issues as prompt input

### The Refactoring Cadence

- **After every feature:** Quick pass — did the agent introduce any inconsistencies? Fix them now before the next feature copies them.
- **Weekly:** Dedicated refactoring session. Give the agent the TODO.md backlog and let it work through items.
- **Before major features:** Clean up the area of the codebase the new feature will touch. The agent's output quality depends on what it reads.

### Daily Actions

- Maintain a running tech debt backlog (TODO.md, issues, or inline comments)
- After each agent session, review for patterns that "work but aren't right"
- Use the agent for refactoring — it's fast and cheap, there's no excuse to defer
- Treat refactoring as improving the agent's pattern library, not just cleaning up code
- Fix inconsistencies before they multiply — one bad pattern becomes seven if you wait
