import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface RelatedArticle {
  id: string
  slug: string
  title: string
  coverImage: string
  date: string
  readTime?: string
}

interface RelatedArticlesProps {
  title?: string
  articles: RelatedArticle[]
}

export function RelatedArticles({ title = "Related Articles", articles }: RelatedArticlesProps) {
  if (!articles.length) return null

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`} className="group block">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div>
                <h4 className="font-medium line-clamp-2 group-hover:text-brand transition-colors">{article.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{article.date}</span>
                  {article.readTime && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-sm">
        <Link href="/articles" className="inline-flex items-center text-brand hover:underline">
          View all articles <ArrowRight className="ml-1 h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
