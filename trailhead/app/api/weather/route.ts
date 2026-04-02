import { NextRequest, NextResponse } from 'next/server'
import { fetchCurrentWeather, fetchDailyForecast } from '@/lib/api/weather'

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
    const [current, forecast] = await Promise.all([
      fetchCurrentWeather(latitude, longitude),
      fetchDailyForecast(latitude, longitude),
    ])

    return NextResponse.json({ current, forecast })
  } catch (error) {
    console.error('Weather API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 502 }
    )
  }
}
