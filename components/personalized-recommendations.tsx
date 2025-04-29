"use client"

import { useEffect, useState } from "react"
import { useReadingHistory } from "@/hooks/use-reading-history"
import { ArticleCard } from "@/components/article-card"
import { Sparkles } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  date: string
  readTime: string
  category: string
  categorySlug: string
  author: {
    id: string
    name: string
    avatar: string
  }
}

export function PersonalizedRecommendations() {
  const { history, isLoaded } = useReadingHistory()
  const [recommendations, setRecommendations] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only fetch recommendations once reading history is loaded
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
          body: JSON.stringify({ readingHistory: historyItems }),
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
  }, [history, isLoaded])

  if (!isLoaded || loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Read more articles to get personalized recommendations.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-brand" />
        <h2 className="text-xl font-bold">Recommended For You</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
