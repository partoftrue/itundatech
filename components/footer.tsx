import Link from "next/link"
import { Logo } from "./logo"
import { NewsletterSubscription } from "./newsletter-subscription"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t mt-12">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Logo linkProps={{ href: "/" }} />
            <p className="mt-4 text-muted-foreground">
              A community-driven platform for developers, designers, and tech enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/articles" className="text-muted-foreground hover:text-brand">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/developer" className="text-muted-foreground hover:text-brand">
                  Developer
                </Link>
              </li>
              <li>
                <Link href="/designer" className="text-muted-foreground hover:text-brand">
                  Designer
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-muted-foreground hover:text-brand">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-brand">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-brand">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-brand">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-muted-foreground hover:text-brand">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-muted-foreground hover:text-brand">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-1">
            <h3 className="font-bold mb-4">Subscribe to our newsletter</h3>
            <NewsletterSubscription />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© {currentYear} Itunda Tech. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-brand">
              Twitter
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand">
              GitHub
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
