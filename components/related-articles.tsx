"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface Article {
  title: string
  description: string
  image: string
  date: string
  author: string
  slug: string
}

interface RelatedArticlesProps {
  currentSlug: string
  category: string
}

// Mock data for related articles
const mockArticles: Article[] = [
  {
    title: "디자인 시스템 구축 가이드",
    description: "효율적인 디자인 시스템을 구축하는 방법을 알아봅니다.",
    image: "/design-system-abstract.png",
    date: "2025-04-20",
    author: "김민지",
    slug: "design-system-guide",
  },
  {
    title: "UX 리서치의 중요성",
    description: "사용자 경험 향상을 위한 UX 리서치 방법론",
    image: "/ux-research-concept.png",
    date: "2025-04-15",
    author: "박서연",
    slug: "importance-of-ux-research",
  },
  {
    title: "접근성을 고려한 웹 디자인",
    description: "모두를 위한 접근성 높은 웹사이트 디자인 방법",
    image: "/accessible-web-design.png",
    date: "2025-04-10",
    author: "이지훈",
    slug: "accessible-web-design",
  },
]

export function RelatedArticles({ currentSlug, category }: RelatedArticlesProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    // Simulate API call to get related articles
    const timer = setTimeout(() => {
      // Filter out the current article
      const filteredArticles = mockArticles.filter((article) => article.slug !== currentSlug)
      setArticles(filteredArticles.slice(0, 2))
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [currentSlug])

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">관련 글</h2>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/article/${article.slug}`} className="group block">
                <div className="overflow-hidden rounded-lg mb-3">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
                <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{article.title}</h3>
                <p className="text-muted-foreground line-clamp-2 mt-1 text-sm">{article.description}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span className="mx-1">·</span>
                  <span>{article.author}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
