import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-itunda-navy text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-white">itunda</span>
              <span className="text-xl font-bold text-itunda-lightPurple">.tech</span>
            </Link>
            <p className="mt-4 text-white/70 max-w-md">
              A platform for developers and designers to share insights, experiences, and knowledge.
            </p>
            <div className="flex space-x-4 mt-6">
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-white/10 hover:bg-white/20" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-itunda-lightPurple">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/articles" className="text-white/70 hover:text-white transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="/developer" className="text-white/70 hover:text-white transition-colors">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link href="/designer" className="text-white/70 hover:text-white transition-colors">
                  Design Resources
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-white/70 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-itunda-lightPurple">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/70 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/70 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} itunda.tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
