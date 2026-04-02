---
number: 17
type: claude-prompt
timestamp: 2026-04-02T15:30:00-04:00
summary: Deployed TRAILHEAD to Vercel — live at trailhead-pearl.vercel.app
---

# 017 — Deploy to Vercel

## Prompt

> put credits on the anthropic api key everything is working locally. what do I need to do to deploy to the internet?

Then:

> OK, I setup an account with vercel let install the cli

Then:

> OK vercel logged in

## Response

1. Installed Vercel CLI locally (`npm install --prefix ~/.local vercel`)
2. Rudy logged in via `vercel login` (interactive)
3. Deployed with `vercel --yes` — auto-detected Next.js, set root to trailhead/
4. Added all 3 env vars: `NASA_FIRMS_MAP_KEY`, `FBI_CRIME_API_KEY`, `ANTHROPIC_API_KEY`
5. Redeployed to production with `vercel --prod --yes`

**Live URL**: https://trailhead-pearl.vercel.app
