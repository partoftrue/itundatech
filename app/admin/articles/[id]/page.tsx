import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArticleForm } from "@/components/editor/article-form"
import { createServerSupabaseClient } from "@/lib/supabase"
import { redirect, notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { deleteArticle } from "../actions"
import Link from "next/link"

interface EditArticlePageProps {
  params: {
    id: string
  }
}

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  // Keep using id for admin routes since we're editing by ID
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    redirect("/auth")
  }

  // Get article
  const { data: article, error } = await supabase
    .from("articles")
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq("id", params.id)
    .eq("author_id", session.user.id)
    .single()

  if (error || !article) {
    notFound()
  }

  // Get article tags
  const { data: articleTags } = await supabase
    .from("article_tags")
    .select(`
      tag_id,
      tags (
        id,
        name
      )
    `)
    .eq("article_id", params.id)

  // Get categories and tags
  const { data: categories } = await supabase.from("categories").select("*").order("name")
  const { data: tags } = await supabase.from("tags").select("*").order("name")

  // Format article with tags
  const formattedArticle = {
    ...article,
    tags: articleTags?.map((item) => item.tags) || [],
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Edit Article</CardTitle>
            <CardDescription>Update your article content and settings</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/articles/${article.slug}`} target="_blank">
                View Article
              </Link>
            </Button>
            <form
              action={async () => {
                "use server"
                await deleteArticle(params.id)
                redirect("/admin/articles")
              }}
            >
              <Button variant="destructive" size="sm" type="submit">
                Delete Article
              </Button>
            </form>
          </div>
        </CardHeader>
        <CardContent>
          <ArticleForm article={formattedArticle} categories={categories || []} tags={tags || []} />
        </CardContent>
      </Card>
    </div>
  )
}
