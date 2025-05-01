"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

interface PopularArticle {
  title: string
  slug: string
  author: string
}

export function PopularArticles() {
  const [articles, setArticles] = useState<PopularArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get popular articles
    const timer = setTimeout(() => {
      setArticles([
        {
          title: "Simplicity 4: AI 이야기가 펼쳐지는 온라인 컨퍼런스 제작기",
          slug: "simplicity-4-conference",
          author: "유아란",
        },
        {
          title: "Simplicity 4: 한 번쯤 이상을 꿈꾸본 모두에게",
          slug: "simplicity-4-dreams",
          author: "유아란",
        },
        {
          title: "토스는 어떻게 광고를 보여줄까?",
          slug: "how-itundatech-shows-ads",
          author: "김영호",
        },
        {
          title: "토스는 어떻게 광고를 보여줄까? 토스에서 ML 돌아보기",
          slug: "ml-in-advertising",
          author: "김영호",
        },
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">인기있는 글</h3>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article, index) => (
            <div key={index} className="space-y-1">
              <Link href={`/article/${article.slug}`}>
                <h4 className="font-medium line-clamp-2 hover:text-primary transition-colors">{article.title}</h4>
              </Link>
              <p className="text-sm text-gray-500">{article.author}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
