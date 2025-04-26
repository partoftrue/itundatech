import { CommentList } from "./comment-list"
import { CommentForm } from "./comment-form"
import { MessageCircle } from "lucide-react"

export function CommentSection({ articleId }: { articleId: string }) {
  return (
    <div id="comments" className="mt-12 pt-8 border-t">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="h-5 w-5 text-brand" />
        <h2 className="text-2xl font-bold">Discussion</h2>
      </div>

      <CommentForm articleId={articleId} />

      <div className="mt-8">
        <CommentList articleId={articleId} />
      </div>
    </div>
  )
}
