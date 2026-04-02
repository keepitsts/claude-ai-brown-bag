import { useQuery } from '@tanstack/react-query'
import type { AstronomyData } from '@/lib/types'

async function fetchAstronomy(lat: number, lng: number): Promise<AstronomyData> {
  const res = await fetch(`/api/astronomy?lat=${lat}&lng=${lng}`)
  if (!res.ok) {
    throw new Error('Failed to fetch astronomy data')
  }
  return res.json()
}

export function useAstronomy(lat: number | undefined, lng: number | undefined) {
  return useQuery<AstronomyData>({
    queryKey: ['astronomy', lat, lng],
    queryFn: () => fetchAstronomy(lat!, lng!),
    enabled: lat !== undefined && lng !== undefined,
    staleTime: 60 * 60 * 1000,
  })
}
