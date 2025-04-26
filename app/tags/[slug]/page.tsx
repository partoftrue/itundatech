import { Button } from "@/components/ui/button"
import { getTags } from "@/lib/articles"
import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArticleListItem } from "@/components/article-list-item"

export default async function TagPage({ params }: { params: { slug: string } }) {
  const supabase = createServerSupabaseClient()

  // Get the tag
  const { data: tag, error } = await supabase.from("tags").select("*").eq("slug", params.slug).single()

  if (error || !tag) {
    notFound()
  }

  // Get articles with this tag
  const { data: articleTagsData } = await supabase
    .from("article_tags")
    .select(`
      article_id,
      tags!inner (
        id,
        slug
      )
    `)
    .eq("tags.slug", params.slug)

  const articleIds = articleTagsData?.map((item) => item.article_id) || []

  // If no articles with this tag, return empty array
  if (articleIds.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">#{tag.name}</h1>
        <p className="text-muted-foreground mb-8">No articles found with this tag.</p>
        <Button asChild className="rounded-full">
          <Link href="/articles">Browse All Articles</Link>
        </Button>
      </div>
    )
  }

  // Get the articles
  const { data: articles } = await supabase
    .from("articles")
    .select(`
      *,
      users!articles_author_id_fkey (
        id,
        name,
        avatar_url
      ),
      categories!articles_category_id_fkey (
        id,
        name,
        slug
      )
    `)
    .in("id", articleIds)
    .eq("published", true)
    .order("created_at", { ascending: false })

  // Get popular tags
  const tags = await getTags()

  const formattedArticles =
    articles?.map((article) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      coverImage: article.cover_image || "/placeholder.svg?height=400&width=600",
      date: new Date(article.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      category: article.categories?.name || "Uncategorized",
      categorySlug: article.categories?.slug || "uncategorized",
      author: {
        name: article.users?.name || "Anonymous",
        avatar: article.users?.avatar_url || "/placeholder.svg?height=100&width=100",
      },
    })) || []

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">#{tag.name}</h1>

          {formattedArticles.length > 0 ? (
            <div className="divide-y">
              {formattedArticles.map((article) => (
                <ArticleListItem key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No articles found with this tag.</p>
              <Button asChild className="rounded-full">
                <Link href="/articles">Browse All Articles</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div>
              <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <Link key={t.id} href={`/tags/${t.slug}`}>
                    <Button variant={t.slug === params.slug ? "default" : "outline"} size="sm" className="rounded-full">
                      #{t.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
