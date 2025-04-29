import type { ReactNode } from "react"
import { Logo } from "@/components/logo"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-[400px] mx-auto">
          <div className="mb-8 text-center">
            <Logo className="mx-auto mb-6" size="lg" />
          </div>
          {children}
        </div>
      </div>
      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} itunda.tech. All rights reserved.</p>
      </footer>
    </div>
  )
}
