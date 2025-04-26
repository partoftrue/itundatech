import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createServerSupabaseClient } from "@/lib/supabase"
import { BarChart, PieChart, LineChart } from "lucide-react"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth")
  }

  // Get article statistics
  const { data: articleStats } = await supabase
    .from("articles")
    .select(`
      id,
      title,
      category_id,
      created_at,
      categories (
        name
      )
    `)
    .order("created_at", { ascending: false })

  // Get comment statistics
  const { data: commentStats } = await supabase
    .from("comments")
    .select(`
      id,
      article_id,
      created_at,
      articles (
        title
      )
    `)
    .order("created_at", { ascending: false })

  // Calculate statistics
  const totalArticles = articleStats?.length || 0
  const articlesByCategory = articleStats?.reduce((acc: Record<string, number>, article) => {
    const category = article.categories?.name || "Uncategorized"
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  const totalComments = commentStats?.length || 0
  const commentsPerArticle = commentStats?.reduce((acc: Record<string, number>, comment) => {
    const articleTitle = comment.articles?.title || "Unknown"
    acc[articleTitle] = (acc[articleTitle] || 0) + 1
    return acc
  }, {})

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              {totalArticles > 0 ? "+1 from last month" : "No articles yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
            <p className="text-xs text-muted-foreground">
              {totalComments > 0 ? "+2 from last month" : "No comments yet"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalArticles > 0 ? `${((totalComments / totalArticles) * 100).toFixed(1)}%` : "0%"}
            </div>
            <p className="text-xs text-muted-foreground">Comments per article</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList>
          <TabsTrigger value="articles">Articles by Category</TabsTrigger>
          <TabsTrigger value="comments">Comments by Article</TabsTrigger>
        </TabsList>
        <TabsContent value="articles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Article Distribution</CardTitle>
              <CardDescription>Breakdown of articles by category</CardDescription>
            </CardHeader>
            <CardContent>
              {articlesByCategory && Object.keys(articlesByCategory).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(articlesByCategory).map(([category, count]) => (
                    <div key={category} className="flex items-center">
                      <div className="w-1/3 font-medium">{category}</div>
                      <div className="w-2/3">
                        <div className="flex items-center">
                          <div
                            className="h-2 bg-primary rounded"
                            style={{ width: `${(count / totalArticles) * 100}%` }}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">{count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No article data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comment Activity</CardTitle>
              <CardDescription>Comments per article</CardDescription>
            </CardHeader>
            <CardContent>
              {commentsPerArticle && Object.keys(commentsPerArticle).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(commentsPerArticle).map(([article, count]) => (
                    <div key={article} className="flex items-center">
                      <div className="w-1/2 font-medium truncate" title={article}>
                        {article}
                      </div>
                      <div className="w-1/2">
                        <div className="flex items-center">
                          <div
                            className="h-2 bg-secondary rounded"
                            style={{ width: `${(count / totalComments) * 100}%` }}
                          />
                          <span className="ml-2 text-sm text-muted-foreground">{count}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No comment data available</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
