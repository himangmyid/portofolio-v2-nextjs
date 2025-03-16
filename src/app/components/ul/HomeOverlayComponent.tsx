"use client";

import { OverlayContext } from "@/app/components/ul/OverlayContext";
import { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { FloatingLang } from "@/app/components/floating-lang";
import { FileText, Sparkles } from "lucide-react";
import Mee from "@/app/components/ul/mee";
import Link from "next/link";

export default function HomeOverlayComponent() {
  const overlayFinished = useContext(OverlayContext);
  useEffect(() => {
    // Sembunyikan scroll hanya di halaman Home
    document.body.style.overflow = "hidden";

    return () => {
      // Kembalikan scroll saat keluar dari halaman Home
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <>
      {overlayFinished && (
        <div className="relative w-full  flex flex-col items-center justify-center overflow-hidden px-4 pb-32">
          {/* Background FloatingLang */}
          <div className="absolute inset-0 -z-10">
            <FloatingLang />
          </div>

          {/* Konten Utama */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-screen-xl text-center"
          >
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-snug">
  Coding is fun... <br />
  until you see <span className="text-green-400">&apos;undefined is not a function&apos;</span> 😭
</h1>


            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            >
              Upload your code snippets, share your knowledge, and let AI make debugging a bit more fun!
            </motion.p>

            {/* Tombol Navigasi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/about">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 hover:scale-105 hover:shadow-lg text-white text-lg font-medium px-5 py-3 rounded-lg transition">
                  <FileText className="h-5 w-5" />
                  About Me
                </button>
              </Link>
              <Link href="/resume">
                <button className="flex items-center gap-2 border border-white text-white text-lg font-medium px-5 py-3 rounded-lg hover:bg-white/20 hover:scale-105 hover:shadow-lg transition">
                  <Sparkles className="h-5 w-5" />
                  My Resume
                </button>
              </Link>
            </motion.div>
          </motion.div>

       
          <div className="absolute bottom-0 right-5 md:bottom-5 md:right-10 w-40 h-40 md:w-64 md:h-64 z-10">
            <Mee />
          </div>
        </div>
      )}
    </>
  );
}