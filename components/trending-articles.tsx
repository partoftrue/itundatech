import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

interface TrendingArticle {
  id: string
  slug: string
  title: string
  coverImage: string
  category: string
  categorySlug: string
  date: string
}

interface TrendingArticlesProps {
  articles: TrendingArticle[]
}

export function TrendingArticles({ articles }: TrendingArticlesProps) {
  if (!articles.length) return null

  return (
    <div className="bg-muted/30 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-brand" />
        <h2 className="text-xl font-bold">Trending Now</h2>
      </div>
      <div className="grid gap-4">
        {articles.map((article, index) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="group">
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 w-16 h-16 relative rounded-md overflow-hidden">
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs px-1.5 py-0 rounded-sm">
                    #{index + 1}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{article.category}</span>
                </div>
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-brand transition-colors">
                  {article.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
