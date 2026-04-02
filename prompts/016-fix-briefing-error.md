---
number: 16
type: claude-prompt
timestamp: 2026-04-02T15:20:00-04:00
summary: Debugged briefing API error — Anthropic API key has no credits
---

# 016 — Fix Briefing Error

## Prompt

> when I clicked generate briefing on the briefing page I got an error, failed to fetch, here is the console log: trailhead/debug-logs/localhost-1775157251165.log

## Bug Found

Browser showed `ERR_EMPTY_RESPONSE` from POST /api/briefing. Server logs revealed:

```
Briefing stream error: Error: 400 {"type":"error","error":{"type":"invalid_request_error",
"message":"Your credit balance is too low to access the Anthropic API.
Please go to Plans & Billing to upgrade or purchase credits."}}
```

The briefing route code is working correctly — it gathered all data sources and called Claude. The API key just needs credits.

Also noted: dev server still running old fire API code (pre-fix). Needs restart.

## Response

No code fix needed. Rudy needs to:
1. Add credits to Anthropic API account at console.anthropic.com
2. Restart dev server to pick up all code fixes
