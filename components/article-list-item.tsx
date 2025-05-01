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
      <div className={cn("group py-8", className)}>
        <Link href={`/articles/${article.slug}`} className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <div className="mb-2">
              <span className="text-sm font-medium text-itunda-purple">{article.category}</span>
              <span className="mx-2 text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
            <h2 className="text-2xl font-bold mb-3 group-hover:text-itunda-purple transition-colors">
              {article.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                <Image
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-medium">{article.author.name}</span>
            </div>
          </div>
          <div className="md:w-48 md:h-48 w-full aspect-square relative rounded-lg overflow-hidden flex-shrink-0">
            <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>
        </Link>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("group py-4", className)}>
        <Link href={`/articles/${article.slug}`} className="flex gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-medium mb-1 truncate group-hover:text-itunda-purple transition-colors">
              {article.title}
            </h3>
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

  // Default variant
  return (
    <div className={cn("group py-8 border-b border-gray-100 dark:border-gray-800", className)}>
      <Link href={`/articles/${article.slug}`} className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <div className="mb-2">
            <span className="text-sm font-medium text-itunda-purple">{article.category}</span>
            <span className="mx-2 text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
          <h2 className="text-xl font-bold mb-3 group-hover:text-itunda-purple transition-colors">{article.title}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
              <Image
                src={article.author.avatar || "/placeholder.svg"}
                alt={article.author.name}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium">{article.author.name}</span>
          </div>
        </div>
        <div className="md:w-32 md:h-32 w-full aspect-square relative rounded-lg overflow-hidden flex-shrink-0">
          <Image src={article.coverImage || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
        </div>
      </Link>
    </div>
  )
}
// Verify all links use the slug format
// This should already be correct with:
// <Link href={`/articles/${article.slug}`} ...>
