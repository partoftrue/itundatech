"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function HeroBanner() {
  return (
    <div className="container px-4 md:px-6 py-4">
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-[#1b1e3d] h-24 md:h-32 border border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image src="/logo-white.png" alt="itundatech" width={180} height={45} priority />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
