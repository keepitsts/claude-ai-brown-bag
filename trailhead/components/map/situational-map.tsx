'use client'

import { useEffect } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocationStore } from '@/stores/location-store'
import { useFires } from '@/hooks/useFires'
import { useSeismic } from '@/hooks/useSeismic'
import { FireMarkers } from './fire-markers'
import { EarthquakeMarkers } from './earthquake-markers'

// Fix Leaflet default marker icon issue with webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const stationIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'station-marker-blue',
})

function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lng], 10, { duration: 1.5 })
  }, [map, lat, lng])
  return null
}

export function SituationalMap() {
  const location = useLocationStore((s) => s.selectedLocation)
  const { data: fires } = useFires(location?.lat, location?.lng)
  const { data: earthquakes } = useSeismic(location?.lat, location?.lng)

  if (!location) return null

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={10}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToLocation lat={location.lat} lng={location.lng} />
      <Marker position={[location.lat, location.lng]} icon={stationIcon}>
        <Popup>
          <div className="text-sm">
            <p className="font-semibold">{location.name}</p>
            <p className="text-muted-foreground">{location.agencyName}</p>
          </div>
        </Popup>
      </Marker>
      {fires && <FireMarkers fires={fires} />}
      {earthquakes && <EarthquakeMarkers earthquakes={earthquakes} />}
    </MapContainer>
  )
}
