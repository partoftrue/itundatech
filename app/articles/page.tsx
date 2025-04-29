import { getArticles } from "@/lib/articles"
import { ArticleList } from "@/components/article-list"

export default async function ArticlesPage() {
  const articles = await getArticles({ limit: 10 })

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <ArticleList
        articles={articles}
        title="All Articles"
        description="Browse all our articles across all categories"
        showPagination={true}
        currentPage={1}
        totalPages={15}
        basePath="/articles/page"
      />
    </div>
  )
}
