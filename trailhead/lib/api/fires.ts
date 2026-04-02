import type { FireDetection } from '@/lib/types'

interface FIRMSRecord {
  latitude: number
  longitude: number
  brightness: number
  scan: number
  track: number
  acq_date: string
  acq_time: string
  confidence: string
  satellite: string
}

export async function fetchFireDetections(
  lat: number,
  lng: number,
  radiusDeg = 1,
  days = 7,
  mapKey?: string
): Promise<FireDetection[]> {
  const key = mapKey ?? process.env.NASA_FIRMS_MAP_KEY
  if (!key) {
    throw new Error('NASA FIRMS MAP_KEY is not configured')
  }

  const west = lng - radiusDeg
  const east = lng + radiusDeg
  const south = lat - radiusDeg
  const north = lat + radiusDeg
  const area = `${west},${south},${east},${north}`

  const res = await fetch(
    `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/VIIRS_SNPP_NRT/${area}/${days}`
  )
  if (!res.ok) {
    throw new Error(`NASA FIRMS API error: ${res.status} ${res.statusText}`)
  }

  const text = await res.text()
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',')
  const records: FIRMSRecord[] = lines.slice(1).map((line) => {
    const values = line.split(',')
    const record: Record<string, string> = {}
    headers.forEach((h, i) => {
      record[h.trim()] = values[i]?.trim() ?? ''
    })
    return {
      latitude: parseFloat(record.latitude),
      longitude: parseFloat(record.longitude),
      brightness: parseFloat(record.bright_ti4 || record.brightness || '0'),
      scan: parseFloat(record.scan || '0'),
      track: parseFloat(record.track || '0'),
      acq_date: record.acq_date || '',
      acq_time: record.acq_time || '',
      confidence: record.confidence || '',
      satellite: record.satellite || '',
    }
  })

  return records.map((r) => ({
    lat: r.latitude,
    lng: r.longitude,
    brightness: r.brightness,
    scan: r.scan,
    track: r.track,
    acqDate: r.acq_date,
    acqTime: r.acq_time,
    confidence: r.confidence,
    satellite: r.satellite,
  }))
}
