import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createServerSupabaseClient } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import { MessageSquareOff } from "lucide-react"

export async function CommentList({ articleId }: { articleId: string }) {
  const supabase = createServerSupabaseClient()

  const { data: comments, error } = await supabase
    .from("comments")
    .select(`
      *,
      users (
        id,
        name,
        avatar_url
      )
    `)
    .eq("article_id", articleId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching comments:", error)
    return <div>Failed to load comments</div>
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/30 rounded-lg">
        <MessageSquareOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground mb-2">No comments yet.</p>
        <p className="text-sm text-muted-foreground">Be the first to share your thoughts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {comments.map((comment) => {
        // Format the date
        const dateObj = new Date(comment.created_at)
        const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

        return (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.users?.avatar_url || ""} alt={comment.users?.name || "User"} />
              <AvatarFallback>{comment.users?.name?.substring(0, 2) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.users?.name || "Anonymous"}</span>
                <span className="text-xs text-muted-foreground">{timeAgo}</span>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
