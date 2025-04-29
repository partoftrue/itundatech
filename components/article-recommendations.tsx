"use client"

import { useEffect, useState } from "react"
import { useReadingHistory } from "@/hooks/use-reading-history"
import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Article {
  id: string
  title: string
  slug: string
  coverImage: string
  category: string
  categorySlug: string
  date: string
  readTime: string
}

interface ArticleRecommendationsProps {
  currentArticleId: string
}

export function ArticleRecommendations({ currentArticleId }: ArticleRecommendationsProps) {
  const { history, isLoaded } = useReadingHistory()
  const [recommendations, setRecommendations] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return

    const fetchRecommendations = async () => {
      setLoading(true)
      try {
        // Convert reading history to the format expected by the API
        const historyItems = history.map((item) => ({
          id: item.id,
          slug: item.slug,
          category: item.category,
          categorySlug: item.categorySlug,
        }))

        const response = await fetch("/api/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            readingHistory: historyItems,
            excludeIds: [currentArticleId],
            limit: 3,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch recommendations")
        }

        const data = await response.json()
        setRecommendations(data)
      } catch (error) {
        console.error("Error fetching recommendations:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [history, isLoaded, currentArticleId])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <LoadingSpinner size="sm" />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return null
  }

  return (
    <div className="mt-12 p-6 bg-muted/30 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-5 w-5 text-brand" />
        <h3 className="text-lg font-bold">Recommended For You</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {recommendations.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="group">
            <div className="relative aspect-video w-full mb-2 rounded-lg overflow-hidden">
              <Image
                src={article.coverImage || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <h4 className="font-medium group-hover:text-brand line-clamp-2">{article.title}</h4>
            <p className="text-sm text-muted-foreground">
              {article.category} • {article.readTime}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
