import { getArticleBySlug, getRelatedArticles } from "@/lib/articles"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { TableOfContents } from "@/components/table-of-contents"
import { SocialShare } from "@/components/social-share"
import { BookmarkButton } from "@/components/bookmark-button"
import { CommentSection } from "@/components/comments/comment-section"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { RelatedArticles } from "@/components/related-articles"
import { ReadingHistoryTracker } from "@/components/reading-history-tracker"
import { ArticleRecommendations } from "@/components/article-recommendations"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"
import { ArticleProgress } from "@/components/article-progress"
import { FloatingActionButton } from "@/components/floating-action-button"
import { PageTransition } from "@/components/page-transition"
import { ScrollReveal } from "@/components/scroll-reveal"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = await getRelatedArticles(article.id, article.category)

  // Generate breadcrumb items
  const breadcrumbItems = [
    { label: "Articles", href: "/articles" },
    { label: article.category, href: `/category/${article.categorySlug}` },
    { label: article.title, href: `/articles/${article.slug}`, active: true },
  ]

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <ArticleProgress />
        <ReadingHistoryTracker
          article={{
            id: article.id,
            slug: article.slug,
            title: article.title,
            coverImage: article.coverImage,
            category: article.category,
            categorySlug: article.categorySlug,
          }}
        />

        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <ScrollReveal>
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          </ScrollReveal>

          {/* Article Header */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10">
              <Link href={`/category/${article.categorySlug}`} className="inline-block mb-3">
                <Badge
                  variant="outline"
                  className="rounded-full bg-primary/10 text-primary border-primary/20 px-4 py-1"
                >
                  {article.category}
                </Badge>
              </Link>
              <h1 className="text-3xl md:text-4xl font-medium mb-6 leading-tight">{article.title}</h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href={`/author/${article.author.id}`} className="flex items-center group">
                    <Image
                      src={article.author.avatar || "/placeholder.svg"}
                      alt={article.author.name}
                      width={40}
                      height={40}
                      className="rounded-full mr-3"
                    />
                    <div>
                      <div className="font-medium group-hover:text-primary transition-colors">
                        {article.author.name}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                        <span className="mx-1">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="flex items-center gap-2">
                  <BookmarkButton articleId={article.id} />
                  <SocialShare url={`/articles/${article.slug}`} title={article.title} description={article.excerpt} />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Cover Image */}
          <ScrollReveal delay={0.2}>
            <div className="relative aspect-video w-full mb-10 rounded-2xl overflow-hidden">
              <Image
                src={article.coverImage || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </ScrollReveal>

          {/* Article Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="sticky top-24 space-y-10">
                <ScrollReveal delay={0.3}>
                  <TableOfContents />
                </ScrollReveal>

                {article.tags.length > 0 && (
                  <ScrollReveal delay={0.4}>
                    <div>
                      <h3 className="text-lg font-medium mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Link key={tag.id} href={`/tag/${tag.slug}`}>
                            <span className="inline-block bg-muted px-3 py-1 rounded-full text-sm hover:bg-muted/80 transition-colors">
                              #{tag.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                )}

                {relatedArticles.length > 0 && (
                  <ScrollReveal delay={0.5}>
                    <RelatedArticles articles={relatedArticles} />
                  </ScrollReveal>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <ScrollReveal delay={0.3}>
                <article className="prose dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </article>
              </ScrollReveal>

              {/* Author Bio */}
              <ScrollReveal delay={0.4}>
                <div className="mt-16 p-8 bg-muted/30 rounded-2xl">
                  <div className="flex items-start gap-6">
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
                      <Link
                        href={`/author/${article.author.id}`}
                        className="font-medium text-lg hover:text-primary transition-colors"
                      >
                        {article.author.name}
                      </Link>
                      <p className="text-muted-foreground mt-2 leading-relaxed">{article.author.bio}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Personalized Recommendations */}
              <ScrollReveal delay={0.5}>
                <div className="mt-16">
                  <ArticleRecommendations currentArticleId={article.id} />
                </div>
              </ScrollReveal>

              {/* Comments */}
              <ScrollReveal delay={0.6}>
                <div className="mt-16">
                  <CommentSection articleId={article.id} />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        <FloatingActionButton />
      </div>
    </PageTransition>
  )
}
