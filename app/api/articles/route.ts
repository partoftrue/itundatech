import { NextResponse } from "next/server"

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function GET() {
  // Simulate network delay
  await delay(800)

  const articles = [
    {
      id: 1,
      title: "Simplicity 4: 한 번쯤 이상을 꿈꾸본 모두에게",
      description: "ItundaTech 디자인 컨퍼런스 Simplicity가 돌아왔어요.",
      image: "/tech-conference.png",
      date: "2025-04-24",
      author: "유아란",
      slug: "simplicity-4-conference",
    },
    {
      id: 2,
      title: "ItundaTech는 어떻게 광고를 보여줄까?",
      description: "ItundaTech의 다양한 광고는 어떤 과정을 거쳐 유저에게 노출될까요?",
      image: "/tech-advertising.png",
      date: "2025-04-21",
      author: "김영호",
      slug: "how-itundatech-shows-ads",
    },
    // More articles...
  ]

  return NextResponse.json({ articles })
}
