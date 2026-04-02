'use client'

import { CircleMarker, Popup } from 'react-leaflet'
import type { Earthquake } from '@/lib/types'

interface EarthquakeMarkersProps {
  earthquakes: Earthquake[]
}

function getDepthColor(depth: number): string {
  if (depth < 10) return '#facc15'
  if (depth < 50) return '#f97316'
  if (depth < 100) return '#ea580c'
  return '#dc2626'
}

function getMagnitudeRadius(magnitude: number): number {
  return Math.max(4, Math.pow(2, magnitude) / 2)
}

export function EarthquakeMarkers({ earthquakes }: EarthquakeMarkersProps) {
  return (
    <>
      {earthquakes.map((eq) => {
        const color = getDepthColor(eq.depth)
        const radius = getMagnitudeRadius(eq.magnitude)
        return (
          <CircleMarker
            key={eq.id}
            center={[eq.lat, eq.lng]}
            radius={radius}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.6,
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-amber-600">Earthquake</p>
                <p>Magnitude: {eq.magnitude.toFixed(1)}</p>
                <p>Depth: {eq.depth.toFixed(1)} km</p>
                <p>Location: {eq.place}</p>
                <p>Time: {new Date(eq.time).toLocaleString()}</p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </>
  )
}
