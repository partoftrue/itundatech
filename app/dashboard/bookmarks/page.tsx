"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { ArticleListItem } from "@/components/article-list-item"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Bookmark, X } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface BookmarkedArticle {
  id: string
  slug: string
  title: string
  excerpt: string
  coverImage: string
  date: string
  category: string
  categorySlug: string
  author: {
    name: string
    avatar: string
  }
  bookmarkId: string
}

export default function BookmarksPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [bookmarks, setBookmarks] = useState<BookmarkedArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  // Use a state variable to track auth status to prevent hydration issues
  const { user } = useAuth()

  // Use useEffect to safely access the auth context on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    if (!user) {
      router.push("/auth")
      return
    }

    const fetchBookmarks = async () => {
      try {
        const supabase = createClientSupabaseClient()

        const { data, error } = await supabase
          .from("bookmarks")
          .select(`
            id,
            article_id,
            created_at,
            articles:article_id (
              id,
              slug,
              title,
              excerpt,
              cover_image,
              created_at,
              users!articles_author_id_fkey (
                id,
                name,
                avatar_url
              ),
              categories!articles_category_id_fkey (
                id,
                name,
                slug
              )
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        const formattedBookmarks = data
          .filter((bookmark) => bookmark.articles) // Filter out any null articles (deleted articles)
          .map((bookmark) => ({
            id: bookmark.articles.id,
            slug: bookmark.articles.slug,
            title: bookmark.articles.title,
            excerpt: bookmark.articles.excerpt,
            coverImage: bookmark.articles.cover_image || "/placeholder.svg?height=400&width=600",
            date: new Date(bookmark.articles.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }),
            category: bookmark.articles.categories?.name || "Uncategorized",
            categorySlug: bookmark.articles.categories?.slug || "uncategorized",
            author: {
              name: bookmark.articles.users?.name || "Anonymous",
              avatar: bookmark.articles.users?.avatar_url || "/placeholder.svg?height=100&width=100",
            },
            bookmarkId: bookmark.id,
          }))

        setBookmarks(formattedBookmarks)
      } catch (error) {
        console.error("Error fetching bookmarks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookmarks()
  }, [user, isClient, router])

  const removeBookmark = async (bookmarkId: string) => {
    if (!user) return

    try {
      const supabase = createClientSupabaseClient()

      const { error } = await supabase.from("bookmarks").delete().eq("id", bookmarkId)

      if (error) throw error

      // Update the UI
      setBookmarks((prev) => prev.filter((bookmark) => bookmark.bookmarkId !== bookmarkId))

      toast({
        title: "Bookmark removed",
        description: "Article removed from your bookmarks.",
      })
    } catch (error) {
      console.error("Error removing bookmark:", error)
      toast({
        title: "Error",
        description: "There was an error removing the bookmark. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Show loading state until client-side code has run
  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Bookmark className="h-6 w-6" />
          <h1 className="text-3xl font-bold">Your Bookmarks</h1>
        </div>

        {bookmarks.length > 0 ? (
          <div className="divide-y">
            {bookmarks.map((article) => (
              <div key={article.id} className="relative">
                <ArticleListItem article={article} />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4"
                  onClick={() => removeBookmark(article.bookmarkId)}
                  aria-label="Remove bookmark"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">You haven't bookmarked any articles yet.</p>
            <Button asChild>
              <Link href="/articles">Browse Articles</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
