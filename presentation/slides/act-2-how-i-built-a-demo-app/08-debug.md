# Debug: AI Gets You 0–80%, You're Still the Engineer

## Slide

**Title:** Step 8 — The Pipeline Built It. Then Reality Hit.

- The app compiled and built with zero failures — but **3 out of 6 APIs had real-world issues** when I opened the browser
- Debug method: open app → see error → **save console log to a file → tell Claude "read this log"** → Claude diagnoses and fixes
- NASA FIRMS: wrong URL format (lat/lng vs bounding box) — one prompt fix
- FBI Crime Data: wrong env var name AND wrong endpoint format — two prompts, complete rewrite
- Weather: defaulted to Celsius — one-line fix
- AI Briefing: API key had zero credits — **not a code bug at all**

---

## Notes

### The Debug Method

The debug loop was simple and repeatable:

1. Open the app in the browser
2. See something broken (empty data, error message, wrong values)
3. Open browser DevTools, copy the console log
4. Save it to `trailhead/debug-logs/` (a gitignored directory Claude created for this purpose)
5. Tell Claude Code: "read this log"
6. Claude reads the log, diagnoses the issue, and fixes the code

This is the human-in-the-loop phase — the agent built the app, but real-world API integration still needed a human who could open a browser, see what's wrong, and point the agent at the right problem.

### The Actual Prompts

**Prompt 1 (Fire + Crime + Weather):**
```
fire and crime data doesn't seem to be loading create a .gitignored
folder for me to put the console log in and I will store it there
```

Then after saving the first log:
```
fire started to work still have issue with crime and also have an
error for weather. added console log
```

**Prompt 2 (Briefing):**
```
when I clicked generate briefing on the briefing page I got an error,
failed to fetch, here is the console log:
trailhead/debug-logs/localhost-1775157251165.log
```

### Bug-by-Bug Breakdown

**NASA FIRMS (Fire Data) — Wrong URL format**
- Bug: Code used `lat,lng,radius` format in the API URL
- Reality: FIRMS expects bounding box format `west,south,east,north`
- Fix: One prompt. Claude rewrote the URL construction.
- Root cause: The model's training data had an outdated or incorrect FIRMS API pattern. Hallucination — it generated a plausible URL that wasn't correct.

**FBI Crime Data — Two separate bugs**
- Bug 1: Code read `process.env.FBI_API_KEY` but `.env.local` had `FBI_CRIME_API_KEY`
- Bug 2: Used endpoint `/estimate/state/{state}?from=YYYY&to=YYYY` which returns 404. The actual endpoint is `/summarized/state/{state}/{offense-type}?from=MM-YYYY&to=MM-YYYY`
- Fix: Two prompts. Complete rewrite of the crime API client.
- Root cause: Env var mismatch (simple typo) + hallucinated API endpoint format (the model generated a plausible endpoint that doesn't exist).

**Weather — Wrong units**
- Bug: Open-Meteo defaults to Celsius and km/h
- Fix: Added `temperature_unit=fahrenheit` and `wind_speed_unit=mph` to API params. One line.
- Root cause: Not a hallucination — the model just didn't think to specify units for a US-audience app.

**AI Briefing — Not a code bug**
- Bug: Browser showed `ERR_EMPTY_RESPONSE`. Server logs revealed: "Your credit balance is too low to access the Anthropic API."
- Fix: No code change. Bought API credits at console.anthropic.com.
- Root cause: Human forgot to fund the API key.

### Why This Matters

- **The pipeline worked perfectly** — 11 build steps, 0 compilation failures, all code TypeScript-clean
- **Real-world integration is a different problem** — APIs have quirks, env vars can mismatch, third-party formats aren't always what the model expects
- **The debug loop is fast** — save a log, point Claude at it, get a fix. Each bug took 2-5 minutes to resolve.
- **This is the "AI gets you 0-80%" lesson** — the model built 4,455 lines of working TypeScript. The human identified 4 integration issues that required domain knowledge and a browser.
- **Verification gates catch compile errors, not runtime errors** — `tsc --noEmit` proves the types are correct, not that the API URL is right. Real-world testing is still the engineer's job.
