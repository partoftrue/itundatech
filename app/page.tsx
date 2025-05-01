import Link from "next/link"
import { getArticles } from "@/lib/articles"
import { ArticleListItem } from "@/components/article-list-item"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  const allArticles = await getArticles({ limit: 10 })

  // Get the first article for the featured spot
  const featuredArticle = allArticles[0]
  // Get the rest of the articles
  const remainingArticles = allArticles.slice(1)

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-itunda-purple to-itunda-darkPurple py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Welcome to <span className="text-itunda-lightPurple">itunda.tech</span>
              </h1>
              <p className="text-lg text-white/80 mb-8">
                A platform for developers and designers to share insights, experiences, and knowledge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-itunda-purple hover:bg-gray-100" asChild>
                  <Link href="/articles">
                    Explore Articles <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link href="/contribute">Contribute</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="relative w-80 h-80">
                <Image
                  src="/placeholder.svg?height=400&width=400&text=👩‍💻"
                  alt="Developer"
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <Image src="/placeholder.svg?height=80&width=80&text=💻" alt="Icon" width={60} height={60} />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float-delayed">
            <Image src="/placeholder.svg?height=80&width=80&text=📱" alt="Icon" width={50} height={50} />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-float">
            <Image src="/placeholder.svg?height=80&width=80&text=☕" alt="Icon" width={40} height={40} />
          </div>
          <div className="absolute bottom-1/3 right-1/3 animate-float-delayed">
            <Image src="/placeholder.svg?height=80&width=80&text=🎨" alt="Icon" width={55} height={55} />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide">
            <Link href="/" className="py-4 px-6 border-b-2 border-itunda-purple text-itunda-purple font-medium">
              All
            </Link>
            <Link href="/categories/developer" className="py-4 px-6 text-muted-foreground hover:text-foreground">
              Developer
            </Link>
            <Link href="/categories/designer" className="py-4 px-6 text-muted-foreground hover:text-foreground">
              Designer
            </Link>
            <Link href="/categories/case-study" className="py-4 px-6 text-muted-foreground hover:text-foreground">
              Case Studies
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="bg-itunda-lightBlue py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold mb-8">Getting Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-itunda-purple/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-itunda-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Tutorials</h3>
              <p className="text-muted-foreground mb-4">
                Step-by-step guides to help you learn and master new technologies.
              </p>
              <Button variant="link" className="text-itunda-purple p-0" asChild>
                <Link href="/articles">
                  Browse Tutorials <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-itunda-purple/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-itunda-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Knowledge Base</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive documentation and resources for developers and designers.
              </p>
              <Button variant="link" className="text-itunda-purple p-0" asChild>
                <Link href="/developer">
                  Explore Knowledge Base <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-itunda-purple/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-itunda-purple"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Community</h3>
              <p className="text-muted-foreground mb-4">
                Join our community of developers and designers to share and learn together.
              </p>
              <Button variant="link" className="text-itunda-purple p-0" asChild>
                <Link href="/contribute">
                  Join Community <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Articles */}
          <div className="lg:col-span-2 divide-y">
            <h2 className="text-2xl font-bold mb-8">Latest Articles</h2>
            {featuredArticle && <ArticleListItem article={featuredArticle} variant="featured" />}

            {remainingArticles.map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-itunda-lightBlue p-6 rounded-lg mb-8">
                <h3 className="text-lg font-bold mb-4">Popular Topics</h3>
                <div className="space-y-2">
                  {["JavaScript", "React", "Node.js", "CSS", "Design Systems"].map((topic) => (
                    <Link
                      key={topic}
                      href={`/search?q=${topic}`}
                      className="block py-2 px-3 rounded-md hover:bg-itunda-purple/10 text-itunda-darkPurple"
                    >
                      {topic}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Trending Articles</h3>
                <div className="space-y-4">
                  {allArticles.slice(0, 3).map((article) => (
                    <ArticleListItem key={article.id} article={article} variant="compact" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-itunda-purple text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to share your knowledge?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join our community of tech professionals and contribute your insights and experiences.
          </p>
          <Button size="lg" className="bg-white text-itunda-purple hover:bg-gray-100" asChild>
            <Link href="/contribute">Start Contributing</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
