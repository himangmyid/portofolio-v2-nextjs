"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Mee() { 
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="relative">
          {/* Efek Glow */}
          <motion.div
            className="absolute -inset-4 bg-purple-500/20 rounded-full blur-xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          
          <Image
            src="/mee.png"
            alt="My Picture"
            width={128} 
            height={128}
            className="w-32 h-32 object-contain rounded-lg"
            priority 
          />
        </div>
      </motion.div>
    </div>
  );
}
