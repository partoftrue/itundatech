"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function saveArticle(formData: FormData) {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("You must be logged in to save an article")
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const coverImage = formData.get("coverImage") as string
  const categoryId = formData.get("categoryId") as string
  const published = formData.get("published") === "true"
  const tagIds = formData.getAll("tagIds") as string[]

  // Calculate read time (rough estimate: 200 words per minute)
  const wordCount = content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-")
    .substring(0, 60)

  try {
    let articleId = id

    if (id) {
      // Update existing article
      const { error } = await supabase
        .from("articles")
        .update({
          title,
          excerpt,
          content,
          cover_image: coverImage,
          category_id: categoryId || null,
          published,
          read_time: readTime,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .eq("author_id", session.user.id)

      if (error) throw error
    } else {
      // Create new article
      const { data, error } = await supabase
        .from("articles")
        .insert({
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImage,
          category_id: categoryId || null,
          published,
          read_time: readTime,
          author_id: session.user.id,
        })
        .select("id")
        .single()

      if (error) throw error
      articleId = data.id
    }

    // Handle tags if we have an article ID
    if (articleId && tagIds.length > 0) {
      // First, remove existing tags
      const { error: deleteError } = await supabase.from("article_tags").delete().eq("article_id", articleId)
      if (deleteError) throw deleteError

      // Then, add new tags
      const tagInserts = tagIds.map((tagId) => ({
        article_id: articleId,
        tag_id: tagId,
      }))

      const { error: insertError } = await supabase.from("article_tags").insert(tagInserts)
      if (insertError) throw insertError
    }

    revalidatePath("/admin/articles")
    revalidatePath("/articles")
    revalidatePath(`/articles/${slug}`)

    return { success: true, id: articleId }
  } catch (error) {
    console.error("Error saving article:", error)
    return { success: false, error: "Failed to save article" }
  }
}

export async function deleteArticle(id: string) {
  const supabase = createServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) {
    throw new Error("You must be logged in to delete an article")
  }

  try {
    // First, get the article to check ownership
    const { data: article, error: fetchError } = await supabase
      .from("articles")
      .select("author_id")
      .eq("id", id)
      .single()

    if (fetchError) throw fetchError

    // Check if the user is the author
    if (article.author_id !== session.user.id) {
      throw new Error("You can only delete your own articles")
    }

    // Delete the article
    const { error } = await supabase.from("articles").delete().eq("id", id)
    if (error) throw error

    revalidatePath("/admin/articles")
    revalidatePath("/articles")

    return { success: true }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { success: false, error: "Failed to delete article" }
  }
}
