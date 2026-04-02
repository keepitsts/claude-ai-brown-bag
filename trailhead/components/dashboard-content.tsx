'use client'

import { useLocationStore } from '@/stores/location-store'
import { WeatherCard } from '@/components/dashboard/weather-card'
import { SeismicCard } from '@/components/dashboard/seismic-card'
import { FiresCard } from '@/components/dashboard/fires-card'
import { CrimeCard } from '@/components/dashboard/crime-card'
import { AstronomyCard } from '@/components/dashboard/astronomy-card'

export function DashboardContent() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        {selectedLocation ? (
          <p className="text-sm text-muted-foreground">
            {selectedLocation.name} — {selectedLocation.state} ({selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)})
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Select a location from the sidebar to get started.
          </p>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WeatherCard />
        <SeismicCard />
        <FiresCard />
        <CrimeCard />
        <AstronomyCard />
      </div>
    </div>
  )
}
