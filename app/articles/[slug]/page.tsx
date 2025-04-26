import { getArticleBySlug, getRelatedArticles } from "@/lib/articles"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { TableOfContents } from "@/components/table-of-contents"
import { ReadingProgress } from "@/components/reading-progress"
import { SocialShare } from "@/components/social-share"
import { BookmarkButton } from "@/components/bookmark-button"
import { CommentSection } from "@/components/comments/comment-section"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.id, article.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <ReadingProgress />

      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <Link href={`/categories/${article.categorySlug}`} className="text-sm font-medium text-brand hover:underline">
            {article.category}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">{article.title}</h1>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href={`/author/${article.author.id}`}>
                <Image
                  src={article.author.avatar || "/placeholder.svg"}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
              </Link>
              <div>
                <Link href={`/author/${article.author.id}`} className="font-medium hover:text-brand">
                  {article.author.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  {article.date} · {article.readTime}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BookmarkButton articleId={article.id} />
              <SocialShare url={`/articles/${article.slug}`} title={article.title} description={article.excerpt} />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-24">
              <TableOfContents content={article.content} />

              {article.tags.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link key={tag.id} href={`/tags/${tag.slug}`}>
                        <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm hover:bg-muted/80">
                          #{tag.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {relatedArticles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <Link key={relatedArticle.id} href={`/articles/${relatedArticle.slug}`}>
                        <div className="group">
                          <div className="relative aspect-video w-full mb-2 rounded-lg overflow-hidden">
                            <Image
                              src={relatedArticle.coverImage || "/placeholder.svg"}
                              alt={relatedArticle.title}
                              fill
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <h4 className="font-medium group-hover:text-brand line-clamp-2">{relatedArticle.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {relatedArticle.date} · {relatedArticle.readTime}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <article className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            {/* Author Bio */}
            <div className="mt-12 p-6 bg-muted/30 rounded-lg">
              <div className="flex items-start gap-4">
                <Link href={`/author/${article.author.id}`}>
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                </Link>
                <div>
                  <Link href={`/author/${article.author.id}`} className="font-bold text-lg hover:text-brand">
                    {article.author.name}
                  </Link>
                  <p className="text-muted-foreground mt-1">{article.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-12">
              <CommentSection articleId={article.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
