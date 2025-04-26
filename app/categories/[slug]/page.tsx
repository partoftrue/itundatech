import { getArticles, getCategories } from "@/lib/articles"
import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { ArticleListItem } from "@/components/article-list-item"
import { CategoryTabs } from "@/components/category-tabs"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()

  // Get the category
  const { data: category, error } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (error || !category) {
    notFound()
  }

  const articles = await getArticles({ category: params.slug, limit: 12 })
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
        <h1 className="text-2xl font-bold mb-6">{category.name}</h1>

        <div className="divide-y">
          {articles.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
