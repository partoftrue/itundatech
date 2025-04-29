import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Category {
  id: string
  name: string
  slug: string
  articleCount: number
}

interface CategoryOverviewProps {
  categories?: Category[]
}

export function CategoryOverview({ categories = [] }: CategoryOverviewProps) {
  // Ensure categories is an array
  const safeCategories = Array.isArray(categories) ? categories : []

  // Sort categories by article count (descending)
  const sortedCategories = [...safeCategories].sort((a, b) => b.articleCount - a.articleCount)

  if (sortedCategories.length === 0) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Articles by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No categories available.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Articles by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4 space-y-2">
          {sortedCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <Link href={`/categories/${category.slug}`} className="text-sm hover:underline">
                {category.name}
              </Link>
              <span className="text-sm font-medium">{category.articleCount} articles</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
