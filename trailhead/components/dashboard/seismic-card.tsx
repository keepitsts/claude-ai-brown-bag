'use client'

import { Activity } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLocationStore } from '@/stores/location-store'
import { useSeismic } from '@/hooks/useSeismic'

function magnitudeColor(mag: number): string {
  if (mag >= 4) return 'bg-red-500 text-white hover:bg-red-500'
  if (mag >= 2) return 'bg-yellow-500 text-white hover:bg-yellow-500'
  return 'bg-green-500 text-white hover:bg-green-500'
}

function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'just now'
}

export function SeismicCard() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const { data, isLoading, error } = useSeismic(
    selectedLocation?.lat,
    selectedLocation?.lng
  )

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="size-4 text-muted-foreground" />
            Seismic Activity
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
            <Activity className="size-4 text-muted-foreground" />
            Seismic Activity
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
            <Activity className="size-4 text-muted-foreground" />
            Seismic Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load seismic data.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const topQuakes = data.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="size-4 text-muted-foreground" />
          Seismic Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No recent seismic activity within 250 km.
          </p>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              {data.length} earthquake{data.length !== 1 ? 's' : ''} in the last 7 days
            </p>
            <div className="space-y-2">
              {topQuakes.map((quake) => (
                <div key={quake.id} className="flex items-start gap-2 text-sm">
                  <Badge className={`shrink-0 ${magnitudeColor(quake.magnitude)}`}>
                    {quake.magnitude.toFixed(1)}
                  </Badge>
                  <div className="min-w-0">
                    <p className="truncate">{quake.place}</p>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(quake.time)} · {quake.depth.toFixed(1)} km deep
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Source: USGS · Within 250 km
        </p>
      </CardFooter>
    </Card>
  )
}
