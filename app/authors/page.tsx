import { createServerSupabaseClient } from "@/lib/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default async function AuthorsPage() {
  const supabase = createServerSupabaseClient()

  // Get authors with article counts
  const { data: authors, error } = await supabase
    .from("users")
    .select(`
      id,
      name,
      avatar_url,
      bio,
      articles:articles(count)
    `)
    .order("name")

  if (error) {
    console.error("Error fetching authors:", error)
    return <div>Error loading authors</div>
  }

  // Filter to authors with at least one article
  const activeAuthors = authors
    .filter((author) => author.articles.length > 0)
    .map((author) => ({
      ...author,
      articleCount: author.articles.length,
    }))
    .sort((a, b) => b.articleCount - a.articleCount)

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Our Authors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeAuthors.map((author) => (
          <Link key={author.id} href={`/author/${author.id}`} className="block group">
            <div className="bg-background border rounded-xl p-6 transition-all hover:shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={author.avatar_url || ""} alt={author.name} />
                  <AvatarFallback>{author.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-medium group-hover:text-brand transition-colors">{author.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {author.articleCount} article{author.articleCount !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              {author.bio && <p className="text-sm text-muted-foreground line-clamp-3">{author.bio}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
