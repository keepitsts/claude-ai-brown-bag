# Claude AI Brown Bag - Project Guide

## Project Overview

This repo demonstrates what can be accomplished using Claude Code. It was built entirely by Claude Code based on prompts from Rudy Zauel for a brown bag presentation to Simple Technology Solutions (STS) on Friday 4/3/2026 at Noon ET.

## Conventions

- **All actions** on this repo are performed by Claude Code
- **All prompts** given to Claude are recorded in `prompts/` with sequential numbering
- **All responses** are written to `response.md` in the project root (not the Claude Code terminal)
- Research artifacts live in `research/`
- Claude Code documentation lives in `ai-docs/`

## Prompt Capture System

Prompts are stored in `prompts/` as sequentially numbered markdown files:
- `prompts/001-*.md` — first prompt
- `prompts/002-*.md` — second prompt
- etc.

Each prompt file contains:
- The raw prompt text
- Timestamp
- Type (human-action, claude-prompt, research)
- Summary of what was accomplished

## Response Behavior

Claude Code writes responses to `response.md` in the project root instead of outputting to the terminal window. This is enforced via a settings hook.

## Tech Stack (for the demo app - TRAILHEAD)

See `research/trailhead-tech-stack.md` for full details.

## Git Workflow

- Commit after each logical unit of work
- Commit messages should be descriptive for the demo walkthrough
