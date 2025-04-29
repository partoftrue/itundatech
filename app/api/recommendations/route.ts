import { type NextRequest, NextResponse } from "next/server"
import { getRecommendedArticles } from "@/lib/recommendations"

export async function POST(request: NextRequest) {
  try {
    const { readingHistory, limit = 4 } = await request.json()

    if (!readingHistory || !Array.isArray(readingHistory)) {
      return NextResponse.json({ error: "Reading history is required and must be an array" }, { status: 400 })
    }

    const recommendations = await getRecommendedArticles({
      readingHistory,
      limit,
    })

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
