---
number: 7
type: claude-prompt
timestamp: 2026-04-02T12:46:00-04:00
summary: Initial setup prompt (ai-brown-bag.md) — full repo bootstrap
---

# 007 — Initial Setup Prompt

## Prompt

The full contents of `ai-brown-bag.md` were executed as a prompt. This master prompt instructed Claude Code to:

1. Initialize Claude Code in this repo (CLAUDE.md, .claude, etc.)
2. Create GitHub repo under keepitsts
3. Design and implement a prompt capture system
4. Download latest Claude Code docs
5. Capture all pre-existing actions/research
6. Set up response.md hook and memory

## Response

All 6 tasks completed:

1. **Git & CLAUDE.md** — `git init` with `main` branch, created `CLAUDE.md` and `.gitignore`
2. **Prompt capture system** — `prompts/` directory with sequentially numbered files (001-007), each with frontmatter and description
3. **Recorded pre-existing actions** — 6 prior actions/research captured as prompt files
4. **Memory system** — 4 memory files created (user profile, response behavior, prompt recording, demo details)
5. **GitHub repo** — Created https://github.com/keepitsts/claude-ai-brown-bag (public, all 27 org members have access)
6. **Claude Code docs** — Fetched 75 markdown files from code.claude.com via `tools/ai-docs/fetch_claude_code_docs.py`

Initial commit pushed to `main`.
