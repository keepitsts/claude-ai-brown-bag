import { useQuery } from '@tanstack/react-query'
import type { FireDetection } from '@/lib/types'

async function fetchFires(lat: number, lng: number, radius: number): Promise<FireDetection[]> {
  const res = await fetch(`/api/fires?lat=${lat}&lng=${lng}&radius=${radius}`)
  if (!res.ok) {
    throw new Error('Failed to fetch fire data')
  }
  return res.json()
}

export function useFires(lat: number | undefined, lng: number | undefined, radius = 100) {
  return useQuery<FireDetection[]>({
    queryKey: ['fires', lat, lng, radius],
    queryFn: () => fetchFires(lat!, lng!, radius),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 30 * 60 * 1000,
    refetchInterval: 30 * 60 * 1000,
  })
}
