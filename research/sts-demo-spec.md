# Federal Lands Daily Briefing Tool

**Codename: TRAILHEAD**

## Elevator Pitch

An AI-powered situational awareness tool that generates plain-language daily operational briefings for law enforcement officers stationed on federal lands. The app pulls real-time data from six free public APIs — weather, seismic activity, wildfire detections, crime statistics, and geospatial context — and uses an AI agent to synthesize everything into a single, actionable briefing tailored to a specific federal land unit. Think of it as a "morning roll call briefing" that writes itself.

## Why This App for This Audience

This demo is purpose-built for STS's world:

- **Directly mirrors their DOI mission.** STS just deployed LERMS and CAD across six DOI law enforcement programs covering ~3,000 officers and 855+ locations. This tool addresses a real adjacent need: what does an officer need to know before stepping out on patrol across remote federal lands?
- **Showcases agentic AI in their language.** STS is building products like LEI (agentic AI for officer compliance) and C-CAT (AI-automated policy review). This demo shows the same pattern — an AI agent that gathers data, reasons over it, and produces a structured output — applied to operational briefings.
- **Combines multiple data sources into one view.** STS's DEAM (Data Engineering, AI & ML) practice is about exactly this: pulling disparate data together and making it useful. The demo stitches together six APIs that an officer would otherwise have to check individually.
- **Proves the Claude Code value proposition.** The entire point of the brown bag is to show that Claude Code can produce a working, meaningful application in hours, not weeks. Building something relevant to their actual mission — not a todo app — makes that point far more powerfully.
- **Matches their culture of simplicity.** "Keep IT Simple" is their blog name. The app has one job: give an officer a clear briefing. No feature bloat, no dashboards-for-dashboards'-sake.

---

## Target User Persona

A DOI law enforcement officer (Bureau of Land Management ranger, National Park Service law enforcement ranger, U.S. Fish & Wildlife special agent, or Bureau of Indian Affairs officer) preparing for a shift on federal lands. They want to know: What happened overnight? What's the weather doing? Are there any natural hazards? What should I watch for today?

---

## Data Sources (Free APIs)

| Source | API | What It Provides | Auth |
|--------|-----|-------------------|------|
| Weather & forecasts | **Open-Meteo** | Hourly/daily forecasts, wind, precipitation, UV index, alerts | None |
| Seismic activity | **USGS Earthquake Hazards** | Real-time earthquakes by location, magnitude, and time | None |
| Wildfire detection | **NASA FIRMS** (part of NASA APIs) | Active fire/thermal hotspots detected by satellite within 24 hours | API key (free) |
| Crime context | **FBI Crime Data** | Offense and arrest statistics by state and agency | API key (free) |
| Geospatial context | **Nominatim (OpenStreetMap)** | Geocoding, reverse geocoding, and place search | None |
| Astronomy & visibility | **Open-Meteo** (astronomy extension) | Sunrise, sunset, moon phase, and visibility conditions | None |

All six sources are free, require no credit card, and have rate limits generous enough for a live demo.

---

## Features

### F1: Federal Lands Location Selector

The user selects or searches for a specific federal land unit where they are stationed. The app presents a curated list of notable federal land locations organized by managing agency (NPS, BLM, FWS, BIA, USBR, BOR). Selecting a location sets the geographic coordinates used by all downstream data queries. The user can also type a location name or address to geocode it manually. The selected location persists across sessions.

### F2: Real-Time Conditions Dashboard

After selecting a location, the app displays a single-screen summary of current conditions at that location. This includes current temperature, wind speed and direction, precipitation status, humidity, UV index, and a short plain-language weather summary. It also shows the nearest recent earthquakes (if any) within a configurable radius, active fire detections within a configurable radius from the past 24 hours, and sunrise/sunset times with current moon phase. Each data card shows the time of last refresh and the source. The dashboard auto-refreshes on a reasonable interval.

### F3: AI-Generated Daily Briefing

This is the centerpiece feature. The user taps a single button — "Generate Briefing" — and the app gathers all current data for the selected location, sends it to an AI model as structured context, and receives back a plain-language operational briefing written in the style of a law enforcement roll call briefing. The briefing includes five sections:

