import { NextRequest, NextResponse } from 'next/server'
import { fetchAstronomy } from '@/lib/api/astronomy'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

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

  try {
    const data = await fetchAstronomy(latitude, longitude)
    return NextResponse.json(data)
  } catch (error) {
    console.error('Astronomy API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch astronomy data' },
      { status: 502 }
    )
  }
}
