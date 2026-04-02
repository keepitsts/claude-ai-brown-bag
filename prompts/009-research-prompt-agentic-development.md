---
number: 9
type: claude-prompt
timestamp: 2026-04-02T13:15:00-04:00
summary: Created standalone research prompt for Claude Code agentic rapid development best practices
---

# 009 — Create Agentic Development Research Prompt

## Prompt

> create a standalone research prompt for me and put the prompt in research/claude-code-agentic-rapid-development-best-practices-research-prompt.md
> I will copy and paste that prompt into a claude.ai/chat using Opus 4.6 Extended with Research and Web Search checked then store the result .md file in this project.
> given our tech stack and the functionality that we want to create research the current best ways to use claude code to rapidly create this functionality using spec driven development.
> I'ld prefer it if I could give the research/sts-demo-spec.md to claude code and it would just build it in one shot while I walk my dog (Milo - a cute 28lb Cavapoo - Cavalier King Charles Spaniel mixed with a Miniature Poodle). But I realize that claude code out of the box will not do that successfully, I first need to build an agentic harness/sdlc pipeline/agent teams/some-other-new-fangled-thing so that it can iteratively build out features of a certain size scope before continuing on to the next feature.
> in the prompt give context of our situation and provide a recommendation for the best way to rapidly build out this demo application.

## Response

Created `research/claude-code-agentic-rapid-development-best-practices-research-prompt.md` — a detailed standalone research prompt that:

- Describes the full situation (TRAILHEAD app, 8 hours remaining, 7 features, 6 APIs, tech stack)
- Lists all Claude Code capabilities that could be part of the solution (subagents, agent teams, skills, hooks, headless/Agent SDK, `/batch`, CLAUDE.md, plan mode)
- Asks for a survey of current state-of-the-art rapid development with Claude Code
- Requests evaluation of specific approaches (single session, headless orchestration, Agent SDK pipeline, `/batch`, agent teams, subagents)
- Asks for an opinionated recommendation with actionable implementation details
- Notes the demo angle — clean sequential git history tells a better story than parallel branch merges
- Mentions Milo the Cavapoo for good measure
