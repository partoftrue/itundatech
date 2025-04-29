import Link from "next/link"
import { Logo } from "./logo"
import { NewsletterSubscription } from "./newsletter-subscription"
import { getAllCategories } from "@/lib/categories"
import { ResponsiveContainer } from "./ui/responsive-container"
import { ResponsiveGrid } from "./ui/responsive-grid"

export async function Footer() {
  const currentYear = new Date().getFullYear()
  const categories = await getAllCategories()

  // Get top categories
  const topCategories = categories.sort((a, b) => (b.count || 0) - (a.count || 0)).slice(0, 5)

  return (
    <footer className="border-t mt-24">
      <ResponsiveContainer className="py-12 md:py-16">
        <ResponsiveGrid cols={{ xs: 1, sm: 2, md: 2, lg: 4 }} gap={{ xs: 8, md: 10 }}>
          {/* Logo and Description */}
          <div>
            <Logo linkProps={{ href: "/" }} />
            <p className="mt-4 text-muted-foreground leading-relaxed">
              A community-driven platform for developers, designers, and tech enthusiasts.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium text-lg mb-4">Categories</h3>
            <ul className="space-y-3">
              {topCategories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                  All Categories
                </Link>
              </li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="font-medium text-lg mb-4">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-lg mb-4">Subscribe to our newsletter</h3>
            <NewsletterSubscription />
          </div>
        </ResponsiveGrid>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} Itunda Tech. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </ResponsiveContainer>
    </footer>
  )
}

export default Footer