1. **Conditions Summary** — weather, visibility, and astronomical conditions relevant to patrol operations (e.g., early sunset, high winds, poor visibility forecast).
2. **Natural Hazard Alerts** — any seismic activity, active fires, or severe weather that could affect officer safety or public access to the area.
3. **Operational Considerations** — AI-reasoned suggestions based on the data (e.g., "High UV index expected mid-day — ensure hydration and sun protection on extended patrols" or "Three active fire detections 12 miles northwest — monitor for smoke impact on trail visibility").
4. **Crime Context Note** — a brief statistical note about the most recent available crime data for the surrounding jurisdiction, framed as general awareness.
5. **Key Times** — sunrise, sunset, golden hour, and any time-specific weather transitions worth noting.

The briefing is written in clear, professional, jargon-appropriate language — not chatbot-casual and not academic. It should read like something a competent duty officer would write.

### F4: Interactive Situational Map

A map view centered on the selected location showing the surrounding federal land boundaries (or a reasonable approximation). The map displays overlay markers for active fire detections (from NASA FIRMS), recent earthquake epicenters (from USGS), and the selected station/location pin. Each marker is tappable/clickable to reveal detail (magnitude, detection time, coordinates). The map supports zoom and pan. Weather data is not overlaid on the map but is referenced in the dashboard and briefing.

### F5: Briefing History

The app stores previously generated briefings locally so the user can review past days. Each briefing is saved with the location name, date/time of generation, and the full briefing text. The user can scroll through past briefings in reverse chronological order. This is useful for shift handoffs and pattern recognition.

### F6: Multi-Location Watch List

The user can save multiple federal land locations to a personal watch list. The watch list view shows a compact summary card for each saved location with current temperature, any active alerts (fires or earthquakes nearby), and the time since the last briefing was generated. Tapping a card navigates to that location's full dashboard. This supports officers or supervisors responsible for multiple areas.

### F7: Shareable Briefing Export

The generated briefing can be copied as formatted text or exported as a simple print-friendly view. This enables officers to paste briefings into existing communication channels (email, chat, or records management systems) without needing the app itself. No PDF generation is required — clean, copy-paste-friendly formatted text is sufficient.

---

## What This Demo Is NOT

To keep scope realistic for a 12-hour Claude Code build:

- **Not a records management system.** It does not replace LERMS/CAD. It complements them by providing pre-shift situational context.
- **Not a real-time dispatch tool.** There is no live incident feed or two-way communication.
- **Not handling sensitive or classified data.** All data sources are public. No PII, no CJIS-controlled data, no law enforcement sensitive information.
- **Not production-hardened.** No FedRAMP compliance, no ATO, no authentication beyond what's needed to demo. This is a prototype that illustrates a concept and a development methodology.
- **Not mobile-optimized to native app standards.** Responsive web is fine. A polished mobile experience is a future concern.

---

## Demo Script Talking Points

When presenting this to STS, the application itself is only half the story. The other half is *how it was built*. Suggested narrative beats:

1. **Open with the problem.** "Your officers cover 20% of U.S. landmass. Before every shift, someone needs to know: what's the weather, are there fires nearby, any seismic activity, what happened overnight? That information exists across six different government websites. Nobody checks all six."
2. **Show the app.** Walk through location selection, the conditions dashboard, and then generate a live briefing. Let the AI briefing speak for itself.
3. **Reveal the build time.** "This was built in [X] hours using Claude Code. Not a mockup — a working application pulling live data right now."
4. **Connect to their world.** "You're already building agentic AI products — C-CAT, LEI. This is the same pattern: gather structured data, apply AI reasoning, produce an actionable output. Claude Code doesn't replace your engineers. It lets them build the first working version in a day instead of a sprint."
5. **Discuss what's next.** "Imagine this connected to your LERMS incident data, your CAD dispatch feed, your CJIS-compliant data sources. The AI briefing gets smarter. That's a product conversation, not a technology barrier."

---

## Success Criteria for the Demo

The demo succeeds if:

- The audience sees a working application that is relevant to their actual mission, not a generic tech demo.
- At least one person in the room says some version of "we could use something like this" or "could it also do X?"
- The build-time revelation lands — the audience understands that Claude Code compressed weeks of work into hours.
- The conversation shifts from "what does Claude Code do" to "what could we build with it."
