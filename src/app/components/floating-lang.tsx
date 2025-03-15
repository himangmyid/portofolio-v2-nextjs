"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Code, Terminal, Database, CodeXml, Brain, GitBranch, Github, Regex } from "lucide-react"; // Tambah icon coding

const icons = [FileText, Code, Terminal, Database, CodeXml, Brain, GitBranch, Github, Regex];

export function FloatingLang({ count = 9 }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const Icon = icons[i % icons.length]; // Ambil icon secara bergantian

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * dimensions.width,
              y: Math.random() * dimensions.height,
            }}
            animate={{
              x: [Math.random() * dimensions.width, Math.random() * dimensions.width],
              y: [Math.random() * dimensions.height, Math.random() * dimensions.height],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="w-15 h-15 bg-blue-500/20 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <Icon className="w-8 h-8 text-blue-400/70" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
