import type { ReactNode } from "react"
import { AuthGuard } from "@/components/dashboard/auth-guard"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AuthGuard>{children}</AuthGuard>
    </div>
  )
}
