import type { Metadata } from "next"
import { ColorShowcase } from "@/components/color-showcase"

export const metadata: Metadata = {
  title: "Colors - itunda.tech",
  description: "Color system and palette for itunda.tech",
}

export default function ColorsPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Color System</h1>
      <ColorShowcase />
    </div>
  )
}
