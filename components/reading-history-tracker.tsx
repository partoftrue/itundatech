"use client"

import { useEffect, useRef } from "react"
import { useReadingHistory } from "@/hooks/use-reading-history"

interface ReadingHistoryTrackerProps {
  article: {
    id: string
    slug: string
    title: string
    coverImage: string
    category: string
    categorySlug: string
  }
}

export function ReadingHistoryTracker({ article }: ReadingHistoryTrackerProps) {
  const { addToHistory } = useReadingHistory()
  const hasTracked = useRef(false)

  useEffect(() => {
    // Only track once per component mount to prevent infinite loops
    if (!hasTracked.current && article?.id) {
      addToHistory({
        id: article.id,
        slug: article.slug,
        title: article.title,
        coverImage: article.coverImage,
        category: article.category,
        categorySlug: article.categorySlug,
      })
      hasTracked.current = true
    }

    // No dependencies on addToHistory to prevent re-running
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article?.id])

  // This component doesn't render anything
  return null
}
