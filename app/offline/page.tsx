"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <Logo size={80} color="#1f78ff" />
      <h1 className="mt-8 text-3xl font-bold">You're offline</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md">
        It looks like you're currently offline. Some content may not be available until you reconnect.
      </p>
      <div className="mt-8 space-y-4">
        <Button asChild className="w-full sm:w-auto">
          <Link href="/">Go to Homepage</Link>
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
      <div className="mt-8">
        <p className="text-sm text-gray-500">You can still access previously viewed articles while offline.</p>
      </div>
    </div>
  )
}
