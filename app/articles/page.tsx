import { getArticles, getCategories } from "@/lib/articles"
import { ArticleListItem } from "@/components/article-list-item"
import { CategoryTabs } from "@/components/category-tabs"

export default async function ArticlesPage() {
  const articles = await getArticles({ limit: 12 })
  const dbCategories = await getCategories()

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
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
