'use client'

import { Flame } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLocationStore } from '@/stores/location-store'
import { useFires } from '@/hooks/useFires'
import { haversineDistanceKm } from '@/lib/utils'

function confidenceColor(confidence: string): string {
  const c = confidence.toLowerCase()
  if (c === 'high' || c === 'h') return 'bg-red-500 text-white hover:bg-red-500'
  if (c === 'nominal' || c === 'n') return 'bg-yellow-500 text-white hover:bg-yellow-500'
  return 'bg-gray-500 text-white hover:bg-gray-500'
}

function formatAcqTime(time: string): string {
  if (time.length < 3) return time
  const padded = time.padStart(4, '0')
  return `${padded.slice(0, 2)}:${padded.slice(2)}`
}

export function FiresCard() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const { data, isLoading, error } = useFires(
    selectedLocation?.lat,
    selectedLocation?.lng
  )

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="size-4 text-muted-foreground" />
            Fire Detections
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
            <Flame className="size-4 text-muted-foreground" />
            Fire Detections
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
            <Flame className="size-4 text-muted-foreground" />
            Fire Detections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Failed to load fire detection data.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const firesWithDistance = data.map((fire) => ({
    ...fire,
    distanceKm: haversineDistanceKm(
      selectedLocation.lat,
      selectedLocation.lng,
      fire.lat,
      fire.lng
    ),
  })).sort((a, b) => a.distanceKm - b.distanceKm)

  const topFires = firesWithDistance.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="size-4 text-muted-foreground" />
          Fire Detections
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <Alert>
            <AlertTitle>All Clear</AlertTitle>
            <AlertDescription>No active fires detected within 100 km.</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-3">
            <Alert variant="destructive">
              <Flame className="size-4" />
              <AlertTitle>Active Fires Detected</AlertTitle>
              <AlertDescription>
                {data.length} fire detection{data.length !== 1 ? 's' : ''} in the past 24h
              </AlertDescription>
            </Alert>
            <div className="space-y-2">
              {topFires.map((fire, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Badge className={`shrink-0 ${confidenceColor(fire.confidence)}`}>
                    {fire.confidence}
                  </Badge>
                  <div className="min-w-0">
                    <p className="truncate">
                      {fire.distanceKm.toFixed(1)} km away · {fire.satellite}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {fire.acqDate} {formatAcqTime(fire.acqTime)} UTC
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
          Source: NASA FIRMS · Within 100 km
        </p>
      </CardFooter>
    </Card>
  )
}
