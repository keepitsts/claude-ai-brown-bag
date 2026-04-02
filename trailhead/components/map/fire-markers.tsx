'use client'

import { CircleMarker, Popup } from 'react-leaflet'
import type { FireDetection } from '@/lib/types'

interface FireMarkersProps {
  fires: FireDetection[]
}

export function FireMarkers({ fires }: FireMarkersProps) {
  return (
    <>
      {fires.map((fire, i) => {
        const radius = Math.max(4, (fire.brightness - 300) / 10)
        return (
          <CircleMarker
            key={`fire-${fire.lat}-${fire.lng}-${i}`}
            center={[fire.lat, fire.lng]}
            radius={radius}
            pathOptions={{
              color: '#dc2626',
              fillColor: '#ef4444',
              fillOpacity: 0.7,
              weight: 1,
            }}
          >
            <Popup>
              <div className="text-sm">
                <p className="font-semibold text-red-600">Fire Detection</p>
                <p>Date: {fire.acqDate} {fire.acqTime}</p>
                <p>Confidence: {fire.confidence}</p>
                <p>Satellite: {fire.satellite}</p>
                <p>Brightness: {fire.brightness.toFixed(1)} K</p>
                <p>Coords: {fire.lat.toFixed(4)}, {fire.lng.toFixed(4)}</p>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </>
  )
}
