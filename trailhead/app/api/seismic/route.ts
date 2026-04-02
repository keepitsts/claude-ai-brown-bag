import { NextRequest, NextResponse } from 'next/server'
import { fetchEarthquakes } from '@/lib/api/seismic'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const radius = searchParams.get('radius')
  const days = searchParams.get('days')

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

  const radiusKm = radius ? parseInt(radius, 10) : 250
  const daysBack = days ? parseInt(days, 10) : 7

  try {
    const earthquakes = await fetchEarthquakes(latitude, longitude, radiusKm, daysBack)
    return NextResponse.json(earthquakes)
  } catch (error) {
    console.error('Seismic API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch seismic data' },
      { status: 502 }
    )
  }
}
