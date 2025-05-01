"use client"

import { useState, useEffect } from "react"
import CategoryTabs from "@/components/category-tabs"
import ArticleCard from "@/components/article-card"
import { ArticleSkeleton } from "@/components/article-skeleton"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"

// Mock data for articles by category
const getArticlesByCategory = (category: string) => {
  // This would normally come from a CMS or API
  return [
    {
      title: "Simplicity 4: 한 번쯤 이상을 꿈꾸본 모두에게",
      description: "ItundaTech 디자인 컨퍼런스 Simplicity가 돌아왔어요.",
      image: "/tech-conference.png",
      date: "2025-04-24",
      author: "유아란",
      slug: "simplicity-4-conference",
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
    {
      title: "접근성을 고려한 웹 디자인",
      description: "모두를 위한 접근성 높은 웹사이트 디자인 방법",
      image: "/accessible-web-design.png",
      date: "2025-04-10",
      author: "이지훈",
      slug: "accessible-web-design",
    },
  ]
}

// Get category name from slug
const getCategoryName = (slug: string) => {
  const categories = {
    development: "개발",
    data: "데이터/ML",
    design: "디자인",
  }
  return categories[slug as keyof typeof categories] || "카테고리"
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<ReturnType<typeof getArticlesByCategory>>([])
  const categoryName = getCategoryName(params.slug)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setArticles(getArticlesByCategory(params.slug))
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [params.slug])

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <CategoryTabs />

        <section className="container py-8 px-4 md:px-6">
          <motion.h1
            className="text-3xl font-bold mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categoryName}
          </motion.h1>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading
              ? [...Array(4)].map((_, index) => <ArticleSkeleton key={index} />)
              : articles.map((article, index) => <ArticleCard key={index} {...article} />)}
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
