import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from "@/components/dashboard/bar-chart"

interface Category {
  id: string
  name: string
  slug: string
  articleCount: number
}

interface CategoryOverviewProps {
  categories: Category[]
}

export function CategoryOverview({ categories }: CategoryOverviewProps) {
  // Sort categories by article count (descending)
  const sortedCategories = [...categories].sort((a, b) => b.articleCount - a.articleCount)

  const chartData = {
    labels: sortedCategories.map((category) => category.name),
    datasets: [
      {
        label: "Articles",
        data: sortedCategories.map((category) => category.articleCount),
        backgroundColor: "#3b82f6",
        borderRadius: 4,
      },
    ],
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Articles by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <BarChart data={chartData} />
        </div>
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
