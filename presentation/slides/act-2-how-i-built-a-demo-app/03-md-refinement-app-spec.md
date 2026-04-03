# Markdown Refinement: App Spec

## Slide

**Title:** Step 3 — What Should the App Do?

- Fed both previous markdown files into the next prompt: "make an opinionated choice about what this application should do"
- Claude combined the STS briefing + API list and designed **TRAILHEAD** — a Federal Lands Daily Briefing Tool for DOI law enforcement
- 7 features, 6 free APIs, purpose-built for the audience — not a generic demo
- Key instruction: **"be technology agnostic, only focus on features, do not include any implementation details"** — keep the spec clean
- Result: a complete feature spec in markdown, ready to hand to the next step

---

## Notes

### The Actual Prompt

```markdown
I want to create an example web application using claude code that I
present in a brown bag to STS. This application should match the
complexity of what claude code can do in 12 hours of human time
(the amount of time I have to prepare for the brown bag).
**make an opinionated choice about what this application should do**
- Consider the company being presented to using this briefing:
  - simple-technology-solutions-a-pre-presentation-briefing...md
- consider the list of free apis and datasets:
  - 100-free-apis-and-datasets-every-developer-should-know.md
- be technology agnostic
  - only focus on features
  - do not include any implementation details
- write the specifications in markdown
```

- Tool: claude.ai (Opus 4.6 Extended + Research + Web Search)
- Both previous research files attached as context
- Result saved to: `research/sts-demo-spec.md`

### What Claude Designed

**TRAILHEAD — Federal Lands Daily Briefing Tool**

Claude chose this because the STS briefing revealed: DOI contract, 3,000 officers, 855+ federal land locations. A situational awareness tool maps perfectly to that audience.

**7 Features:**
- **F1:** Federal Lands Location Selector — curated list organized by agency, persists across sessions
- **F2:** Real-Time Conditions Dashboard — weather, seismic, fires, astronomy on one screen with auto-refresh
- **F3:** AI-Generated Daily Briefing — gathers all data, sends to Claude API, streams a 5-section law enforcement briefing
- **F4:** Interactive Situational Map — Leaflet map with fire/earthquake markers and station pin
- **F5:** Briefing History — localStorage persistence, reverse chronological browsing
- **F6:** Multi-Location Watch List — save multiple locations with compact alert cards
- **F7:** Shareable Briefing Export — copy-to-clipboard and print-friendly view

### Prompt Design Principles at Play

- **"Make an opinionated choice"** — forces Claude to commit to a direction instead of listing 5 options. You want a decision, not a menu.
- **"Be technology agnostic, only focus on features"** — separating *what* from *how* keeps the spec clean. Tech stack is a separate decision with its own prompt.
- **"Match the complexity of what claude code can do in 12 hours"** — gives Claude a constraint to scope against. Without this, it might design something too ambitious or too simple.
- **Attaching both previous files** — Claude can reason across them. It matched federal lands (from the STS briefing) with geospatial/weather/seismic APIs (from the API list).

### The Chain So Far

```
STS Briefing (.md)  ─┐
                      ├─→  App Spec (.md)  ─→  Next step: tech stack
100 Free APIs (.md)  ─┘
```
