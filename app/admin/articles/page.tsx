import { Button } from "@/components/ui/button"
import { createServerSupabaseClient } from "@/lib/supabase"
import { PenLine, Plus, Eye, FileText } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export default async function AdminArticlesPage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth")
  }

  // Get user's articles
  const { data: articles, error } = await supabase
    .from("articles")
    .select(`
      *,
      categories (
        name
      )
    `)
    .eq("author_id", session.user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching articles:", error)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Articles</h1>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </div>

      {articles && articles.length > 0 ? (
        <div className="divide-y">
          {articles.map((article) => {
            // Format the date
            const dateObj = new Date(article.created_at)
            const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

            return (
              <div key={article.id} className="py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-toss-blue">
                        {article.categories?.name || "Uncategorized"}
                      </span>
                      <Badge variant={article.published ? "default" : "outline"} className="rounded-full">
                        {article.published ? "Published" : "Draft"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{timeAgo}</span>
                    </div>
                    <h2 className="text-xl font-medium mb-2">{article.title}</h2>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{article.excerpt}</p>
                  </div>
                  <div className="flex gap-2 md:flex-shrink-0">
                    <Button variant="outline" size="sm" className="rounded-full" asChild>
                      <Link href={`/admin/articles/${article.id}`}>
                        <PenLine className="h-4 w-4 mr-2" /> Edit
                      </Link>
                    </Button>
                    {article.published && (
                      <Button variant="outline" size="sm" className="rounded-full" asChild>
                        <Link href={`/articles/${article.slug}`}>
                          <Eye className="h-4 w-4 mr-2" /> View
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/30 rounded-lg">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">You haven't created any articles yet.</p>
          <Button asChild className="rounded-full">
            <Link href="/admin/articles/new">Create Your First Article</Link>
          </Button>
        </div>
      )}
    </div>
  )
}
