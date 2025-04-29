import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createServerSupabaseClient } from "@/lib/supabase"
import Link from "next/link"
import { SearchIcon, Filter, X } from "lucide-react"
import { ArticleList } from "@/components/article-list"
import { getAllCategories } from "@/lib/categories"
import { getTags } from "@/lib/articles"
import { Badge } from "@/components/ui/badge"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const query = typeof searchParams.q === "string" ? searchParams.q : ""
  const categoryFilter = typeof searchParams.category === "string" ? searchParams.category : ""
  const tagFilter = typeof searchParams.tag === "string" ? searchParams.tag : ""

  const supabase = createServerSupabaseClient()
  const categories = await getAllCategories()
  const tags = await getTags()

  let results = []

  if (query || categoryFilter || tagFilter) {
    let articlesQuery = supabase
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
      .eq("published", true)
      .order("created_at", { ascending: false })

    // Apply search query if provided
    if (query) {
      articlesQuery = articlesQuery.or(`title.ilike.%${query}%, excerpt.ilike.%${query}%, content.ilike.%${query}%`)
    }

    // Apply category filter if provided
    if (categoryFilter) {
      articlesQuery = articlesQuery.eq("categories.slug", categoryFilter)
    }

    // Apply tag filter if provided
    if (tagFilter) {
      // First get article IDs that have this tag
      const { data: articleIds } = await supabase
        .from("article_tags")
        .select("article_id")
        .eq("tags.slug", tagFilter)
        .join("tags", { "article_tags.tag_id": "tags.id" })

      if (articleIds && articleIds.length > 0) {
        articlesQuery = articlesQuery.in(
          "id",
          articleIds.map((item) => item.article_id),
        )
      } else if (tagFilter) {
        // If tag filter is provided but no articles match, return empty results
        results = []
      }
    }

    if (!tagFilter || (tagFilter && results.length !== 0)) {
      const { data, error } = await articlesQuery

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
  }

  // Build query string for filters
  const buildQueryString = (params: { [key: string]: string }) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value)
    })
    return searchParams.toString()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Search Articles</h1>

        <form className="flex gap-2 mb-8">
          <Input type="search" name="q" placeholder="Search for articles..." defaultValue={query} className="flex-1" />
          <Button type="submit">
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </form>

        {/* Active filters */}
        {(categoryFilter || tagFilter) && (
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm text-muted-foreground">Active filters:</span>

            {categoryFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {categories.find((c) => c.slug === categoryFilter)?.name || categoryFilter}
                <Link href={`/search?${buildQueryString({ q: query, tag: tagFilter })}`}>
                  <X className="h-3 w-3 ml-1" />
                </Link>
              </Badge>
            )}

            {tagFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Tag: {tags.find((t) => t.slug === tagFilter)?.name || tagFilter}
                <Link href={`/search?${buildQueryString({ q: query, category: categoryFilter })}`}>
                  <X className="h-3 w-3 ml-1" />
                </Link>
              </Badge>
            )}

            <Link href="/search" className="text-sm text-brand hover:underline">
              Clear all filters
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="md:col-span-3">
            {query || categoryFilter || tagFilter ? (
              <ArticleList
                articles={results}
                title={`${results.length} result${results.length !== 1 ? "s" : ""}${query ? ` for "${query}"` : ""}`}
                emptyMessage="No articles found matching your search criteria."
                emptyAction={{
                  text: "Browse All Articles",
                  href: "/articles",
                }}
              />
            ) : (
              <div className="text-center py-12 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground mb-4">Enter a search term or use filters to find articles.</p>
              </div>
            )}
          </div>

          {/* Sidebar with filters */}
          <div className="md:col-span-1">
            <div className="bg-muted/30 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-4 w-4" />
                <h3 className="font-medium">Filter Results</h3>
              </div>

              {/* Categories filter */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        href={`/search?${buildQueryString({ q: query, category: category.slug, tag: tagFilter })}`}
                        className={`text-sm hover:text-brand ${categoryFilter === category.slug ? "text-brand font-medium" : ""}`}
                      >
                        {category.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags filter */}
              <div>
                <h4 className="text-sm font-medium mb-2">Popular Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 10).map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/search?${buildQueryString({ q: query, category: categoryFilter, tag: tag.slug })}`}
                    >
                      <Badge variant={tagFilter === tag.slug ? "default" : "outline"} className="cursor-pointer">
                        {tag.name}
                      </Badge>
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
