"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { motion } from "framer-motion"

export default function VerificationSuccessPage() {
  const router = useRouter()

  // Redirect to login after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/auth")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-8"
    >
      <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-fit">
        <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
      </div>
      <h1 className="text-2xl font-medium">Email verified</h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
        Your email has been successfully verified. You can now sign in to your account.
      </p>
      <div className="pt-4">
        <Button className="rounded-xl py-6 px-8 bg-brand hover:bg-brand/90 text-white font-medium" asChild>
          <Link href="/auth">Sign in</Link>
        </Button>
      </div>
      <p className="text-sm text-gray-400">You will be redirected to the sign in page in a few seconds...</p>
    </motion.div>
  )
}
