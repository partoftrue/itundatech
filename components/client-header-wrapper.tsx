"use client"

import Header from "./header"
import type { Category } from "@/lib/categories"

interface ClientHeaderWrapperProps {
  categories: Category[]
}

export function ClientHeaderWrapper({ categories }: ClientHeaderWrapperProps) {
  return <Header categories={categories} />
}
