'use client'

import { useRouter } from 'next/navigation'
import { Star, Flame, Activity, Thermometer } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocationStore } from '@/stores/location-store'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { useBriefingStore } from '@/stores/briefingStore'
import { useWeather } from '@/hooks/useWeather'
import { useFires } from '@/hooks/useFires'
import { useSeismic } from '@/hooks/useSeismic'
import type { FederalLand } from '@/lib/types'

function celsiusToFahrenheit(c: number): number {
  return Math.round(c * 9 / 5 + 32)
}

function lastBriefingLabel(locationId: string, getBriefings: (id: string) => { generatedAt: string }[]): string {
  const briefings = getBriefings(locationId)
  if (briefings.length === 0) return 'No briefings yet'
  const latest = new Date(briefings[0].generatedAt)
  const hoursAgo = Math.floor((Date.now() - latest.getTime()) / (1000 * 60 * 60))
  if (hoursAgo < 1) return 'Last briefing: <1 hour ago'
  return `Last briefing: ${hoursAgo}h ago`
}

export function WatchlistCard({ location }: { location: FederalLand }) {
  const router = useRouter()
  const setSelectedLocation = useLocationStore((s) => s.setSelectedLocation)
  const removeLocation = useWatchlistStore((s) => s.removeLocation)
  const getBriefingsForLocation = useBriefingStore((s) => s.getBriefingsForLocation)

  const { data: weather, isLoading: weatherLoading } = useWeather(location.lat, location.lng)
  const { data: fires } = useFires(location.lat, location.lng)
  const { data: earthquakes } = useSeismic(location.lat, location.lng)

  const fireCount = fires?.length ?? 0
  const quakeCount = earthquakes?.length ?? 0

  const handleNavigate = () => {
    setSelectedLocation(location)
    router.push('/')
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    removeLocation(location.id)
  }

  return (
    <Card className="cursor-pointer transition-colors hover:bg-muted/50" onClick={handleNavigate}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <CardTitle className="truncate text-sm font-medium">
              {location.name}
            </CardTitle>
            <Badge variant="secondary" className="mt-1 text-[10px]">
              {location.agency}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleRemove}
            title="Remove from watch list"
          >
            <Star className="size-3.5 fill-current text-amber-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-3">
          <Thermometer className="size-4 text-muted-foreground" />
          {weatherLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : weather ? (
            <span className="text-lg font-bold">
              {celsiusToFahrenheit(weather.current.temperature)}°F
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">--</span>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          {fireCount > 0 && (
            <Badge variant="destructive" className="gap-1 text-[10px]">
              <Flame className="size-3" />
              {fireCount} fire{fireCount !== 1 ? 's' : ''}
            </Badge>
          )}
          {quakeCount > 0 && (
            <Badge variant="destructive" className="gap-1 text-[10px]">
              <Activity className="size-3" />
              {quakeCount} quake{quakeCount !== 1 ? 's' : ''}
            </Badge>
          )}
          {fireCount === 0 && quakeCount === 0 && (
            <span className="text-xs text-muted-foreground">No active alerts</span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          {lastBriefingLabel(location.id, getBriefingsForLocation)}
        </p>
      </CardFooter>
    </Card>
  )
}
