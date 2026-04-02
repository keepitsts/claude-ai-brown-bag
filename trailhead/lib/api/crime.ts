import type { CrimeStats } from '@/lib/types'

interface FBISummarizedResponse {
  offenses: {
    rates: {
      [stateName: string]: {
        [monthYear: string]: number
      }
    }
  }
}

export async function fetchCrimeStats(
  stateAbbr: string
): Promise<CrimeStats[]> {
  const apiKey = process.env.FBI_CRIME_API_KEY
  if (!apiKey) {
    throw new Error('FBI Crime Data API_KEY is not configured')
  }

  const currentYear = new Date().getFullYear()
  const fromYear = currentYear - 3
  const from = `01-${fromYear}`
  const to = `12-${currentYear}`

  const offenseTypes = ['violent-crime', 'property-crime'] as const

  const results: CrimeStats[] = []

  for (const offense of offenseTypes) {
    try {
      const res = await fetch(
        `https://api.usa.gov/crime/fbi/cde/summarized/state/${stateAbbr}/${offense}?from=${from}&to=${to}&API_KEY=${apiKey}`
      )
      if (!res.ok) continue

      const data: FBISummarizedResponse = await res.json()
      const rates = data?.offenses?.rates
      if (!rates) continue

      // Get the first (only) key which is the state name
      const stateName = Object.keys(rates)[0]
      if (!stateName) continue

      const monthlyRates = rates[stateName]

      // Group by year and average the monthly rates
      const yearlyRates: Record<number, number[]> = {}
      for (const [monthYear, rate] of Object.entries(monthlyRates)) {
        const year = parseInt(monthYear.split('-')[1])
        if (!yearlyRates[year]) yearlyRates[year] = []
        yearlyRates[year].push(rate)
      }

      for (const [yearStr, monthRates] of Object.entries(yearlyRates)) {
        const year = parseInt(yearStr)
        // Sum monthly rates to get annual rate per 100k
        const annualRate = monthRates.reduce((sum, r) => sum + r, 0)
        results.push({
          year,
          offenseType: offense === 'violent-crime' ? 'Violent Crime' : 'Property Crime',
          count: 0, // summarized endpoint doesn't provide counts
          rate: Math.round(annualRate * 10) / 10,
        })
      }
    } catch {
      // Skip this offense type if it fails
      continue
    }
  }

  return results.sort((a, b) => b.year - a.year || a.offenseType.localeCompare(b.offenseType))
}
