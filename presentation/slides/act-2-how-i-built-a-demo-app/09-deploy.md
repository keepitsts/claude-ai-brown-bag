# Deploy: From Localhost to the Internet

## Slide

**Title:** Step 9 — Ship It

- Everything working locally. Asked Claude: **"what do I need to do to deploy to the internet?"**
- Claude walked me through Vercel: install CLI, login, deploy — **three commands**
- Added environment variables for the 3 APIs that need keys (NASA FIRMS, FBI Crime, Anthropic)
- Production deploy: `vercel --prod --yes` — auto-detected Next.js, set root directory, built and deployed
- **Live URL: trailhead-pearl.vercel.app** — from idea to deployed app in one afternoon

---

## Notes

### The Actual Prompts

**Prompt 1:**
```
put credits on the anthropic api key everything is working locally.
what do I need to do to deploy to the internet?
```

**Prompt 2 (after setting up Vercel account):**
```
OK, I setup an account with vercel let install the cli
```

**Prompt 3 (after logging in):**
```
OK vercel logged in
```

### The Deploy Sequence

1. Installed Vercel CLI locally (`npm install --prefix ~/.local vercel`)
2. Rudy logged in via `vercel login` (interactive — this was a human step)
3. First deploy with `vercel --yes` — auto-detected Next.js, set root to `trailhead/`
4. Added 3 environment variables via Vercel dashboard:
   - `NASA_FIRMS_MAP_KEY`
   - `FBI_CRIME_API_KEY`
   - `ANTHROPIC_API_KEY`
5. Production deploy with `vercel --prod --yes`

### What the Deploy Reveals

- **Claude Code handled the deployment commands** — it knows Vercel's CLI, knows how to set the root directory for a monorepo, knows the flags
- **Interactive steps are still human** — `vercel login` requires a browser OAuth flow. Claude can tell you to do it, but can't do it for you
- **Environment variables are a human responsibility** — API keys and secrets shouldn't be in the repo or in prompts. The engineer manages credentials.
- **Zero-config for Next.js on Vercel** — the tech stack decision (Step 4) paid off here. No Dockerfile, no nginx config, no build scripts. `vercel --prod` just works.

### The Full Timeline

| Time | Step | Tool |
|------|------|------|
| 10:30 AM | Research: STS briefing | claude.ai |
| 10:45 AM | Research: 100 free APIs | claude.ai |
| 11:30 AM | Research: App spec (TRAILHEAD) | claude.ai |
| 12:00 PM | Research: Tech stack | claude.ai |
| 12:46 PM | Repo setup: ai-brown-bag.md | Claude Code |
| 1:15 PM | Research: Build strategy | claude.ai |
| 1:45 PM | Build: 11 features, 0 failures | Claude Code (headless) |
| 3:05 PM | Run app, start debugging | Claude Code |
| 3:10 PM | Fix fire + crime + weather APIs | Claude Code |
| 3:20 PM | Fix briefing (buy API credits) | Human |
| 3:30 PM | Deploy to Vercel | Claude Code + Human |

**Total elapsed time: ~5 hours**
**Human lines of code written: 0**
**Markdown files in the refinement chain: 6**

### Final Stats

| Metric | Value |
|--------|-------|
| Lines of TypeScript | 4,455 |
| Source files | 58 |
| Git commits | 20 |
| Build steps | 11 |
| Build failures | 0 |
| API debug fixes | 4 |
| Deploy commands | 3 |
| Live URL | trailhead-pearl.vercel.app |
