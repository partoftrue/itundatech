import { getArticles } from "@/lib/articles"
import { ArticleList } from "@/components/article-list"
import { notFound } from "next/navigation"

export default async function ArticlesPagePaginated({
  params,
}: {
  params: { page: string }
}) {
  const page = Number.parseInt(params.page)

  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound()
  }

  const articlesPerPage = 10
  const articles = await getArticles({
    limit: articlesPerPage,
    offset: (page - 1) * articlesPerPage,
  })

  // If no articles and page > 1, return 404
  if (articles.length === 0 && page > 1) {
    notFound()
  }

  // For demo purposes, assume 15 total pages
  const totalPages = 15

  // If page is greater than total pages, return 404
  if (page > totalPages) {
    notFound()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <ArticleList
        articles={articles}
        title="All Articles"
        description="Browse all our articles across all categories"
        showPagination={true}
        currentPage={page}
        totalPages={totalPages}
        basePath="/articles/page"
      />
    </div>
  )
}
