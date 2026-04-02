'use client'

import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import { useLocationStore } from '@/stores/location-store'

const SituationalMap = dynamic(
  () => import('@/components/map/situational-map').then((m) => m.SituationalMap),
  { ssr: false }
)

function MapLegend() {
  return (
    <div className="absolute bottom-6 left-6 z-[1000] rounded-lg border bg-background/90 p-3 shadow-md backdrop-blur-sm">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Legend
      </p>
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-blue-500" />
          Station Location
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-red-500" />
          Fire Detection
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block size-3 rounded-full bg-amber-400" />
          Earthquake
        </div>
      </div>
    </div>
  )
}

export default function MapPage() {
  const location = useLocationStore((s) => s.selectedLocation)

  if (!location) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <MapPin className="mx-auto size-12 text-muted-foreground/50" />
          <h2 className="mt-4 text-lg font-semibold">No location selected</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Select a location from the sidebar to view the situational map.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <SituationalMap />
      <MapLegend />
    </div>
  )
}
