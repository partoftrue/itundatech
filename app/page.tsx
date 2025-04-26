import { getArticles } from "@/lib/articles"
import { ArticleCardToss } from "@/components/article-card-toss"
import { CategoryTabs } from "@/components/category-tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
            <ArticleCardToss key={article.id} article={article} />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Button asChild className="rounded-full">
            <Link href="/articles">View All Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
