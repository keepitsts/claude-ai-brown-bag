import type { FireDetection } from '@/lib/types'

export async function fetchFireDetections(
  lat: number,
  lng: number,
  radiusKm = 100
): Promise<FireDetection[]> {
  const key = process.env.NASA_FIRMS_MAP_KEY
  if (!key) {
    throw new Error('NASA FIRMS MAP_KEY is not configured')
  }

  // FIRMS API expects a bounding box: west,south,east,north
  // Approximate degrees from km (1 degree ≈ 111km at equator)
  const degOffset = radiusKm / 111
  const west = lng - degOffset
  const south = lat - degOffset
  const east = lng + degOffset
  const north = lat + degOffset

  const res = await fetch(
    `https://firms.modaps.eosdis.nasa.gov/api/area/csv/${key}/VIIRS_SNPP_NRT/${west},${south},${east},${north}/1`
  )
  if (!res.ok) {
    throw new Error(`NASA FIRMS API error: ${res.status} ${res.statusText}`)
  }

  const text = await res.text()
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',')

  return lines.slice(1).map((line) => {
    const values = line.split(',')
    const record: Record<string, string> = {}
    headers.forEach((h, i) => {
      record[h.trim()] = values[i]?.trim() ?? ''
    })
    return {
      lat: parseFloat(record.latitude),
      lng: parseFloat(record.longitude),
      brightness: parseFloat(record.bright_ti4 || record.brightness || '0'),
      scan: parseFloat(record.scan || '0'),
      track: parseFloat(record.track || '0'),
      acqDate: record.acq_date || '',
      acqTime: record.acq_time || '',
      confidence: record.confidence || '',
      satellite: record.satellite || '',
    }
  })
}
