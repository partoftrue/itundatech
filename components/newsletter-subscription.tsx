"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "유효하지 않은 이메일",
        description: "유효한 이메일 주소를 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubscribed(true)
      toast({
        title: "구독 완료!",
        description: "ItundaTech 뉴스레터 구독이 완료되었습니다.",
      })
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "구독 중 문제가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className="bg-muted p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-2">ItundaTech 뉴스레터 구독하기</h3>
      <p className="text-muted-foreground mb-4">최신 기술 트렌드와 개발 인사이트를 이메일로 받아보세요.</p>

      {isSubscribed ? (
        <div className="bg-primary/10 p-4 rounded-md text-center">
          <p className="font-medium text-primary">구독해주셔서 감사합니다!</p>
          <p className="text-sm mt-1">곧 최신 소식을 보내드리겠습니다.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="이메일 주소"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "처리 중..." : "구독하기"}
          </Button>
        </form>
      )}
    </motion.div>
  )
}
