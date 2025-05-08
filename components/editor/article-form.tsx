"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RichTextEditor } from "./rich-text-editor"
import { saveArticle } from "@/app/admin/articles/actions"
import { MultiSelect } from "./multi-select"
import { useToast } from "@/hooks/use-toast"

interface ArticleFormProps {
  article?: any
  categories: any[]
  tags: any[]
}

export function ArticleForm({ article, categories, tags }: ArticleFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [title, setTitle] = useState(article?.title || "")
  const [excerpt, setExcerpt] = useState(article?.excerpt || "")
  const [content, setContent] = useState(article?.content || "")
  const [coverImage, setCoverImage] = useState(article?.cover_image || "")
  const [categoryId, setCategoryId] = useState(article?.category_id || "")
  const [published, setPublished] = useState(article?.published || false)
  const [selectedTags, setSelectedTags] = useState<string[]>(article?.tags?.map((t: any) => t.id) || [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      if (article?.id) formData.append("id", article.id)
      formData.append("title", title)
      formData.append("excerpt", excerpt)
      formData.append("content", content)
      formData.append("coverImage", coverImage)
      formData.append("categoryId", categoryId)
      formData.append("published", published.toString())

      // Add selected tags
      selectedTags.forEach((tagId) => {
        formData.append("tagIds", tagId)
      })

      const result = await saveArticle(formData)

      if (result.success) {
        toast({
          title: "Success",
          description: article?.id ? "Article updated successfully" : "Article created successfully",
        })
        router.push("/admin/articles")
      } else {
        throw new Error(result.error || "Failed to save article")
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of the article"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <RichTextEditor content={content} onChange={setContent} placeholder="Write your article content here..." />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
        {coverImage && (
          <div className="mt-2 border rounded-md overflow-hidden h-40 bg-muted/40 flex items-center justify-center">
            <img
              src={coverImage || "/placeholder.svg"}
              alt="Cover preview"
              className="max-h-full max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=300&width=500"
              }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <MultiSelect
            options={tags.map((tag) => ({ value: tag.id, label: tag.name }))}
            selected={selectedTags}
            onChange={setSelectedTags}
            placeholder="Select tags"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="published" checked={published} onCheckedChange={(checked) => setPublished(checked as boolean)} />
        <Label htmlFor="published" className="cursor-pointer">
          Publish this article
        </Label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : article?.id ? "Update Article" : "Create Article"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/articles")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
