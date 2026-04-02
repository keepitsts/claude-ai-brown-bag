---
number: 11
type: claude-prompt
timestamp: 2026-04-02T14:50:00-04:00
summary: Added API keys to .env.local, asked to commit
---

# 011 — Commit and Update

## Prompt

> commit and update

## Context

Rudy added real API keys to `trailhead/.env.local` (NASA FIRMS, FBI Crime Data, Anthropic).

## Response

Nothing to commit — `trailhead/.env.local` is already excluded by `trailhead/.gitignore` (Next.js adds `.env*.local` to gitignore by default). Keys are safe and won't be pushed.
