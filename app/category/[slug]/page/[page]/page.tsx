import { getArticles } from "@/lib/articles"
import { getCategoryBySlug } from "@/lib/categories"
import { ArticleList } from "@/components/article-list"
import { notFound } from "next/navigation"

export default async function CategoryPagePaginated({
  params,
}: {
  params: { slug: string; page: string }
}) {
  const page = Number.parseInt(params.page)

  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound()
  }

  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const articlesPerPage = 10
  const articles = await getArticles({
    category: params.slug,
    limit: articlesPerPage,
    offset: (page - 1) * articlesPerPage,
  })

  // If no articles and page > 1, return 404
  if (articles.length === 0 && page > 1) {
    notFound()
  }

  const totalPages = Math.ceil((category.count || 0) / articlesPerPage)

  // If page is greater than total pages, return 404
  if (page > totalPages) {
    notFound()
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <ArticleList
        articles={articles}
        title={category.name}
        description={category.description || `Browse all articles in the ${category.name} category`}
        showPagination={true}
        currentPage={page}
        totalPages={totalPages}
        basePath={`/category/${params.slug}/page`}
        emptyMessage={`No articles found in the ${category.name} category`}
        emptyAction={{
          text: "Browse all articles",
          href: "/articles",
        }}
      />
    </div>
  )
}
