import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Heart, MessageSquare, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  // In a real application, you would fetch the article data based on the ID
  // For this example, we'll use a mock article
  const article = {
    id: params.slug,
    title: "Building Scalable React Applications with Next.js",
    excerpt: "Learn how to structure your Next.js projects for maximum scalability and performance.",
    content: `
      <p>When building modern web applications, scalability is a critical concern. As your application grows in complexity and user base, you need an architecture that can handle increased load, additional features, and a growing development team.</p>
      
      <p>Next.js, a React framework, provides several features that make it an excellent choice for building scalable applications. In this article, we'll explore how to leverage these features to create applications that can grow with your needs.</p>
      
      <h2>The App Router: A Game-Changer for Scalability</h2>
      
      <p>Next.js 13 introduced the App Router, a new paradigm for structuring your application. The App Router uses a file-system based router built on React Server Components, which offers several advantages for scalability:</p>
      
      <ul>
        <li>Server Components reduce the JavaScript sent to the client, improving performance.</li>
        <li>Nested layouts prevent unnecessary re-renders, making your application more efficient.</li>
        <li>Parallel routes allow for complex UI patterns without complex state management.</li>
      </ul>
      
      <p>To take advantage of these features, structure your application with a clear hierarchy. For example:</p>
      
      <pre><code>
      app/
      ├── layout.tsx       # Root layout
      ├── page.tsx         # Home page
      ├── blog/
      │   ├── layout.tsx   # Blog layout
      │   ├── page.tsx     # Blog index
      │   └── [slug]/
      │       └── page.tsx # Blog post
      └── dashboard/
          ├── layout.tsx   # Dashboard layout
          ├── page.tsx     # Dashboard index
          └── [id]/
              └── page.tsx # Dashboard item
      </code></pre>
      
      <h2>Data Fetching Strategies</h2>
      
      <p>Next.js offers multiple ways to fetch data, each with its own use case for scalability:</p>
      
      <h3>Server Components</h3>
      
      <p>Server Components are the default in the App Router and allow you to fetch data directly in your components without additional client-side JavaScript:</p>
      
      <pre><code>
      // app/users/page.tsx
      async function getUsers() {
        const res = await fetch('https://api.example.com/users')
        return res.json()
      }
      
      export default async function UsersPage() {
        const users = await getUsers()
        return (
          <ul>
            {users.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )
      }
      </code></pre>
      
      <h3>React Server Actions</h3>
      
      <p>For mutations, React Server Actions allow you to define server-side functions that can be called from the client:</p>
      
      <pre><code>
      // app/actions.ts
      'use server'
      
      export async function createUser(formData: FormData) {
        const name = formData.get('name')
        await db.users.create({ data: { name } })
        revalidatePath('/users')
      }
      </code></pre>
      
      <h2>State Management</h2>
      
      <p>As your application grows, state management becomes increasingly complex. Next.js works well with various state management solutions:</p>
      
      <h3>React Context</h3>
      
      <p>For simple state sharing, React Context is often sufficient:</p>
      
      <pre><code>
      // app/providers.tsx
      'use client'
      
      import { createContext, useState } from 'react'
      
      export const ThemeContext = createContext({
        theme: 'light',
        toggleTheme: () => {},
      })
      
      export function ThemeProvider({ children }) {
        const [theme, setTheme] = useState('light')
        const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')
        
        return (
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
          </ThemeContext.Provider>
        )
      }
      </code></pre>
      
      <h3>Zustand</h3>
      
      <p>For more complex state, consider Zustand, which is lightweight and works well with React Server Components:</p>
      
      <pre><code>
      // store.ts
      import { create } from 'zustand'
      
      interface CartState {
        items: Item[]
        addItem: (item: Item) => void
        removeItem: (id: string) => void
      }
      
      export const useCartStore = create<CartState>((set) => ({
        items: [],
        addItem: (item) => set((state) => ({ items: [...state.items, item] })),
        removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
      }))
      </code></pre>
      
      <h2>Optimizing Performance</h2>
      
      <p>Performance is a key aspect of scalability. Next.js provides several features to optimize performance:</p>
      
      <h3>Image Optimization</h3>
      
      <p>The Next.js Image component automatically optimizes images, reducing the amount of data sent to clients:</p>
      
      <pre><code>
      import Image from 'next/image'
      
      export default function Avatar() {
        return (
          <Image
            src="/avatar.png"
            alt="User avatar"
            width={64}
            height={64}
          />
        )
      }
      </code></pre>
      
      <h3>Font Optimization</h3>
      
      <p>Next.js 13 introduced automatic font optimization:</p>
      
      <pre><code>
      // app/layout.tsx
      import { Inter } from 'next/font/google'
      
      const inter = Inter({ subsets: ['latin'] })
      
      export default function RootLayout({ children }) {
        return (
          <html lang="en" className={inter.className}>
            <body>{children}</body>
          </html>
        )
      }
      </code></pre>
      
      <h2>Conclusion</h2>
      
      <p>Building scalable React applications with Next.js involves leveraging its built-in features like the App Router, Server Components, and optimization tools. By structuring your application thoughtfully and choosing the right data fetching and state management strategies, you can create applications that scale gracefully as your needs grow.</p>
      
      <p>Remember that scalability isn't just about handling more users—it's also about maintaining developer productivity as your codebase and team expand. Next.js's conventions and clear separation of concerns help keep your code organized and maintainable, even as it grows in complexity.</p>
    `,
    coverImage: "/placeholder.svg?height=600&width=1200",
    date: "Apr 10, 2023",
    readTime: "12 min read",
    category: "Frontend",
    author: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      bio: "Senior Frontend Developer with a passion for React and Next.js",
    },
    tags: ["React", "Next.js", "JavaScript", "Web Development", "Performance"],
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">{article.category}</Badge>
            <span className="text-sm text-muted-foreground">
              {article.date} · {article.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{article.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{article.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={article.author.avatar} alt={article.author.name} />
              <AvatarFallback>{article.author.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{article.author.name}</div>
              <div className="text-sm text-muted-foreground">{article.author.bio}</div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-8">
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Article Actions */}
        <div className="flex items-center justify-between py-6 border-t border-b">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5 mr-2" />
              Like
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-5 w-5 mr-2" />
              Comment
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Bookmark className="h-5 w-5 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Related Articles */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Related article"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">
                  <Link href="/articles/optimizing-react-performance" className="hover:underline">
                    Optimizing React Performance: Advanced Techniques
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">Mar 28, 2023 · 8 min read</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Related article"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium mb-1">
                  <Link href="/articles/server-components-explained" className="hover:underline">
                    React Server Components Explained
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">Apr 5, 2023 · 10 min read</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
