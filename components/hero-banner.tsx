"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Logo } from "./logo"

export default function HeroBanner() {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden bg-[#1b1e3d]">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/banner-objects.png"
            alt="Tech objects"
            width={1200}
            height={400}
            className="object-cover"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Logo size={80} color="#ffffff" className="mb-4" />
          <motion.h1
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            itundatech
          </motion.h1>
        </motion.div>
      </div>
    </div>
  )
}
