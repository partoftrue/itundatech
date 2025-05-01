"use client"

import { useState, useEffect } from "react"
import CategoryTabs from "@/components/category-tabs"
import HeroBanner from "@/components/hero-banner"
import ArticleCard from "@/components/article-card"
import { ArticleSkeleton } from "@/components/article-skeleton"
import { PopularArticles } from "@/components/popular-articles"
import { TagFilter } from "@/components/tag-filter"
import { ClientOnly } from "@/components/client-only"

// Mock data for articles
const articles = [
  {
    title: "Simplicity 4: 한 번쯤 이상을 꿈꾸본 모두에게",
    description: "ItundaTech 디자인 컨퍼런스 Simplicity가 돌아왔어요.",
    image: "/tech-conference.png",
    date: "2025-04-24",
    author: "유아란",
    slug: "simplicity-4-conference",
  },
  {
    title: "ItundaTech는 어떻게 광고를 보여줄까?",
    description: "ItundaTech의 다양한 광고는 어떤 과정을 거쳐 유저에게 노출될까요?",
    image: "/tech-advertising.png",
    date: "2025-04-21",
    author: "김영호",
    slug: "how-itundatech-shows-ads",
  },
  {
    title: "AI 개발자를 위한 최신 도구 모음",
    description: "2025년 AI 개발에 필수적인 도구들을 소개합니다.",
    image: "/ai-development-tools.png",
    date: "2025-04-18",
    author: "박지민",
    slug: "ai-developer-tools-2025",
  },
  {
    title: "클라우드 네이티브 애플리케이션 설계 가이드",
    description: "확장 가능하고 안정적인 클라우드 네이티브 앱을 만드는 방법",
    image: "/cloud-native-architecture.png",
    date: "2025-04-15",
    author: "이서진",
    slug: "cloud-native-app-design",
  },
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
]

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner />
      <CategoryTabs />

      <div className="container py-8 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {isLoading ? (
              <>
                <ArticleSkeleton featured={true} />
                {[...Array(4)].map((_, index) => (
                  <ArticleSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                <ArticleCard {...articles[0]} featured={true} />
                {articles.slice(1).map((article, index) => (
                  <ArticleCard key={index} {...article} />
                ))}
              </>
            )}
          </div>

          <div className="space-y-8">
            <ClientOnly>
              <PopularArticles />
            </ClientOnly>
            <TagFilter onTagSelect={setSelectedTag} />
          </div>
        </div>
      </div>
    </div>
  )
}
