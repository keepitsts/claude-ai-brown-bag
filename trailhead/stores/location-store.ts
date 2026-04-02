import { create } from 'zustand'
import type { FederalLand } from '@/lib/types'

interface LocationState {
  selectedLocation: FederalLand | null
  setSelectedLocation: (location: FederalLand) => void
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}))
