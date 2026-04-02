'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FederalLand } from '@/lib/types'

interface LocationState {
  selectedLocation: FederalLand | null
  setLocation: (location: FederalLand) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      selectedLocation: null,
      setLocation: (location) => set({ selectedLocation: location }),
    }),
    { name: 'trailhead-location' }
  )
)
