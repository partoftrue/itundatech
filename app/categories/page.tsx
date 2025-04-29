import { getAllCategories } from "@/lib/categories"
import { CategoryCard } from "@/components/category-card"

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  // Sort categories by article count
  const sortedCategories = [...categories].sort((a, b) => (b.count || 0) - (a.count || 0))

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-muted-foreground">Browse articles by topic</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCategories.map((category, index) => (
          <CategoryCard key={category.id} category={{ ...category, count: category.count || 0 }} index={index} />
        ))}
      </div>
    </div>
  )
}
