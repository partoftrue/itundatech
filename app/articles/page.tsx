import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getArticles, getCategories } from "@/lib/articles"
import { ArticleListItem } from "@/components/article-list-item"

export default async function ArticlesPage() {
  const articles = await getArticles({ limit: 12 })
  const categories = await getCategories()

  return (
    <div>
      <div className="bg-toss-navy text-white py-12">
        <div className="toss-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
              All <span className="text-toss-blue">Articles</span>
            </h1>
            <p className="text-lg text-white/70">Explore our collection of developer and designer insights</p>
          </div>
        </div>
      </div>

      <div className="toss-container py-12">
        {/* Categories */}
        <div className="border-b mb-8 pb-4">
          <div className="flex flex-wrap gap-2">
            <Link href="/articles">
              <Button variant="ghost" size="sm" className="rounded-full bg-muted text-toss-blue">
                All
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <Button variant="ghost" size="sm" className="rounded-full">
                  {category.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles List */}
        <div className="divide-y">
          {articles.map((article) => (
            <ArticleListItem key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  )
}
