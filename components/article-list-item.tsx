import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface ArticleListItemProps {
  article: {
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
  }
  variant?: "default" | "compact" | "featured"
  className?: string
}

export function ArticleListItem({ article, variant = "default", className }: ArticleListItemProps) {
  // Convert date string to Date object for formatting
  const dateObj = new Date(article.date)
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

  if (variant === "featured") {
    return (
      <div className={cn("py-6 border-b", className)}>
        <Link href={`/articles/${article.slug}`} className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 line-clamp-2">{article.title}</h2>
            <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
            <div className="text-sm text-muted-foreground">
              {article.date} · {article.author.name}
            </div>
          </div>
          <div className="sm:w-32 sm:h-32 w-full h-40 relative rounded-lg overflow-hidden flex-shrink-0">
            <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>
        </Link>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("py-4", className)}>
        <Link href={`/articles/${article.slug}`} className="flex gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium mb-1 truncate">{article.title}</h3>
            <div className="text-xs text-muted-foreground">{timeAgo}</div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative w-16 h-16 overflow-hidden rounded-lg">
              <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
            </div>
          </div>
        </Link>
      </div>
    )
  }

  // Default variant - matches Toss Tech style
  return (
    <div className={cn("py-6 border-b", className)}>
      <Link href={`/articles/${article.slug}`} className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
          <p className="text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>
          <div className="text-sm text-muted-foreground">
            {article.date} · {article.author.name}
          </div>
        </div>
        <div className="sm:w-32 sm:h-32 w-full h-40 relative rounded-lg overflow-hidden flex-shrink-0">
          <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>
      </Link>
    </div>
  )
}
