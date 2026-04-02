import type { AstronomyData } from '@/lib/types'

const MOON_PHASES: Record<number, string> = {
  0: 'New Moon',
  1: 'Waxing Crescent',
  2: 'First Quarter',
  3: 'Waxing Gibbous',
  4: 'Full Moon',
  5: 'Waning Gibbous',
  6: 'Last Quarter',
  7: 'Waning Crescent',
}

function getMoonPhase(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let c = 0
  let e = 0
  let jd = 0
  let b = 0

  if (month < 3) {
    c = year - 1
    e = month + 12
  } else {
    c = year
    e = month
  }

  jd = Math.floor(365.25 * (c + 4716)) + Math.floor(30.6001 * (e + 1)) + day - 1524.5
  b = Math.floor((jd - 2451550.1) / 29.530588853)
  const phase = ((jd - 2451550.1) / 29.530588853 - b) * 8

  return MOON_PHASES[Math.round(phase) % 8] ?? 'Unknown'
}

export async function fetchAstronomy(lat: number, lng: number): Promise<AstronomyData> {
  const today = new Date().toISOString().split('T')[0]

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    daily: 'sunrise,sunset,daylight_duration',
    timezone: 'auto',
    start_date: today,
    end_date: today,
  })

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!res.ok) {
    throw new Error(`Astronomy API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const daily = data.daily

  const sunrise = daily.sunrise[0] as string
  const sunset = daily.sunset[0] as string
  const sunriseTime = new Date(sunrise).getTime()
  const sunsetTime = new Date(sunset).getTime()
  const solarNoonMs = sunriseTime + (sunsetTime - sunriseTime) / 2

  return {
    sunrise,
    sunset,
    solarNoon: new Date(solarNoonMs).toISOString(),
    daylightDuration: daily.daylight_duration[0],
    moonPhase: getMoonPhase(new Date()),
  }
}
