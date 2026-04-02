import { useQuery } from '@tanstack/react-query'
import type { CurrentWeather, DailyForecast } from '@/lib/types'

interface WeatherResponse {
  current: CurrentWeather
  forecast: DailyForecast[]
}

async function fetchWeather(lat: number, lng: number): Promise<WeatherResponse> {
  const res = await fetch(`/api/weather?lat=${lat}&lng=${lng}`)
  if (!res.ok) {
    throw new Error('Failed to fetch weather data')
  }
  return res.json()
}

export function useWeather(lat: number | undefined, lng: number | undefined) {
  return useQuery<WeatherResponse>({
    queryKey: ['weather', lat, lng],
    queryFn: () => fetchWeather(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 15 * 60 * 1000,
    refetchInterval: 15 * 60 * 1000,
  })
}
