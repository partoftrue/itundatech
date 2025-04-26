import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface ArticleCardTossProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage: string
    date: string
    category?: string
    categorySlug?: string
    author: {
      name: string
      avatar?: string
    }
  }
  className?: string
}

export function ArticleCardToss({ article, className }: ArticleCardTossProps) {
  // Convert date string to Date object for formatting
  const dateObj = new Date(article.date)
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

  return (
    <div className={cn("py-6 group", className)}>
      <Link href={`/articles/${article.slug}`} className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">{article.title}</h2>
            <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="text-sm text-muted-foreground">
              {article.date} · {article.author.name}
            </div>
          </div>
          <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>
        </div>
      </Link>
    </div>
  )
}
