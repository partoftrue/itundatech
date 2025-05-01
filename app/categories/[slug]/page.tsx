import Link from "next/link"
import { getArticles, getCategories } from "@/lib/articles"
import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { ArticleListItem } from "@/components/article-list-item"
import { Button } from "@/components/ui/button"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()

  // Get the category
  const { data: category, error } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (error || !category) {
    notFound()
  }

  const articles = await getArticles({ category: params.slug, limit: 12 })
  const categories = await getCategories()

  return (
    <div>
      {/* Category Tabs */}
      <div className="border-b">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            <Link
              href="/articles"
              className={`py-4 px-6 ${params.slug === "all" ? "border-b-2 border-toss-blue text-toss-blue font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className={`py-4 px-6 ${cat.slug === params.slug ? "border-b-2 border-toss-blue text-toss-blue font-medium" : "text-muted-foreground hover:text-foreground"}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Articles */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-medium mb-8">{category.name}</h1>

            {articles.length > 0 ? (
              <div className="divide-y">
                {articles.map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No articles found in this category.</p>
                <Button asChild className="rounded-full">
                  <Link href="/articles">Browse All Articles</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-muted/30 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-4">About {category.name}</h3>
                <p className="text-muted-foreground">
                  {category.description ||
                    `Explore our collection of ${category.name.toLowerCase()} insights and articles.`}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Popular Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.slug}`}
                      className={`block py-2 ${cat.slug === params.slug ? "text-toss-blue font-medium" : "text-muted-foreground hover:text-foreground"}`}
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
