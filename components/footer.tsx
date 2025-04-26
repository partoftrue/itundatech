import Link from "next/link"
import { Logo } from "./logo"

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo linkProps={{ href: "/" }} />
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} itunda.tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
