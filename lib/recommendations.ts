import { createServerSupabaseClient } from "./supabase"
import { getArticles } from "./articles"

// Types for recommendation engine
interface ReadingHistoryItem {
  id: string
  slug: string
  category: string
  categorySlug: string
  tags?: { id: string; name: string; slug: string }[]
}

interface RecommendationScore {
  articleId: string
  score: number
}

export async function getRecommendedArticles({
  readingHistory,
  limit = 4,
  excludeIds = [],
}: {
  readingHistory: ReadingHistoryItem[]
  limit?: number
  excludeIds?: string[]
}) {
  if (!readingHistory.length) {
    // If no reading history, return recent articles
    return getArticles({ limit })
  }

  // Extract categories and their frequency from reading history
  const categoryFrequency: Record<string, number> = {}
  readingHistory.forEach((item) => {
    if (item.category) {
      categoryFrequency[item.categorySlug] = (categoryFrequency[item.categorySlug] || 0) + 1
    }
  })

  // Get the top categories (sorted by frequency)
  const topCategories = Object.entries(categoryFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([slug]) => slug)

  // Get articles from top categories
  const supabase = createServerSupabaseClient()

  // Create a list of IDs to exclude (already read articles)
  const idsToExclude = [...new Set([...excludeIds, ...readingHistory.map((item) => item.id)])]

  // Query for articles in the top categories that haven't been read yet
  let query = supabase
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
    .not("id", "in", `(${idsToExclude.join(",")})`)
    .order("created_at", { ascending: false })
    .limit(limit * 2) // Fetch more than needed to allow for filtering

  if (topCategories.length > 0) {
    query = query.in("categories.slug", topCategories)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching recommended articles:", error)
    return []
  }

  // Transform the data
  const recommendedArticles = data.map((article) => ({
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
    readTime: `${article.read_time || 5} min read`,
    category: article.categories?.name || "Uncategorized",
    categorySlug: article.categories?.slug || "uncategorized",
    author: {
      id: article.users?.id,
      name: article.users?.name || "Anonymous",
      avatar: article.users?.avatar_url || "/placeholder.svg?height=100&width=100",
    },
    // Calculate a relevance score based on category match
    relevanceScore:
      topCategories.indexOf(article.categories?.slug) !== -1
        ? topCategories.length - topCategories.indexOf(article.categories?.slug)
        : 0,
  }))

  // Sort by relevance score (descending) and limit to requested number
  return recommendedArticles.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, limit)
}
