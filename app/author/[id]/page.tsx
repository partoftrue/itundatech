import { createServerSupabaseClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArticleList } from "@/components/article-list"

export default async function AuthorPage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()

  // Get author
  const { data: author, error } = await supabase
    .from("users")
    .select(`
      id,
      name,
      avatar_url,
      bio,
      website,
      twitter,
      github
    `)
    .eq("id", params.id)
    .single()

  if (error || !author) {
    notFound()
  }

  // Get author's articles
  const { data: articlesData, error: articlesError } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      slug,
      excerpt,
      cover_image,
      created_at,
      categories:categories(name, slug)
    `)
    .eq("author_id", params.id)
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (articlesError) {
    console.error("Error fetching articles:", articlesError)
    return <div>Error loading articles</div>
  }

  const articles = articlesData.map((article) => ({
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
      name: author.name,
      avatar: author.avatar_url || "/placeholder.svg?height=100&width=100",
    },
  }))

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={author.avatar_url || ""} alt={author.name} />
            <AvatarFallback className="text-2xl">{author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">{author.name}</h1>

            {author.bio && (
              <p className="text-muted-foreground mb-4 max-w-2xl text-center sm:text-left">{author.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              {author.website && (
                <a
                  href={author.website.startsWith("http") ? author.website : `https://${author.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand hover:underline"
                >
                  Website
                </a>
              )}

              {author.twitter && (
                <a
                  href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand hover:underline"
                >
                  Twitter
                </a>
              )}

              {author.github && (
                <a
                  href={`https://github.com/${author.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand hover:underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <ArticleList
        articles={articles}
        title={`Articles by ${author.name}`}
        emptyMessage={`${author.name} hasn't published any articles yet.`}
      />
    </div>
  )
}
