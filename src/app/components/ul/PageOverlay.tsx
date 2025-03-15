"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageOverlay() {
  const pathname = usePathname();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    setShowOverlay(true);
    const timer = setTimeout(() => setShowOverlay(false), 1800);
    return () => clearTimeout(timer);
  }, [pathname]);

  const letters = ["H", "I", "M", "A", "N", "G"];
  const bgColors = ["bg-slate-700", "bg-slate-600", "bg-slate-500", "bg-slate-400", "bg-slate-300", "bg-slate-200"];
  const textColors = ["text-white", "text-gray-200", "text-gray-300", "text-gray-700", "text-gray-800", "text-black"]; // Warna teks kontras

  return (
    <AnimatePresence>
      {showOverlay && (
        <motion.div
          className="fixed inset-0 flex"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          {letters.map((letter, i) => (
            <motion.div
              key={i}
              className={`relative flex-1 h-full ${bgColors[i]} flex justify-center items-center`}
              initial={{ scaleY: 0, originY: 1 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeInOut" }}
            >
              {/* Huruf di tengah overlay dengan warna kontras */}
              <motion.span
                className={`absolute text-6xl font-bold ${textColors[i]}`}
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeInOut" }}
              >
                {letter}
              </motion.span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
