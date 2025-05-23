import { createServerSupabaseClient } from "./supabase"
import { remark } from "remark"
import html from "remark-html"

export async function getArticles({
  limit = 6,
  category = null,
  tag = null,
  published = true,
}: {
  limit?: number
  category?: string | null
  tag?: string | null
  published?: boolean
} = {}) {
  const supabase = createServerSupabaseClient()

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
    .eq("published", published)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (category) {
    query = query.eq("categories.slug", category)
  }

  if (tag) {
    query = query.eq("article_tags.tags.slug", tag)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching articles:", error)
    return []
  }

  return data.map((article) => ({
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
  }))
}

export async function getArticleBySlug(slug: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      *,
      users!articles_author_id_fkey (
        id,
        name,
        avatar_url,
        bio
      ),
      categories!articles_category_id_fkey (
        id,
        name,
        slug
      )
    `)
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !data) {
    console.error("Error fetching article:", error)
    return null
  }

  // Get tags for this article
  const { data: tagData } = await supabase
    .from("article_tags")
    .select(`
      tags (
        id,
        name,
        slug
      )
    `)
    .eq("article_id", data.id)

  const tags = tagData?.map((item) => item.tags) || []

  // Process markdown content to HTML
  const processedContent = await remark().use(html).process(data.content)

  const contentHtml = processedContent.toString()

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: contentHtml,
    coverImage: data.cover_image || "/placeholder.svg?height=600&width=1200",
    date: new Date(data.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    readTime: `${data.read_time || 5} min read`,
    category: data.categories?.name || "Uncategorized",
    categorySlug: data.categories?.slug || "uncategorized",
    author: {
      id: data.users?.id,
      name: data.users?.name || "Anonymous",
      avatar: data.users?.avatar_url || "/placeholder.svg?height=100&width=100",
      bio: data.users?.bio || "",
    },
    tags: tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    })),
  }
}

export async function getRelatedArticles(articleId: string, category: string, limit = 2) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      cover_image,
      created_at,
      read_time,
      categories!articles_category_id_fkey (
        name
      )
    `)
    .eq("categories.name", category)
    .neq("id", articleId)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching related articles:", error)
    return []
  }

  return data.map((article) => ({
    id: article.id,
    title: article.title,
    slug: article.slug,
    coverImage: article.cover_image || "/placeholder.svg?height=200&width=200",
    date: new Date(article.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
    readTime: `${article.read_time || 5} min read`,
  }))
}

export async function getCategories() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data
}

export async function getTags() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("tags").select("*").order("name")

  if (error) {
    console.error("Error fetching tags:", error)
    return []
  }

  return data
}
