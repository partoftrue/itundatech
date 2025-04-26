import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CommentSection } from "@/components/comments/comment-section"
import { ReadingProgress } from "@/components/reading-progress"
import { getArticleBySlug } from "@/lib/articles"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { CategoryTabs } from "@/components/category-tabs"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The article you're looking for doesn't exist or has been removed.",
    }
  }

  return {
    title: `${article.title} | itunda.tech`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
      type: "article",
      authors: [article.author.name],
    },
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const categories = [
    { name: "All", href: "/articles" },
    { name: "Developer", href: "/categories/developer" },
    { name: "Data/ML", href: "/categories/data-ml" },
    { name: "Design", href: "/categories/design" },
  ]

  return (
    <>
      <ReadingProgress />

      {/* Category Tabs */}
      <CategoryTabs categories={categories} />

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          {/* Article Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{article.title}</h1>
            <p className="text-lg text-muted-foreground mb-6">{article.excerpt}</p>

            {/* Author and Date */}
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="text-sm text-muted-foreground">
                {article.date} · {article.author.name}
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden mb-8">
            <Image
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Main Content */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Comments Section */}
          <CommentSection articleId={article.id} />
        </article>
      </div>
    </>
  )
}
