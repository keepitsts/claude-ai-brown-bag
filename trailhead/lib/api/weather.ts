import type { CurrentWeather, DailyForecast } from '@/lib/types'

const WMO_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
}

export async function fetchCurrentWeather(lat: number, lng: number): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m',
    daily: 'uv_index_max',
    temperature_unit: 'fahrenheit',
    wind_speed_unit: 'mph',
    timezone: 'auto',
    forecast_days: '1',
  })

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const current = data.current

  return {
    temperature: current.temperature_2m,
    windSpeed: current.wind_speed_10m,
    windDirection: current.wind_direction_10m,
    humidity: current.relative_humidity_2m,
    uvIndex: data.daily.uv_index_max[0],
    precipitation: current.precipitation,
    weatherCode: current.weather_code,
    summary: WMO_CODES[current.weather_code] ?? 'Unknown',
  }
}

export async function fetchDailyForecast(lat: number, lng: number, days = 7): Promise<DailyForecast[]> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code',
    temperature_unit: 'fahrenheit',
    timezone: 'auto',
    forecast_days: days.toString(),
  })

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`)
  if (!res.ok) {
    throw new Error(`Weather forecast API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const daily = data.daily

  return daily.time.map((date: string, i: number) => ({
    date,
    tempMax: daily.temperature_2m_max[i],
    tempMin: daily.temperature_2m_min[i],
    precipitationProbability: daily.precipitation_probability_max[i],
    weatherCode: daily.weather_code[i],
  }))
}
