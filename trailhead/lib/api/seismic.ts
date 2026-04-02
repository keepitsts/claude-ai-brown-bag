import type { Earthquake } from '@/lib/types'

interface USGSFeature {
  id: string
  properties: {
    mag: number
    place: string
    time: number
    url: string
  }
  geometry: {
    coordinates: [number, number, number]
  }
}

export async function fetchEarthquakes(
  lat: number,
  lng: number,
  radiusKm = 250,
  days = 30
): Promise<Earthquake[]> {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const params = new URLSearchParams({
    format: 'geojson',
    latitude: lat.toString(),
    longitude: lng.toString(),
    maxradiuskm: radiusKm.toString(),
    starttime: startDate.toISOString().split('T')[0],
    endtime: endDate.toISOString().split('T')[0],
    minmagnitude: '2.5',
    orderby: 'time',
  })

  const res = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${params}`)
  if (!res.ok) {
    throw new Error(`USGS API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  return data.features.map((f: USGSFeature) => ({
    id: f.id,
    magnitude: f.properties.mag,
    place: f.properties.place,
    time: f.properties.time,
    lng: f.geometry.coordinates[0],
    lat: f.geometry.coordinates[1],
    depth: f.geometry.coordinates[2],
    url: f.properties.url,
  }))
}
