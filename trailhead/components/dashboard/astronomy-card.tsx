'use client'

import { Sun, Sunset, Moon, MoonStar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLocationStore } from '@/stores/location-store'
import { useAstronomy } from '@/hooks/useAstronomy'

function getMoonIcon(phase: string) {
  if (phase === 'New Moon') return Moon
  if (phase === 'Full Moon') return MoonStar
  return Moon
}

function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.round((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

function getGoldenHour(sunset: string): string {
  const sunsetTime = new Date(sunset).getTime()
  const goldenHourTime = new Date(sunsetTime - 30 * 60 * 1000)
  return goldenHourTime.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function AstronomyCard() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const { data, isLoading, error } = useAstronomy(
    selectedLocation?.lat,
    selectedLocation?.lng
  )

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="size-4 text-muted-foreground" />
            Astronomy
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
            <Sun className="size-4 text-muted-foreground" />
            Astronomy
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
            <Sun className="size-4 text-muted-foreground" />
            Astronomy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load astronomy data.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const MoonIcon = getMoonIcon(data.moonPhase)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sun className="size-4 text-muted-foreground" />
          Astronomy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <Sun className="size-3.5 text-amber-500" />
              <span className="text-muted-foreground">Sunrise:</span>
              <span className="font-medium">{formatTime(data.sunrise)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sunset className="size-3.5 text-orange-500" />
              <span className="text-muted-foreground">Sunset:</span>
              <span className="font-medium">{formatTime(data.sunset)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Daylight: </span>
              <span className="font-medium">{formatDuration(data.daylightDuration)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Solar Noon: </span>
              <span className="font-medium">{formatTime(data.solarNoon)}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-1.5">
              <MoonIcon className="size-3.5 text-slate-400" />
              <span className="text-sm font-medium">{data.moonPhase}</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Golden Hour: </span>
              <span className="font-medium text-amber-600">{getGoldenHour(data.sunset)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Updated: {new Date().toLocaleTimeString()}
        </p>
      </CardFooter>
    </Card>
  )
}
