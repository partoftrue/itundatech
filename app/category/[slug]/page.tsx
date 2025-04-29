import { getArticles } from "@/lib/articles"
import { getCategoryBySlug } from "@/lib/categories"
import { ArticleList } from "@/components/article-list"
import { notFound } from "next/navigation"

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
  }

  const articles = await getArticles({ category: params.slug, limit: 10 })

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <ArticleList
        articles={articles}
        title={category.name}
        description={category.description || `Browse all articles in the ${category.name} category`}
        showPagination={true}
        currentPage={1}
        totalPages={Math.ceil((category.count || 0) / 10)}
        basePath={`/category/${params.slug}/page`}
        emptyMessage={`No articles found in the ${category.name} category`}
        emptyAction={{
          text: "Browse all articles",
          href: "/articles",
        }}
      />
    </div>
  )
}
