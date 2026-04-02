'use client'

import { Eye } from 'lucide-react'
import { useWatchlistStore } from '@/stores/watchlistStore'
import { WatchlistCard } from '@/components/watchlist/watchlist-card'
import { ErrorBoundary } from '@/components/error-boundary'

export default function WatchlistPage() {
  const locations = useWatchlistStore((s) => s.locations)

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Watch List</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Locations you are monitoring.
        </p>
      </div>

      {locations.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16">
          <Eye className="size-10 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">
            Add locations to your watch list from the dashboard.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {locations.map((location) => (
            <ErrorBoundary key={location.id} fallbackTitle="Card error">
              <WatchlistCard location={location} />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </div>
  )
}
