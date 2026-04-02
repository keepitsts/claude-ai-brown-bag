---
number: 12
type: claude-prompt
timestamp: 2026-04-02T14:52:00-04:00
summary: Discovered and removed nested .git inside trailhead/
---

# 012 — Is Trailhead a Separate Repo?

## Prompt

> is trailhead a separate repo?

Then:

> I agree it shouldn't be it's own repo, but it looks like it is

## Response

Found that `pnpm create next-app` had initialized its own `.git` directory inside `trailhead/`, making it look like a nested repo. Removed `trailhead/.git` so trailhead is just a normal subdirectory tracked by the parent repo. All trailhead files were already tracked by the parent — the nested `.git` was just leftover from scaffolding.
