"use client"

import { motion } from "framer-motion"

export default function Marquee() {
  return (
    <div className="fixed bottom-10 w-full overflow-hidden bg-background ">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, ease: "linear", duration: 8 }}
      >
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex items-center mx-4">
            <span
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent px-4"
              style={{
                WebkitTextStroke: "1px rgb(156 163 175)", // tailwind gray-400
              }}
            >
              Code is what makes things complicated // But all this is because of Code //
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
