"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

interface BookmarkButtonProps {
  articleId: string
  className?: string
}

export function BookmarkButton({ articleId, className = "" }: BookmarkButtonProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkBookmarkStatus = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase
          .from("bookmarks")
          .select("id")
          .eq("user_id", user.id)
          .eq("article_id", articleId)
          .single()

        if (error && error.code !== "PGRST116") {
          console.error("Error checking bookmark status:", error)
        }

        setIsBookmarked(!!data)
      } catch (error) {
        console.error("Error checking bookmark status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkBookmarkStatus()
  }, [user, articleId])

  const toggleBookmark = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to bookmark articles.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClientSupabaseClient()

      if (isBookmarked) {
        // Remove bookmark
        const { error } = await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("article_id", articleId)

        if (error) throw error

        setIsBookmarked(false)
        toast({
          title: "Bookmark removed",
          description: "Article removed from your bookmarks.",
        })
      } else {
        // Add bookmark
        const { error } = await supabase.from("bookmarks").insert({
          user_id: user.id,
          article_id: articleId,
          created_at: new Date().toISOString(),
        })

        if (error) throw error

        setIsBookmarked(true)
        toast({
          title: "Bookmark added",
          description: "Article added to your bookmarks.",
        })
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      toast({
        title: "Error",
        description: "There was an error updating your bookmark. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleBookmark}
      disabled={isLoading || !user}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
    </Button>
  )
}
