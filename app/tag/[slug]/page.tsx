import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { ArticleList } from "@/components/article-list"
import { Breadcrumbs } from "@/components/breadcrumbs"

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
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <Breadcrumbs
          items={[
            { label: "Tags", href: "/tags" },
            { label: tag.name, href: `/tag/${tag.slug}`, active: true },
          ]}
          className="mb-8"
        />

        <ArticleList
          title={`#${tag.name}`}
          description="Articles tagged with this topic"
          articles={[]}
          emptyMessage={`No articles found with the tag #${tag.name}`}
          emptyAction={{
            text: "Browse All Articles",
            href: "/articles",
          }}
        />
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
        id: article.users?.id,
        name: article.users?.name || "Anonymous",
        avatar: article.users?.avatar_url || "/placeholder.svg?height=100&width=100",
      },
    })) || []

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <Breadcrumbs
        items={[
          { label: "Tags", href: "/tags" },
          { label: tag.name, href: `/tag/${tag.slug}`, active: true },
        ]}
        className="mb-8"
      />

      <ArticleList
        title={`#${tag.name}`}
        description="Articles tagged with this topic"
        articles={formattedArticles}
        emptyMessage={`No articles found with the tag #${tag.name}`}
        emptyAction={{
          text: "Browse All Articles",
          href: "/articles",
        }}
      />
    </div>
  )
}
