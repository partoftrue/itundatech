"use client"

import { useReadingHistory } from "@/hooks/use-reading-history"
import { ArticleListItem } from "@/components/article-list-item"
import { Button } from "@/components/ui/button"
import { Trash2, History, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"

export default function ReadingHistoryPage() {
  const { history, clearHistory, removeFromHistory, isLoaded } = useReadingHistory()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="h-8 w-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <History className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Reading History</h1>
        </div>
        {history.length > 0 && (
          <Button variant="outline" size="sm" className="text-red-500" onClick={clearHistory}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear History
          </Button>
        )}
      </div>

      {isLoaded && history.length > 0 ? (
        <div className="space-y-6">
          {history.map((item) => (
            <div key={item.id} className="relative">
              <ArticleListItem
                article={{
                  id: item.id,
                  slug: item.slug,
                  title: item.title,
                  excerpt: `Read ${formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}`,
                  coverImage: item.coverImage,
                  date: new Date(item.timestamp).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }),
                  category: item.category,
                  categorySlug: item.categorySlug,
                  author: {
                    name: "You",
                    avatar: "/placeholder.svg?height=100&width=100",
                  },
                }}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => removeFromHistory(item.id)}
                aria-label="Remove from history"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground mb-4">You haven't read any articles yet.</p>
          <Button asChild>
            <Link href="/articles">Browse Articles</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
