import { useQuery } from '@tanstack/react-query'
import type { Earthquake } from '@/lib/types'

async function fetchSeismic(lat: number, lng: number, radius: number): Promise<Earthquake[]> {
  const res = await fetch(`/api/seismic?lat=${lat}&lng=${lng}&radius=${radius}`)
  if (!res.ok) {
    throw new Error('Failed to fetch seismic data')
  }
  return res.json()
}

export function useSeismic(lat: number | undefined, lng: number | undefined, radius = 250) {
  return useQuery<Earthquake[]>({
    queryKey: ['seismic', lat, lng, radius],
    queryFn: () => fetchSeismic(lat!, lng!, radius),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  })
}
