import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleForm } from "@/components/editor/article-form"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect } from "next/navigation"

export default async function NewArticlePage() {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth")
  }

  // Get categories and tags
  const { data: categories } = await supabase.from("categories").select("*").order("name")
  const { data: tags } = await supabase.from("tags").select("*").order("name")

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
          <CardDescription>Write and publish a new article to share your insights</CardDescription>
        </CardHeader>
        <CardContent>
          <ArticleForm categories={categories || []} tags={tags || []} />
        </CardContent>
      </Card>
    </div>
  )
}
