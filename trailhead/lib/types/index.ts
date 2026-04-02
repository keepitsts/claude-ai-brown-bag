// === Location ===

export interface FederalLand {
  id: string
  name: string
  agency: 'NPS' | 'BLM' | 'FWS' | 'BIA' | 'USBR' | 'USFS'
  agencyName: string
  state: string
  lat: number
  lng: number
  description?: string
}

// === Weather (Open-Meteo) ===

export interface CurrentWeather {
  temperature: number
  windSpeed: number
  windDirection: number
  humidity: number
  uvIndex: number
  precipitation: number
  weatherCode: number
  summary: string
}

export interface DailyForecast {
  date: string
  tempMax: number
  tempMin: number
  precipitationProbability: number
  weatherCode: number
}

// === Seismic (USGS GeoJSON) ===

export interface Earthquake {
  id: string
  magnitude: number
  place: string
  time: number
  lat: number
  lng: number
  depth: number
  url: string
}

// === Fire (NASA FIRMS) ===

export interface FireDetection {
  lat: number
  lng: number
  brightness: number
  scan: number
  track: number
  acqDate: string
  acqTime: string
  confidence: string
  satellite: string
}

// === Crime (FBI API) ===

export interface CrimeStats {
  year: number
  offenseType: string
  count: number
  rate: number
}

// === Astronomy (Open-Meteo) ===

export interface AstronomyData {
  sunrise: string
  sunset: string
  solarNoon: string
  daylightDuration: number
  moonPhase: string
}

// === Briefing ===

export interface Briefing {
  id: string
  locationId: string
  locationName: string
  generatedAt: string
  content: string
  dataSnapshot: Record<string, unknown>
}
