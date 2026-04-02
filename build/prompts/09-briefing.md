# Step 9: AI-Generated Daily Briefing (F3) + History (F5) + Export (F7)

## What to build
The centerpiece feature: gather all data, send to Claude API, stream back a law enforcement briefing. Plus history storage and export.

## API Route (`app/api/briefing/route.ts`)
- POST handler accepting `{ locationId, locationName, lat, lng, state }` in body
- Gathers ALL data in parallel using Promise.all:
  - Weather from lib/api/weather.ts
  - Seismic from lib/api/seismic.ts
  - Fires from lib/api/fires.ts
  - Crime from lib/api/crime.ts
  - Astronomy from lib/api/astronomy.ts
- Constructs a structured prompt with all data as context
- Calls Claude API (claude-sonnet-4-20250514) with streaming enabled
- System prompt defines the 5 briefing sections:
  1. Conditions Summary
  2. Natural Hazard Alerts
  3. Operational Considerations
  4. Crime Context Note
  5. Key Times
- Stream the response back to the client using a ReadableStream
- The briefing should read like a professional law enforcement roll call briefing

## System Prompt (embed in the route handler)
```
You are an AI assistant generating a daily operational briefing for a law enforcement officer stationed at federal lands. Write in clear, professional, jargon-appropriate language — not chatbot-casual and not academic. The briefing should read like something a competent duty officer would write for roll call.

Structure the briefing with exactly these five sections:

## Conditions Summary
Weather, visibility, and astronomical conditions relevant to patrol operations.

## Natural Hazard Alerts
Any seismic activity, active fires, or severe weather that could affect officer safety or public access.

## Operational Considerations
AI-reasoned suggestions based on the data (e.g., hydration reminders for high UV, smoke monitoring for nearby fires).

## Crime Context Note
Brief statistical note about crime data for the jurisdiction, framed as general awareness.

## Key Times
Sunrise, sunset, golden hour, and any time-specific weather transitions.
```

## Briefing Page (`app/briefing/page.tsx`)
'use client' page:
- "Generate Briefing" button (prominent, primary style)
- Shows selected location name and timestamp
- Streams the briefing text with a typing effect (process the ReadableStream)
- Render briefing content using `prose` class from @tailwindcss/typography
- After generation completes, save to Zustand briefingStore (F5)
- "Copy Briefing" button using navigator.clipboard.writeText() (F7)
- "Print View" button that opens a clean print layout using window.print() (F7)
- Loading state while generating
- Error state if generation fails

## History Page (`app/history/page.tsx`)
'use client' page implementing F5:
- List all saved briefings from Zustand briefingStore
- Reverse chronological order
- Each entry shows: location name, date/time, first ~100 chars preview
- Click to expand and read full briefing
- Uses shadcn Card for each entry
- "No briefings yet" empty state

## Print Stylesheet
Add `@media print` styles that hide sidebar, nav, and buttons. Show only the briefing content.

## Patterns to follow
- See `lib/api/*.ts` for the data-gathering functions
- See `stores/briefingStore.ts` for history persistence (already built)
- For streaming: use `new Response(stream)` in the route handler and `response.body.getReader()` on the client

## Verification
Run: `npx tsc --noEmit && pnpm build`

## Scope
Briefing generation (F3), briefing history (F5), and briefing export (F7). Do not modify dashboard, map, or other features.
