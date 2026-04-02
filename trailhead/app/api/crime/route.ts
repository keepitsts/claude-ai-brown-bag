import { NextRequest, NextResponse } from 'next/server'
import { fetchCrimeStats } from '@/lib/api/crime'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const state = searchParams.get('state')

  if (!state) {
    return NextResponse.json(
      { error: 'state query parameter is required' },
      { status: 400 }
    )
  }

  if (!/^[A-Z]{2}$/.test(state)) {
    return NextResponse.json(
      { error: 'state must be a 2-letter uppercase abbreviation' },
      { status: 400 }
    )
  }

  try {
    const stats = await fetchCrimeStats(state)
    return NextResponse.json(stats)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch crime data'
    if (message.includes('API_KEY is not configured')) {
      return NextResponse.json(
        { error: 'FBI Crime Data API key is not configured' },
        { status: 503 }
      )
    }
    console.error('Crime API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch crime data' },
      { status: 502 }
    )
  }
}
