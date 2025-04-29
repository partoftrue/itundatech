import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/lib/categories"

interface CategoryCardProps {
  category: Category & { count: number }
  index: number
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  // Array of background colors for categories
  const bgColors = [
    "bg-blue-50 dark:bg-blue-950/30",
    "bg-purple-50 dark:bg-purple-950/30",
    "bg-green-50 dark:bg-green-950/30",
    "bg-amber-50 dark:bg-amber-950/30",
    "bg-rose-50 dark:bg-rose-950/30",
    "bg-cyan-50 dark:bg-cyan-950/30",
  ]

  // Array of text colors for categories
  const textColors = [
    "text-blue-600 dark:text-blue-400",
    "text-purple-600 dark:text-purple-400",
    "text-green-600 dark:text-green-400",
    "text-amber-600 dark:text-amber-400",
    "text-rose-600 dark:text-rose-400",
    "text-cyan-600 dark:text-cyan-400",
  ]

  // Array of border colors for categories
  const borderColors = [
    "border-blue-200 dark:border-blue-900",
    "border-purple-200 dark:border-purple-900",
    "border-green-200 dark:border-green-900",
    "border-amber-200 dark:border-amber-900",
    "border-rose-200 dark:border-rose-900",
    "border-cyan-200 dark:border-cyan-900",
  ]

  // Get color based on index
  const colorIndex = index % bgColors.length
  const bgColor = bgColors[colorIndex]
  const textColor = textColors[colorIndex]
  const borderColor = borderColors[colorIndex]

  return (
    <Link href={`/category/${category.slug}`} className="block group">
      <div className={`rounded-2xl border ${borderColor} ${bgColor} p-6 h-full transition-all hover:shadow-md`}>
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-medium ${textColor}`}>{category.name}</h3>
          <Badge variant="outline" className="rounded-full">
            {category.count} articles
          </Badge>
        </div>
        {category.description && (
          <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">{category.description}</p>
        )}
        <div className="flex items-center text-sm font-medium group-hover:text-primary transition-colors">
          Browse articles <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
