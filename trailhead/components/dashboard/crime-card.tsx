'use client'

import { Shield } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { useLocationStore } from '@/stores/location-store'
import { useCrime } from '@/hooks/useCrime'

interface StateSummary {
  violentRate: number
  propertyRate: number
  year: number
}

function summarizeStats(stats: { year: number; offenseType: string; rate: number }[]): StateSummary | null {
  if (stats.length === 0) return null

  const mostRecentYear = Math.max(...stats.map((s) => s.year))
  const recentStats = stats.filter((s) => s.year === mostRecentYear)

  let violentRate = 0
  let propertyRate = 0

  for (const s of recentStats) {
    const offense = s.offenseType.toLowerCase()
    if (offense.includes('violent') || offense.includes('assault') || offense.includes('robbery') || offense.includes('murder') || offense.includes('rape')) {
      violentRate += s.rate
    } else if (offense.includes('property') || offense.includes('burglary') || offense.includes('larceny') || offense.includes('theft') || offense.includes('motor vehicle')) {
      propertyRate += s.rate
    }
  }

  return { violentRate, propertyRate, year: mostRecentYear }
}

function RateBar({ label, rate, maxRate }: { label: string; rate: number; maxRate: number }) {
  const pct = maxRate > 0 ? Math.min((rate / maxRate) * 100, 100) : 0

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">{rate.toFixed(1)}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function CrimeCard() {
  const selectedLocation = useLocationStore((s) => s.selectedLocation)
  const { data, isLoading, error } = useCrime(selectedLocation?.state)

  if (!selectedLocation) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            Crime Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select a location to view data
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            Crime Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            Crime Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Unavailable</AlertTitle>
            <AlertDescription>Crime data unavailable for this location.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const summary = summarizeStats(data)

  if (!summary || (summary.violentRate === 0 && summary.propertyRate === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" />
            Crime Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>No Data</AlertTitle>
            <AlertDescription>
              No crime statistics available for {selectedLocation.state}.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            Source: FBI UCR Data
          </p>
        </CardFooter>
      </Card>
    )
  }

  const maxRate = Math.max(summary.violentRate, summary.propertyRate)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="size-4 text-muted-foreground" />
          Crime Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Rates per 100,000 population
          </p>
          <RateBar label="Violent Crime" rate={summary.violentRate} maxRate={maxRate} />
          <RateBar label="Property Crime" rate={summary.propertyRate} maxRate={maxRate} />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Based on most recent FBI UCR data for {selectedLocation.state} ({summary.year})
        </p>
      </CardFooter>
    </Card>
  )
}
