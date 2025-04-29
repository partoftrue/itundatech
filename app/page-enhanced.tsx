import { getArticles } from "@/lib/articles"
import { getAllCategories } from "@/lib/categories"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { HeroSectionAnimated } from "@/components/hero-section-animated"
import { ArticleGrid } from "@/components/article-grid"
import { ArticleCardAnimated } from "@/components/article-card-animated"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PageTransition } from "@/components/page-transition"
import { AnimatedButton } from "@/components/ui/animated-button"

export default async function Home() {
  // Fetch data with error handling
  const [allArticles, categories] = await Promise.all([
    getArticles({ limit: 9 }).catch((error) => {
      console.error("Error fetching articles:", error)
      return []
    }),
    getAllCategories().catch((error) => {
      console.error("Error fetching categories:", error)
      return []
    }),
  ])

  // Safely handle empty data
  if (!allArticles.length) {
    return (
      <PageTransition>
        <HeroSectionAnimated
          title="Insights for developers and designers"
          description="Explore articles, case studies, and tutorials from industry experts."
        />
        <div className="max-w-screen-xl mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Articles coming soon</h2>
          <p className="text-muted-foreground">We're working on bringing you great content.</p>
        </div>
      </PageTransition>
    )
  }

  // Get featured article (for demo, just use the first article)
  const featuredArticle = allArticles[0]

  // Get trending articles (for demo, use the next 5 articles)
  const trendingArticles = allArticles.slice(1, 6).map((article) => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    coverImage: article.coverImage,
    category: article.category,
    categorySlug: article.categorySlug,
    date: article.date,
  }))

  // Get top categories (limit to 3)
  const topCategories = [...categories]
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, 3)
    .map((category) => ({
      ...category,
      count: category.count || 0,
    }))

  return (
    <PageTransition>
      <HeroSectionAnimated
        title="Insights for developers and designers"
        description="Explore articles, case studies, and tutorials from industry experts."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton asChild className="rounded-full px-6">
            <Link href="/articles">Browse Articles</Link>
          </AnimatedButton>
          <AnimatedButton asChild variant="outline" className="rounded-full px-6">
            <Link href="/categories">Explore Categories</Link>
          </AnimatedButton>
        </div>
      </HeroSectionAnimated>

      <div className="max-w-screen-xl mx-auto px-6 py-16">
        {/* Featured Article */}
        <ScrollReveal>
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
            <ArticleCardAnimated article={featuredArticle} variant="featured" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Latest Articles */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">Latest Articles</h2>
                  <Link href="/articles" className="text-primary hover:underline flex items-center">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                <ArticleGrid articles={allArticles.slice(1, 7)} columns={2} />
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-10">
            {/* Trending Articles */}
            <ScrollReveal delay={0.3}>
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Trending Now</h2>
                <div className="space-y-5">
                  {trendingArticles.map((article, index) => (
                    <div key={article.id} className="flex items-start gap-4 group">
                      <div className="flex-shrink-0 bg-primary/10 text-primary font-bold rounded-full w-7 h-7 flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div>
                        <Link
                          href={`/articles/${article.slug}`}
                          className="font-medium group-hover:text-primary transition-colors line-clamp-2"
                        >
                          {article.title}
                        </Link>
                        {article.category && (
                          <Link
                            href={`/category/${article.categorySlug}`}
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                          >
                            {article.category}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Categories */}
            <ScrollReveal delay={0.4}>
              <div className="bg-card rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Popular Categories</h2>
                  <Link href="/categories" className="text-primary hover:underline text-sm">
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {topCategories.map((category, index) => (
                    <div key={category.id} className="group">
                      <Link
                        href={`/category/${category.slug}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">{category.count} articles</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Newsletter */}
            <ScrollReveal delay={0.5}>
              <div className="bg-primary/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-2">Stay Updated</h2>
                <p className="text-muted-foreground mb-4">Get the latest articles delivered to your inbox.</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-xl border bg-background"
                  />
                  <AnimatedButton className="w-full rounded-xl">Subscribe</AnimatedButton>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
