import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { SearchIcon } from "lucide-react"
import { ArticleListItem } from "@/components/article-list-item"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""
  const supabase = createServerSupabaseClient()

  let results = []

  if (query) {
    const { data, error } = await supabase
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
      .or(`title.ilike.%${query}%, excerpt.ilike.%${query}%, content.ilike.%${query}%`)
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error searching articles:", error)
    } else {
      results = data.map((article) => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
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
      }))
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Articles</h1>

        <form className="flex gap-2 mb-12">
          <Input type="search" name="q" placeholder="Search for articles..." defaultValue={query} className="flex-1" />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {query ? (
          <>
            <h2 className="text-xl font-semibold mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for "{query}"
            </h2>

            {results.length > 0 ? (
              <div className="divide-y">
                {results.map((article) => (
                  <ArticleListItem key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No articles found matching your search.</p>
                <Button variant="outline" asChild>
                  <Link href="/">Browse All Articles</Link>
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Enter a search term to find articles.</p>
          </div>
        )}
      </div>
    </div>
  )
}
