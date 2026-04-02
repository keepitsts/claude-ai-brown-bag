'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FederalLand } from '@/lib/types'

interface WatchlistState {
  locations: FederalLand[]
  addLocation: (location: FederalLand) => void
  removeLocation: (id: string) => void
  isWatched: (id: string) => boolean
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      locations: [],
      addLocation: (location) =>
        set((state) => {
          if (state.locations.some((l) => l.id === location.id)) return state
          return { locations: [...state.locations, location] }
        }),
      removeLocation: (id) =>
        set((state) => ({
          locations: state.locations.filter((l) => l.id !== id),
        })),
      isWatched: (id) => get().locations.some((l) => l.id === id),
    }),
    { name: 'trailhead-watchlist' }
  )
)
