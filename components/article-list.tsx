import { ArticleCardToss } from "@/components/article-card-toss"
import { Pagination } from "@/components/pagination"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Article {
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

interface ArticleListProps {
  articles: Article[]
  title?: string
  description?: string
  showPagination?: boolean
  currentPage?: number
  totalPages?: number
  basePath?: string
  emptyMessage?: string
  emptyAction?: {
    text: string
    href: string
  }
}

export function ArticleList({
  articles,
  title,
  description,
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  basePath = "/articles/page",
  emptyMessage = "No articles found",
  emptyAction,
}: ArticleListProps) {
  return (
    <div className="space-y-8">
      {title && (
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}

      {articles.length > 0 ? (
        <>
          <div className="divide-y">
            {articles.map((article) => (
              <ArticleCardToss key={article.id} article={article} />
            ))}
          </div>

          {showPagination && totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <p className="text-muted-foreground mb-4">{emptyMessage}</p>
          {emptyAction && (
            <Button asChild className="rounded-full">
              <Link href={emptyAction.href}>{emptyAction.text}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
