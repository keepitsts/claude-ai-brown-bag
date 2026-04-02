---
number: 15
type: claude-prompt
timestamp: 2026-04-02T15:10:00-04:00
summary: Fixed fire and crime API issues, added Fahrenheit to weather
---

# 015 — Fix Fire and Crime APIs

## Prompt

> fire and crime data doesn't seem to be loading create a .gitignored folder for me to put the console log in and I will store it there

Then (after first log):

> fire started to work still have issue with crime and also have an error for weather. added console log

## Bugs Found and Fixed

### Fire API (fixed in prompt 014's debug cycle)
- **Bug**: FIRMS API URL used `lat,lng,radius` format
- **Fix**: Changed to bounding box format `west,south,east,north` which is what FIRMS actually expects

### Crime API — env var mismatch (first fix)
- **Bug**: Code read `process.env.FBI_API_KEY` but `.env.local` has `FBI_CRIME_API_KEY`
- **Fix**: Changed to `FBI_CRIME_API_KEY`

### Crime API — wrong endpoint and date format (second fix)
- **Bug**: Used `/estimate/state/{state}?from=YYYY&to=YYYY` which returns 404
- **Fix**: Rewrote to use `/summarized/state/{state}/{offense-type}?from=MM-YYYY&to=MM-YYYY` which is the correct FBI CDE endpoint. Fetches both violent-crime and property-crime, aggregates monthly rates into annual rates.

### Weather API — Celsius instead of Fahrenheit
- **Bug**: Open-Meteo defaults to Celsius/km/h
- **Fix**: Added `temperature_unit=fahrenheit` and `wind_speed_unit=mph` to both current weather and forecast requests

### Infrastructure
- Created `trailhead/debug-logs/` directory (gitignored) for browser console log dumps

## Response

Fixed all three issues. Crime API completely rewritten to match actual FBI CDE API format. Weather now returns Fahrenheit/mph. Fire fix from previous prompt confirmed working.
