import type { CrimeStats } from '@/lib/types'

interface FBICrimeRecord {
  data_year: number
  offense: string
  actual_count: number
  rate_per_100000?: number
}

export async function fetchCrimeStats(
  stateAbbr: string,
  years = 5
): Promise<CrimeStats[]> {
  const apiKey = process.env.FBI_API_KEY
  if (!apiKey) {
    throw new Error('FBI Crime Data API_KEY is not configured')
  }

  const currentYear = new Date().getFullYear()
  const fromYear = currentYear - years

  const res = await fetch(
    `https://api.usa.gov/crime/fbi/cde/estimate/state/${stateAbbr}?from=${fromYear}&to=${currentYear}&API_KEY=${apiKey}`
  )
  if (!res.ok) {
    throw new Error(`FBI Crime API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  if (!data.results || !Array.isArray(data.results)) {
    return []
  }

  return data.results.map((r: FBICrimeRecord) => ({
    year: r.data_year,
    offenseType: r.offense,
    count: r.actual_count,
    rate: r.rate_per_100000 ?? 0,
  }))
}
