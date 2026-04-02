'use client'

import {
  Activity,
  Flame,
  Shield,
  Sun,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useLocationStore } from '@/stores/location-store'
import { WeatherCard } from '@/components/dashboard/weather-card'

const dataCards = [
  { title: 'Seismic Activity', icon: Activity },
  { title: 'Fire Detections', icon: Flame },
  { title: 'Crime Statistics', icon: Shield },
  { title: 'Astronomy', icon: Sun },
]

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
        {dataCards.map(({ title, icon: Icon }) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon className="size-4 text-muted-foreground" />
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedLocation ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a location to view data
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
