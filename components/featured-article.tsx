import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FeaturedArticleProps {
  article: {
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage: string
    date: string
    category: string
    categorySlug: string
    readTime?: string
    author: {
      id: string
      name: string
      avatar: string
    }
  }
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  // Convert date string to Date object for formatting
  const dateObj = new Date(article.date)
  const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

  return (
    <div className="relative overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="relative h-64 md:h-full">
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col justify-center">
          <div className="mb-2">
            <Badge variant="outline" className="rounded-full bg-brand/10 text-brand border-brand/20">
              Featured
            </Badge>
            <Link href={`/category/${article.categorySlug}`} className="ml-2 text-sm font-medium hover:text-brand">
              {article.category}
            </Link>
            <span className="mx-2 text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{timeAgo}</span>
          </div>
          <Link href={`/articles/${article.slug}`}>
            <h2 className="text-2xl font-bold mb-3 hover:text-brand transition-colors">{article.title}</h2>
          </Link>
          <p className="text-muted-foreground mb-6">{article.excerpt}</p>
          <div className="flex items-center justify-between mt-auto">
            <Link href={`/author/${article.author.id}`} className="flex items-center">
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
            </Link>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href={`/articles/${article.slug}`}>
                Read <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
