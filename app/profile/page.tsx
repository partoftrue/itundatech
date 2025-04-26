import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"
import Link from "next/link"
import { PenLine, Settings, FileText, MessageSquare, BarChart } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth")
  }

  // Get user profile
  const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  // Get user's articles
  const { data: articles } = await supabase
    .from("articles")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("author_id", session.user.id)
    .order("created_at", { ascending: false })

  // Get user's comments
  const { data: comments } = await supabase
    .from("comments")
    .select(`
      *,
      articles (
        id,
        title,
        slug
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="bg-toss-navy text-white py-12">
        <div className="toss-container">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarImage src={profile?.avatar_url || ""} alt={profile?.name || "User"} />
                <AvatarFallback className="text-2xl">{profile?.name?.substring(0, 2) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{profile?.name || "User"}</h1>
                <p className="text-white/70 mb-4">{profile?.bio || "No bio provided"}</p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link href="/profile/edit">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link href="/admin/articles">
                      <FileText className="h-4 w-4 mr-2" />
                      Manage Articles
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-white/20 hover:bg-white/10"
                    asChild
                  >
                    <Link href="/dashboard">
                      <BarChart className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="toss-container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Content */}
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="articles"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-toss-blue data-[state=active]:text-toss-blue px-4 py-2 text-sm font-medium"
              >
                My Articles
              </TabsTrigger>
              <TabsTrigger
                value="comments"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-toss-blue data-[state=active]:text-toss-blue px-4 py-2 text-sm font-medium"
              >
                My Comments
              </TabsTrigger>
            </TabsList>
            <TabsContent value="articles" className="mt-0">
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
                              <span className="text-xs text-muted-foreground">{timeAgo}</span>
                              <span className="text-xs text-muted-foreground">
                                {article.published ? "Published" : "Draft"}
                              </span>
                            </div>
                            <h2 className="text-xl font-medium mb-2">{article.title}</h2>
                            <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                          </div>
                          <div className="flex gap-2 md:flex-shrink-0">
                            <Button variant="outline" size="sm" className="rounded-full" asChild>
                              <Link href={`/admin/articles/${article.id}`}>
                                <PenLine className="h-4 w-4 mr-2" /> Edit
                              </Link>
                            </Button>
                            {article.published && (
                              <Button variant="outline" size="sm" className="rounded-full" asChild>
                                <Link href={`/articles/${article.slug}`}>View</Link>
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
                  <p className="text-muted-foreground mb-4">You haven't published any articles yet.</p>
                  <Button asChild className="rounded-full">
                    <Link href="/admin/articles/new">Write Your First Article</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="comments" className="mt-0">
              {comments && comments.length > 0 ? (
                <div className="divide-y">
                  {comments.map((comment) => {
                    // Format the date
                    const dateObj = new Date(comment.created_at)
                    const timeAgo = formatDistanceToNow(dateObj, { addSuffix: true })

                    return (
                      <div key={comment.id} className="py-6">
                        <div className="mb-2">
                          <Link
                            href={`/articles/${comment.articles?.slug}`}
                            className="text-toss-blue hover:underline font-medium"
                          >
                            {comment.articles?.title}
                          </Link>
                          <span className="mx-2 text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{timeAgo}</span>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg mb-4">
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex justify-end">
                          <Button variant="ghost" size="sm" className="rounded-full" asChild>
                            <Link href={`/articles/${comment.articles?.slug}`}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              View Discussion
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-muted/30 rounded-lg">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">You haven't made any comments yet.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
