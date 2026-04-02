interface NominatimResult {
  lat: string
  lon: string
  display_name: string
  place_id: number
}

export interface GeocodeResult {
  lat: number
  lng: number
  displayName: string
  placeId: number
}

export async function geocodeSearch(query: string): Promise<GeocodeResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '5',
    countrycodes: 'us',
  })

  const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
    headers: {
      'User-Agent': 'Trailhead/1.0',
    },
  })
  if (!res.ok) {
    throw new Error(`Nominatim API error: ${res.status} ${res.statusText}`)
  }

  const data: NominatimResult[] = await res.json()

  return data.map((r) => ({
    lat: parseFloat(r.lat),
    lng: parseFloat(r.lon),
    displayName: r.display_name,
    placeId: r.place_id,
  }))
}
