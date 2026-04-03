# Markdown Refinement: Know Your Audience

## Slide

**Title:** Step 1 — Who Am I Presenting To?

- Before writing a line of code, I needed to understand my audience — **have Claude research the company first**
- One prompt into claude.ai with web search: "write a summary about this company, I'm presenting a brown bag and want context about the people I'll be presenting to"
- Result: a markdown briefing on STS — $60M DOI contract, 3,000 officers, 855+ locations, AI products (C-CAT, LEI, A3), "Keep IT Simple" culture
- This briefing **becomes the input to the next step** — it's how Claude knows what kind of demo app to build
- Total time: ~5 minutes of prompting, zero manual research

---

## Notes

### The Actual Prompt

```
write a summary about this company, Simple Technology Solutions Inc.,
I'm presenting a brown bag to the company and want to have context
about the people I'll be presenting to. https://www.simpletechnology.io/
```

- Tool: claude.ai (Opus 4.6 Extended + Research + Web Search)
- Claude browsed the STS website, read about the company, and produced a structured briefing
- Result saved to: `research/simple-technology-solutions-a-pre-presentation-briefing-on-federal-it-and-ai-capabilities.md`

### What the Research Produced

Key facts Claude surfaced that shaped everything downstream:

- **STS is a federal IT and AI company** — not a startup, not consumer tech. The audience cares about mission, compliance, and operational reliability.
- **$60M DOI contract** — Department of the Interior, law enforcement focus. 3,000+ officers across 855+ locations on federal lands.
- **Existing AI products** — C-CAT (case analysis), LEI (law enforcement intelligence), A3 (AI accelerator). The audience already understands AI has practical applications.
- **Culture: "Keep IT Simple"** — practical, mission-first engineering. The demo should be useful, not flashy.

### Why This Step Matters

- Without this briefing, Claude would have suggested a generic demo app (todo list, weather widget, chat app)
- With this briefing, Claude could reason about what would resonate: federal lands, law enforcement operations, real-time situational awareness
- The briefing is a markdown file in the repo — it feeds directly into the next prompt as attached context
- This is the refinement chain in action: research artifact → input to next step

### Prompt Design Principles at Play

- **Give Claude a URL** — let it do the reading, not you
- **State your purpose** — "I'm presenting a brown bag" tells Claude what kind of summary to write
- **Save the result as markdown** — it becomes a reusable, committable artifact
