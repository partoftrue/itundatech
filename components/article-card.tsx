import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface ArticleCardProps {
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
  variant?: "default" | "featured"
  className?: string
}

export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  // Convert date string to Date object for formatting
  const dateObj = new Date(article.date)
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "group rounded-2xl overflow-hidden bg-background border hover:shadow-md transition-all duration-300",
          className,
        )}
      >
        <Link href={`/articles/${article.slug}`} className="block">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-full">
              <Image
                src={article.coverImage || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="mb-3">
                <Badge variant="outline" className="rounded-full bg-primary/10 text-primary border-primary/20">
                  {article.category}
                </Badge>
                <span className="ml-2 text-xs text-muted-foreground">{timeAgo}</span>
              </div>
              <h2 className="text-2xl font-medium mb-4 group-hover:text-primary transition-colors">{article.title}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{article.excerpt}</p>
              <div className="flex items-center mt-auto">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{article.author.name}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className={cn("group", className)}>
      <Link href={`/articles/${article.slug}`} className="block">
        <div className="relative h-48 mb-4 overflow-hidden rounded-2xl">
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="mb-3">
          <Badge variant="outline" className="rounded-full bg-primary/10 text-primary border-primary/20">
            {article.category}
          </Badge>
          <span className="mx-2 text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>
        <h2 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
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
          <span className="text-xs font-medium">{article.author.name}</span>
        </div>
      </Link>
    </div>
  )
}
