import { getArticles } from "@/lib/articles"
import { ArticleListItem } from "@/components/article-list-item"
import { CategoryTabs } from "@/components/category-tabs"

export default async function Home() {
  const allArticles = await getArticles({ limit: 10 })

  const categories = [
    { name: "All", href: "/" },
    { name: "Developer", href: "/categories/developer" },
    { name: "Data/ML", href: "/categories/data-ml" },
    { name: "Design", href: "/categories/design" },
  ]

  return (
    <div>
      {/* Category Tabs */}
      <CategoryTabs categories={categories} />

      {/* Articles List */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="divide-y">
          {allArticles.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
