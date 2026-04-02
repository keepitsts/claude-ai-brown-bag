import { NextRequest, NextResponse } from 'next/server'
import { fetchFireDetections } from '@/lib/api/fires'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = searchParams.get('radius')

  if (!lat || !lng) {
    return NextResponse.json(
      { error: 'lat and lng query parameters are required' },
      { status: 400 }
    )
  }

  const latitude = parseFloat(lat)
  const longitude = parseFloat(lng)

  if (isNaN(latitude) || isNaN(longitude)) {
    return NextResponse.json(
      { error: 'lat and lng must be valid numbers' },
      { status: 400 }
    )
  }

  const radiusKm = radius ? parseInt(radius, 10) : 100

  try {
    const fires = await fetchFireDetections(latitude, longitude, radiusKm)
    return NextResponse.json(fires)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch fire data'
    if (message.includes('MAP_KEY is not configured')) {
      return NextResponse.json(
        { error: 'NASA FIRMS API key is not configured' },
        { status: 503 }
      )
    }
    console.error('Fires API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch fire data' },
      { status: 502 }
    )
  }
}
