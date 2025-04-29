import { createServerSupabaseClient } from "./supabase"

// Add a simple in-memory cache
let categoriesCache: {
  data: Category[] | null
  timestamp: number
} = {
  data: null,
  timestamp: 0,
}

// Cache expiration time (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  count?: number
}

// Helper function to implement retry logic
async function fetchWithRetry<T>(fetchFn: () => Promise<T>, maxRetries = 3, initialDelay = 1000): Promise<T> {
  let retries = 0

  while (true) {
    try {
      return await fetchFn()
    } catch (error) {
      if (retries >= maxRetries) {
        throw error
      }

      // Check if it's a rate limit error
      const isRateLimit =
        error instanceof Error && (error.message.includes("Too Many") || error.message.includes("429"))

      if (!isRateLimit) {
        throw error
      }

      // Exponential backoff
      const delay = initialDelay * Math.pow(2, retries)
      console.log(`Rate limited, retrying in ${delay}ms...`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      retries++
    }
  }
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    // Check if we have a valid cache
    const now = Date.now()
    if (categoriesCache.data && now - categoriesCache.timestamp < CACHE_EXPIRATION) {
      return categoriesCache.data
    }

    // If no cache or expired, fetch from Supabase
    const supabase = createServerSupabaseClient()

    const { data, error } = await fetchWithRetry(async () => {
      return await supabase
        .from("categories")
        .select(`
          id,
          name,
          slug,
          description,
          articles:articles(count)
        `)
        .order("name")
    })

    if (error) {
      console.error("Error fetching categories:", error)
      // If we have stale cache, return it rather than empty array
      return categoriesCache.data || []
    }

    const categories = data.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      count: category.articles?.length || 0,
    }))

    // Update cache
    categoriesCache = {
      data: categories,
      timestamp: now,
    }

    return categories
  } catch (error) {
    console.error("Error in getAllCategories:", error)
    // Return cached data if available, otherwise empty array
    return categoriesCache.data || []
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await fetchWithRetry(async () => {
      return await supabase
        .from("categories")
        .select(`
          id,
          name,
          slug,
          description,
          articles:articles(count)
        `)
        .eq("slug", slug)
        .single()
    })

    if (error || !data) {
      console.error("Error fetching category:", error)
      return null
    }

    return {
      id: data.id,
      name: data.name,
      slug: data.slug,
      description: data.description,
      count: data.articles?.length || 0,
    }
  } catch (error) {
    console.error("Error in getCategoryBySlug:", error)
    return null
  }
}
