'use client'

import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLocationStore } from '@/stores/location-store'
import { useWeather } from '@/hooks/useWeather'

function getWeatherIcon(code: number): LucideIcon {
  if (code === 0 || code === 1) return Sun
  if (code >= 2 && code <= 3) return Cloud
  if (code >= 45 && code <= 48) return CloudFog
  if (code >= 51 && code <= 55) return CloudDrizzle
  if (code >= 61 && code <= 65) return CloudRain
  if (code >= 71 && code <= 77) return CloudSnow
  if (code >= 80 && code <= 82) return CloudRain
  if (code >= 85 && code <= 86) return CloudSnow
  if (code >= 95) return CloudLightning
  return Cloud
}

function windDirectionLabel(degrees: number): string {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(degrees / 45) % 8]
}

function celsiusToFahrenheit(c: number): number {
  return Math.round(c * 9 / 5 + 32)
}

export function WeatherCard() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const { data, isLoading, error } = useWeather(
    selectedLocation?.lat,
    selectedLocation?.lng
  )

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="size-4 text-muted-foreground" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select a location to view data
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="size-4 text-muted-foreground" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="size-4 text-muted-foreground" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load weather data.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const { current } = data
  const WeatherIcon = getWeatherIcon(current.weatherCode)
  const tempF = celsiusToFahrenheit(current.temperature)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <WeatherIcon className="size-4 text-muted-foreground" />
          Weather
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">{tempF}°F</span>
            <span className="text-sm text-muted-foreground">{current.summary}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Wind: </span>
              {Math.round(current.windSpeed)} mph {windDirectionLabel(current.windDirection)}
            </div>
            <div>
              <span className="text-muted-foreground">Humidity: </span>
              {current.humidity}%
            </div>
            <div>
              <span className="text-muted-foreground">UV Index: </span>
              {current.uvIndex}
            </div>
            <div>
              <span className="text-muted-foreground">Precip: </span>
              {current.precipitation} mm
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </CardFooter>
    </Card>
  )
}
