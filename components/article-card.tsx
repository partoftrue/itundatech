"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { motion } from "framer-motion"

interface ArticleCardProps {
  title: string
  description: string
  image: string
  date: string
  author: string
  slug: string
  featured?: boolean
}

export default function ArticleCard({
  title,
  description,
  image,
  date,
  author,
  slug,
  featured = false,
}: ArticleCardProps) {
  return (
    <motion.article
      className={cn("group relative flex flex-col gap-4", featured ? "pb-8 border-b mb-8" : "")}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="grid gap-4">
        {featured ? (
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="order-2 md:order-1">
              <Link href={`/article/${slug}`}>
                <h2 className="article-title mb-3 group-hover:underline decoration-1 underline-offset-2 transition-colors">
                  {title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>
              <div className="article-meta">
                <time dateTime={date}>{formatDate(date)}</time>
                <span className="mx-1">·</span>
                <span>{author}</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg order-1 md:order-2">
              <Link href={`/article/${slug}`}>
                <div className="overflow-hidden rounded-lg">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={title}
                      width={600}
                      height={400}
                      className="object-cover w-full aspect-[4/3] transition-all duration-300"
                    />
                  </motion.div>
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-2">
              <Link href={`/article/${slug}`}>
                <h2 className="article-title group-hover:underline decoration-1 underline-offset-2 transition-colors">
                  {title}
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
              <div className="article-meta">
                <time dateTime={date}>{formatDate(date)}</time>
                <span className="mx-1">·</span>
                <span>{author}</span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Link href={`/article/${slug}`}>
                <div className="overflow-hidden rounded-lg">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}>
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={title}
                      width={400}
                      height={225}
                      className="object-cover w-full aspect-video transition-all duration-300"
                    />
                  </motion.div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </motion.article>
  )
}
