import Link from "next/link"
import { Logo } from "./logo"

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
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

        <div className="text-center md:text-left text-xs text-muted-foreground border-t pt-6">
          <p className="mb-2">홈페이지 회사소개 채용 고객센터: 1599-4905 (24시간 연중무휴)</p>
          <p>&copy; {new Date().getFullYear()} itunda.tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
