import { NextResponse } from 'next/server'
import { getExistReviews } from '@/server/reviews'

export async function GET() {
  try {
    const reviews = await getExistReviews()
    return NextResponse.json({ code: 2000, data: reviews })
  } catch (error) {
    console.error('Failed to fetch reviews:', error)
    return NextResponse.json(
      { code: 5000, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}
