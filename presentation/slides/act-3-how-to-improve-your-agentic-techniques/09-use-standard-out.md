# Use Standard Out

## Slide

**Title:** Have Claude Run Your Tools, Not You

- Claude Code has a real terminal — it can run **any command you can**: builds, tests, linters, curl, git, database queries. Stop copying output and pasting it back in
- When the agent runs `npm run build` and gets an error, **the error goes straight into the whiteboard** — the agent reads it and fixes it in the same loop. No human middleman
- The verification gate pattern: `tsc --noEmit && npm run build` after every change. **The compiler is the agent's spell-checker** — deterministic, instant, and always right
- **Don't describe the error to Claude — make Claude see the error itself.** "Run the tests" beats "here's what the test output said" every time
- If you're running a command, reading the output, and then telling Claude what happened — **you're doing the agent's job for it**

---

## Notes

### Standard Out as a Leverage Point

Standard out (stdout/stderr) is one of the 12 leverage points of agentic coding. It's the bridge between the agent's probabilistic reasoning and the deterministic reality of your tools.

When the agent runs a command via the Bash tool:
1. The command executes in a real shell
2. The output (stdout and stderr) returns to the agent's context
3. The agent reads the output and reasons about what happened
4. Based on the result, it decides what to do next

This creates a tight feedback loop that doesn't require human involvement. The agent writes code, runs the build, reads the errors, fixes them, and runs again — all within a single session.

### Commands the Agent Should Be Running

| Command | What It Tells the Agent |
|---------|------------------------|
| `tsc --noEmit` | Type errors with exact file, line, and expected type |
| `npm run build` | Build failures, missing imports, SSR issues |
| `npm test` | Test failures with assertion details |
| `eslint .` | Style violations and potential bugs |
| `git status` | What's changed, what's staged, what's untracked |
| `git diff` | Exact changes made — the agent can review its own work |
| `curl localhost:3000/api/weather` | API response shape — does the route work? |
| `cat debug-logs/error.log` | Runtime errors from the running application |

### The Anti-Pattern: Human as Clipboard

A common anti-pattern in early agentic adoption:

```
Human: runs `npm run build`
Human: sees error "Module not found: @/components/WeatherCard"
Human: types to Claude "I got an error about WeatherCard module not found"
Claude: "Try importing from the correct path..."
```

What should happen:

```
Human: "Run the build"
Claude: [runs `npm run build`]
Claude: [reads error: Module not found: @/components/WeatherCard]
Claude: [checks the actual file location with Glob]
Claude: [fixes the import path]
Claude: [runs build again — passes]
```

In the first version, the human is the clipboard between the terminal and the agent. In the second version, the agent handles the entire loop. The human initiated the task and reviewed the result — everything in between was the agent's job.

### The Verification Gate Pattern

The most important use of standard out is the verification gate:

```bash
# After every code change:
npx tsc --noEmit    # Does it type-check?
npm run build       # Does it build?
npm test            # Do tests pass?
```

**Why this matters:**
- The model is probabilistic — it can generate code that "looks right" but has type errors
- The compiler is deterministic — it catches every type error in under a second
- When the agent runs both, it gets instant, reliable feedback on its own work
- This is the "deterministic check on probabilistic output" principle

**The key insight from TAC:** "AI agents are probabilistic systems making deterministic claims. An agent can conclude its code is correct — while `tsc` catches three type errors in under a second."

### Making Logs Visible to the Agent

Sometimes the agent can't run the app itself (browser-based errors, UI issues). In these cases, bring the output to the agent:

- **Console logs:** Save browser console output to a file, tell the agent to read it
- **Server logs:** Point the agent at log files in the project
- **Screenshots:** Claude Code can read images — take a screenshot of the error and show it
- **Debug directories:** Create a gitignored `debug-logs/` directory for dumping runtime output

The principle: whatever you can see, make the agent see it too. The less you're the middleman between the error and the fixer, the faster the loop runs.

### Daily Actions

- Let the agent run builds, tests, and linters — don't run them yourself and report the results
- Add verification commands to CLAUDE.md so the agent knows to run them automatically
- Create a debug-logs directory for browser/runtime output the agent can't see directly
- When you catch yourself copying terminal output into a prompt, stop — let the agent run the command itself
- Think of every command-line tool as a potential feedback loop for the agent
