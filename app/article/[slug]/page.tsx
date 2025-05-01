"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import CategoryTabs from "@/components/category-tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ReadingProgress } from "@/components/reading-progress"
import { TableOfContents } from "@/components/table-of-contents"
import { NewsletterSubscription } from "@/components/newsletter-subscription"
import { RelatedArticles } from "@/components/related-articles"
import { ArticleComments } from "@/components/article-comments"
import { ImageZoom } from "@/components/image-zoom"
import { ClientOnly } from "@/components/client-only"
import { PopularArticles } from "@/components/popular-articles"
import { TagFilter } from "@/components/tag-filter"
import { ArrowLeft } from "lucide-react"

// This would normally come from a CMS or API
const getArticleData = (slug: string) => {
  // Mock data for demonstration
  return {
    title: "Simplicity 4: 한 번쯤 이상을 꿈꾸본 모두에게",
    description: "ItundaTech 디자인 컨퍼런스 Simplicity가 돌아왔어요.",
    content: `
      <h2 id="intro">디자인 컨퍼런스 소개</h2>
      <p>ItundaTech 디자인 컨퍼런스 Simplicity가 돌아왔어요. 이번 컨퍼런스에서는 디자인 시스템, UX 연구, 접근성 등 다양한 주제를 다룹니다.</p>
      
      <h2 id="topics">주요 주제</h2>
      <p>Simplicity 4는 디자인을 넘어 기술과 사람, 그리고 미래에 대한 이야기를 나눕니다. 디자인이 어떻게 우리의 삶을 변화시키고 있는지, 그리고 앞으로 어떤 방향으로 발전할지에 대한 통찰을 제공합니다.</p>
      
      <h3 id="design-systems">디자인 시스템</h3>
      <p>컨퍼런스는 온라인과 오프라인으로 동시에 진행되며, 참가자들은 실시간으로 질문하고 토론에 참여할 수 있습니다. 또한, 모든 세션은 녹화되어 나중에 다시 볼 수 있도록 제공됩니다.</p>
      
      <h3 id="ux-research">UX 연구</h3>
      <p>Simplicity 4는 디자인에 관심 있는 모든 사람들을 위한 행사입니다. 디자이너뿐만 아니라 개발자, 기획자, 마케터 등 다양한 분야의 전문가들이 참여하여 서로의 경험과 지식을 공유합니다.</p>
      
      <h2 id="speakers">연사 소개</h2>
      <p>이번 컨퍼런스에는 국내외 유명 디자이너와 개발자들이 연사로 참여합니다. 각 분야의 전문가들이 자신의 경험과 지식을 공유하며, 참가자들에게 새로운 영감을 제공할 것입니다.</p>
    `,
    image: "/tech-conference.png",
    date: "2025-04-24",
    author: "유아란",
    category: "design",
  }
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [article, setArticle] = useState<ReturnType<typeof getArticleData> | null>(null)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setArticle(getArticleData(params.slug))
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.slug])

  return (
    <>
      <ClientOnly>
        <ReadingProgress />
      </ClientOnly>
      <div className="flex flex-col min-h-screen">
        <CategoryTabs />

        <div className="container py-8 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {isLoading ? (
                <>
                  <div className="space-y-4 mb-8">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-48" />
                  </div>

                  <Skeleton className="w-full aspect-video mb-8 rounded-lg" />

                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </>
              ) : article ? (
                <article>
                  <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    전체 글 목록으로
                  </Link>

                  <div className="space-y-4 mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">{article.title}</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">{article.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src="/author-avatar.png"
                          alt={article.author}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{article.author}</p>
                        <time dateTime={article.date} className="text-sm text-gray-500">
                          {formatDate(article.date)}
                        </time>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full aspect-video mb-12 rounded-lg overflow-hidden">
                    <ClientOnly>
                      <ImageZoom
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        width={800}
                        height={450}
                        priority
                      />
                    </ClientOnly>
                  </div>

                  <div
                    className="prose prose-lg max-w-none dark:prose-invert mb-12"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />

                  <ClientOnly>
                    <NewsletterSubscription />
                  </ClientOnly>

                  <ClientOnly>
                    <RelatedArticles currentSlug={params.slug} category={article.category} />
                  </ClientOnly>

                  <ClientOnly>
                    <ArticleComments />
                  </ClientOnly>
                </article>
              ) : null}
            </div>

            <div className="space-y-8">
              <div className="sticky top-24">
                <ClientOnly>
                  <TableOfContents />
                </ClientOnly>
                <div className="mt-8">
                  <ClientOnly>
                    <PopularArticles />
                  </ClientOnly>
                </div>
                <div className="mt-8">
                  <TagFilter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
