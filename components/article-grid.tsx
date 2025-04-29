"use client"

import { motion } from "framer-motion"
import { ArticleCardAnimated } from "@/components/article-card-animated"
import { ArticleCardSkeleton } from "@/components/article-card-skeleton"
import { staggerContainer } from "@/lib/animations"

interface ArticleGridProps {
  articles: Array<{
    id: string
    slug: string
    title: string
    excerpt: string
    coverImage: string
    date: string
    category: string
    categorySlug: string
    author: {
      name: string
      avatar: string
    }
  }>
  isLoading?: boolean
  columns?: 1 | 2 | 3 | 4
}

export function ArticleGrid({ articles, isLoading = false, columns = 3 }: ArticleGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  if (isLoading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {Array.from({ length: columns * 2 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (!articles.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`grid ${gridCols[columns]} gap-6`}
    >
      {articles.map((article, index) => (
        <ArticleCardAnimated key={article.id} article={article} index={index} />
      ))}
    </motion.div>
  )
}
