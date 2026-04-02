'use client'

import { Mountain, Star, StarOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocationStore } from '@/stores/location-store'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { ErrorBoundary } from '@/components/error-boundary'
import { WeatherCard } from '@/components/dashboard/weather-card'
import { SeismicCard } from '@/components/dashboard/seismic-card'
import { FiresCard } from '@/components/dashboard/fires-card'
import { CrimeCard } from '@/components/dashboard/crime-card'
import { AstronomyCard } from '@/components/dashboard/astronomy-card'

export function DashboardContent() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const { locations: watchedLocations, addLocation, removeLocation } = useWatchlistStore()
  const isWatched = selectedLocation
    ? watchedLocations.some((l) => l.id === selectedLocation.id)
    : false

  if (!selectedLocation) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="text-center">
          <Mountain className="mx-auto size-12 text-muted-foreground/50" />
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Welcome to TRAILHEAD
          </h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Your daily briefing tool for federal lands across the United States.
            Select a location from the sidebar to view weather, seismic activity,
            fire detections, crime statistics, and astronomy data.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            {selectedLocation.name} — {selectedLocation.state} ({selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)})
          </p>
        </div>
        <Button
          variant={isWatched ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => {
            if (isWatched) {
              removeLocation(selectedLocation.id)
            } else {
              addLocation(selectedLocation)
            }
          }}
        >
          {isWatched ? (
            <StarOff className="size-4" />
          ) : (
            <Star className="size-4" />
          )}
          {isWatched ? 'Remove from Watch List' : 'Add to Watch List'}
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ErrorBoundary fallbackTitle="Weather unavailable">
          <WeatherCard />
        </ErrorBoundary>
        <ErrorBoundary fallbackTitle="Seismic data unavailable">
          <SeismicCard />
        </ErrorBoundary>
        <ErrorBoundary fallbackTitle="Fire data unavailable">
          <FiresCard />
        </ErrorBoundary>
        <ErrorBoundary fallbackTitle="Crime data unavailable">
          <CrimeCard />
        </ErrorBoundary>
        <ErrorBoundary fallbackTitle="Astronomy unavailable">
          <AstronomyCard />
        </ErrorBoundary>
      </div>
    </div>
  )
}
