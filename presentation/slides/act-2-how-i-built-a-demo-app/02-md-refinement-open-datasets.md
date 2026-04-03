# Markdown Refinement: Open Datasets

## Slide

**Title:** Step 2 — What Free Data Can I Use?

- Next link in the chain: **find 100 free APIs and datasets** that could power a demo app built with Claude Code
- One prompt: "find or create a list of 100 or so of the best open APIs or datasets that can be used to create an example application"
- Claude searched the web and came back with a categorized list — weather, geospatial, government, science, finance, and more
- This list becomes **attached context for the next prompt** — Claude uses it to pick which APIs fit the audience
- I didn't evaluate 100 APIs manually. Claude did the research, I reviewed the list

---

## Notes

### The Actual Prompt

```
find or create a list of 100 or so of the best open APIs or datasets
that can be used to create an example application that I will build
using claude code to demonstrate the power of claude code.
```

- Tool: claude.ai (Opus 4.6 Extended + Research + Web Search)
- Result saved to: `research/100-free-apis-and-datasets-every-developer-should-know.md`

### What the Research Produced

A categorized list of free APIs, including the ones that ended up in the final app:

| API | Category | Auth Required |
|-----|----------|--------------|
| Open-Meteo | Weather & forecasts | None |
| USGS Earthquake Hazards | Geospatial / Science | None |
| NASA FIRMS | Wildfire detection | Free API key |
| FBI Crime Data Explorer | Government | Free API key |
| Nominatim (OpenStreetMap) | Geocoding | None |
| Open-Meteo Astronomy | Science | None |

Plus dozens more across categories: finance (Alpha Vantage, CoinGecko), social (Reddit, Hacker News), transportation (OpenSky), space (NASA APOD, SpaceX), government (data.gov, Census), etc.

### Why This Step Matters

- The demo app needs real, working data sources — not mocked endpoints
- Free APIs with no credit card mean the demo works for anyone who clones the repo
- Having a large list gives Claude options when designing the app spec — it can match APIs to the audience
- This markdown file gets attached to the next prompt alongside the STS briefing

### The Chain So Far

```
STS Briefing (.md)  ─┐
                      ├─→  Next step: design the app spec
100 Free APIs (.md)  ─┘
```

Two research artifacts, both produced by Claude, both feeding forward as context for the next decision.
