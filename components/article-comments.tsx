"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"
import { VercelImage } from "./vercel-image"

interface Comment {
  id: string
  author: string
  authorImage?: string
  content: string
  date: string
  likes: number
  replies: Comment[]
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "1",
    author: "김민지",
    authorImage: "/diverse-group-avatars.png",
    content: "정말 유익한 글이네요. 디자인 컨퍼런스에 참여해보고 싶습니다.",
    date: "2025-04-25",
    likes: 5,
    replies: [
      {
        id: "1-1",
        author: "유아란",
        authorImage: "/diverse-group-avatars.png",
        content: "감사합니다! 컨퍼런스 참가 신청은 다음 주부터 시작됩니다.",
        date: "2025-04-25",
        likes: 2,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "이서진",
    authorImage: "/diverse-group-avatars.png",
    content: "디자인 시스템에 대한 세션이 특히 기대됩니다. 작년 컨퍼런스도 정말 좋았어요.",
    date: "2025-04-26",
    likes: 3,
    replies: [],
  },
]

function formatCommentDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.round(diffMs / 60000)
  const diffHours = Math.round(diffMs / 3600000)
  const diffDays = Math.round(diffMs / 86400000)

  if (diffMins < 60) {
    return `${diffMins}분 전`
  } else if (diffHours < 24) {
    return `${diffHours}시간 전`
  } else if (diffDays < 7) {
    return `${diffDays}일 전`
  } else {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
  }
}

function CommentItem({ comment, level = 0 }: { comment: Comment; level?: number }) {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
  }

  const handleReply = () => {
    if (!replyContent.trim()) {
      toast({
        title: "댓글을 입력해주세요",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would send the reply to the server
    toast({
      title: "댓글이 등록되었습니다",
    })
    setReplyContent("")
    setIsReplying(false)
  }

  return (
    <motion.div
      className={`${level > 0 ? "ml-8 pl-4 border-l" : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex gap-3 py-4">
        <div className="h-10 w-10 rounded-full overflow-hidden relative">
          <VercelImage
            src={comment.authorImage || "/placeholder.svg?height=40&width=40&query=avatar"}
            alt={comment.author}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{comment.author}</h4>
              <p className="text-xs text-muted-foreground">{formatCommentDate(comment.date)}</p>
            </div>
          </div>
          <p className="mt-2 text-sm">{comment.content}</p>
          <div className="flex gap-4 mt-2">
            <button
              className={`text-xs flex items-center gap-1 ${liked ? "text-primary" : "text-muted-foreground"}`}
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{liked ? comment.likes + 1 : comment.likes}</span>
            </button>
            <button className="text-xs text-muted-foreground" onClick={() => setIsReplying(!isReplying)}>
              {isReplying ? "취소" : "답글"}
            </button>
          </div>

          {isReplying && (
            <div className="mt-3 space-y-3">
              <Textarea
                placeholder="답글을 입력하세요..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsReplying(false)}>
                  취소
                </Button>
                <Button size="sm" onClick={handleReply}>
                  답글 달기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies.map((reply) => (
        <CommentItem key={reply.id} comment={reply} level={level + 1} />
      ))}
    </motion.div>
  )
}

export function ArticleComments() {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    if (!newComment.trim()) {
      toast({
        title: "댓글을 입력해주세요",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newCommentObj: Comment = {
        id: `new-${Date.now()}`,
        author: "사용자",
        authorImage: "/abstract-geometric-shapes.png",
        content: newComment,
        date: new Date().toISOString(),
        likes: 0,
        replies: [],
      }

      setComments([newCommentObj, ...comments])
      setNewComment("")
      setIsSubmitting(false)

      toast({
        title: "댓글이 등록되었습니다",
      })
    }, 1000)
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">댓글</h2>

      <div className="space-y-4">
        <div className="flex gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden relative">
            <VercelImage
              src="/abstract-geometric-shapes.png"
              alt="사용자"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "등록 중..." : "댓글 등록"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-1 divide-y">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  )
}
