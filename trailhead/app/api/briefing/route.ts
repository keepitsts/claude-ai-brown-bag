import { NextRequest } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { fetchCurrentWeather } from '@/lib/api/weather'
import { fetchEarthquakes } from '@/lib/api/seismic'
import { fetchFireDetections } from '@/lib/api/fires'
import { fetchCrimeStats } from '@/lib/api/crime'
import { fetchAstronomy } from '@/lib/api/astronomy'

const SYSTEM_PROMPT = `You are an AI assistant generating a daily operational briefing for a law enforcement officer stationed at federal lands. Write in clear, professional, jargon-appropriate language — not chatbot-casual and not academic. The briefing should read like something a competent duty officer would write for roll call.

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
Sunrise, sunset, golden hour, and any time-specific weather transitions.`

interface BriefingRequest {
  locationId: string
  locationName: string
  lat: number
  lng: number
  state: string
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as BriefingRequest
  const { locationName, lat, lng, state } = body

  if (!locationName || lat == null || lng == null || !state) {
    return new Response(
      JSON.stringify({ error: 'locationId, locationName, lat, lng, and state are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Gather all data in parallel
  const [weather, earthquakes, fires, crime, astronomy] = await Promise.allSettled([
    fetchCurrentWeather(lat, lng),
    fetchEarthquakes(lat, lng),
    fetchFireDetections(lat, lng),
    fetchCrimeStats(state),
    fetchAstronomy(lat, lng),
  ])

  const weatherData = weather.status === 'fulfilled' ? weather.value : null
  const earthquakeData = earthquakes.status === 'fulfilled' ? earthquakes.value : []
  const fireData = fires.status === 'fulfilled' ? fires.value : []
  const crimeData = crime.status === 'fulfilled' ? crime.value : []
  const astronomyData = astronomy.status === 'fulfilled' ? astronomy.value : null

  const userPrompt = `Generate a daily operational briefing for **${locationName}** (${state}) at coordinates ${lat}, ${lng}.

Today's date: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}

## Current Weather Data
${weatherData ? JSON.stringify(weatherData, null, 2) : 'Weather data unavailable.'}

## Seismic Activity (past 30 days, within 250 km)
${earthquakeData.length > 0 ? JSON.stringify(earthquakeData.slice(0, 10), null, 2) : 'No significant seismic activity detected.'}

## Active Fire Detections (within 100 km, past 24 hours)
${fireData.length > 0 ? `${fireData.length} detection(s):\n${JSON.stringify(fireData.slice(0, 10), null, 2)}` : 'No active fire detections.'}

## Crime Statistics (state-level, recent years)
${crimeData.length > 0 ? JSON.stringify(crimeData.slice(0, 20), null, 2) : 'Crime data unavailable.'}

## Astronomy Data
${astronomyData ? JSON.stringify(astronomyData, null, 2) : 'Astronomy data unavailable.'}`

  const client = new Anthropic()

  const stream = client.messages.stream({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const readableStream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
        controller.close()
      } catch (error) {
        console.error('Briefing stream error:', error)
        controller.error(error)
      }
    },
  })

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}
