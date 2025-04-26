"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/components/auth/auth-provider"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export function CommentForm({ articleId }: { articleId: string }) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClientSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !content.trim()) return

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from("comments").insert({
        content: content.trim(),
        article_id: articleId,
        user_id: user.id,
      })

      if (error) throw error

      setContent("")
      router.refresh()
    } catch (error) {
      console.error("Error submitting comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="bg-muted/50 rounded-lg p-6 text-center">
        <p className="text-muted-foreground mb-4">You need to be logged in to comment</p>
        <Button variant="outline" className="rounded-full" onClick={() => router.push("/auth")}>
          Sign In
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] rounded-lg resize-none focus-visible:ring-toss-blue"
        required
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || !content.trim()} className="rounded-full">
          {isSubmitting ? "Submitting..." : "Post Comment"}
        </Button>
      </div>
    </form>
  )
}
