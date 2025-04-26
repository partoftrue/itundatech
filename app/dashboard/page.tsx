import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { CategoryOverview } from "@/components/dashboard/category-overview"
import { TagCloud } from "@/components/dashboard/tag-cloud"
import { RecentArticles } from "@/components/dashboard/recent-articles"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies })

  // Fetch statistics
  const { data: articleCount } = await supabase.from("articles").select("*", { count: "exact", head: true })

  const { data: categoryCount } = await supabase.from("categories").select("*", { count: "exact", head: true })

  const { data: tagCount } = await supabase.from("tags").select("*", { count: "exact", head: true })

  const { data: userCount } = await supabase.from("users").select("*", { count: "exact", head: true })

  // Fetch categories with article counts
  const { data: categories } = await supabase
    .from("categories")
    .select(`
      id,
      name,
      slug,
      articles:articles(count)
    `)
    .order("name")

  // Process categories to include article count
  const categoriesWithCount =
    categories?.map((category) => ({
      ...category,
      articleCount: category.articles.length,
    })) || []

  // Fetch tags with article counts
  const { data: tags } = await supabase
    .from("tags")
    .select(`
      id,
      name,
      slug,
      articles:article_tags(count)
    `)
    .order("name")

  // Process tags to include article count
  const tagsWithCount =
    tags?.map((tag) => ({
      ...tag,
      articleCount: tag.articles.length,
    })) || []

  // Fetch recent articles
  const { data: recentArticles } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image,
      read_time,
      created_at,
      author:users(name, avatar_url),
      category:categories(name, slug)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Content Dashboard</h1>

      <DashboardStats
        articleCount={articleCount?.count || 0}
        categoryCount={categoryCount?.count || 0}
        tagCount={tagCount?.count || 0}
        userCount={userCount?.count || 0}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <CategoryOverview categories={categoriesWithCount} />
        <TagCloud tags={tagsWithCount} />
      </div>

      <RecentArticles articles={recentArticles || []} />
    </div>
  )
}
