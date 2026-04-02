import { useQuery } from '@tanstack/react-query'
import type { CrimeStats } from '@/lib/types'

async function fetchCrime(state: string): Promise<CrimeStats[]> {
  const res = await fetch(`/api/crime?state=${state}`)
  if (!res.ok) {
    throw new Error('Failed to fetch crime data')
  }
  return res.json()
}

export function useCrime(state: string | undefined) {
  return useQuery<CrimeStats[]>({
    queryKey: ['crime', state],
    queryFn: () => fetchCrime(state!),
    enabled: !!state,
    staleTime: 24 * 60 * 60 * 1000,
  })
}
