'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Briefing } from '@/lib/types'

interface BriefingState {
  history: Briefing[]
  addBriefing: (briefing: Briefing) => void
  getBriefingsForLocation: (locationId: string) => Briefing[]
}

export const useBriefingStore = create<BriefingState>()(
  persist(
    (set, get) => ({
      history: [],
      addBriefing: (briefing) =>
        set((state) => ({ history: [briefing, ...state.history] })),
      getBriefingsForLocation: (locationId) =>
        get().history.filter((b) => b.locationId === locationId),
    }),
    { name: 'trailhead-briefings' }
  )
)
