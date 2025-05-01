"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

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
    <article className={cn("group py-6 border-b border-gray-100 dark:border-gray-800", featured && "pb-8")}>
      <Link href={`/article/${slug}`} className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h2
            className={cn(
              "font-bold group-hover:text-primary transition-colors",
              featured ? "text-2xl mb-2" : "text-xl mb-2",
            )}
          >
            {title}
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{formatDate(date)}</time>
            <span className="mx-1">·</span>
            <span>{author}</span>
          </div>
        </div>
        {image && (
          <div className="w-24 h-24 relative overflow-hidden rounded-lg shrink-0">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-all duration-300 group-hover:scale-105"
            />
          </div>
        )}
      </Link>
    </article>
  )
}
