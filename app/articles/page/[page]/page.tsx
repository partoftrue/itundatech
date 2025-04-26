import { getArticles, getCategories } from "@/lib/articles"
import { CategoryTabs } from "@/components/category-tabs"
import { ArticleCardToss } from "@/components/article-card-toss"
import { Pagination } from "@/components/pagination"
import { notFound } from "next/navigation"

interface ArticlesPageProps {
  params: {
    page: string
  }
}

export default async function ArticlesPagePaginated({ params }: ArticlesPageProps) {
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

  const dbCategories = await getCategories()

  // For demo purposes, assume 15 total pages
  const totalPages = 15

  const categories = [
    { name: "All", href: "/articles" },
    ...dbCategories.map((cat) => ({
      name: cat.name,
      href: `/categories/${cat.slug}`,
    })),
  ]

  return (
    <div>
      {/* Category Tabs */}
      <CategoryTabs categories={categories} />

      {/* Articles List */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="divide-y">
          {articles.map((article) => (
            <ArticleCardToss key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={totalPages} basePath="/articles/page" />
      </div>
    </div>
  )
}
