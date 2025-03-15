"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useContext } from "react";
import { TechStack } from "@/app/components/ul/techstack";
import { Globe, Instagram, Linkedin, Youtube, Github, Music2 } from "lucide-react";
import { OverlayContext } from "@/app/components/ul/OverlayContext";


export default function AboutMe() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const overlayFinished = useContext(OverlayContext);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {overlayFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full min-h-screen p-4"
        >

      {/* Section About Me memenuhi layar penuh */}
      <div className="mt-20 md:mt-0 h-screen flex flex-col items-center justify-center w-full ">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center text-center md:text-left w-full max-w-5xl px-5"
        >
          {/* Dynamic Background */}
          <div
            className="absolute bg-gradient-to-r from-[#0f172a] to-[#1e293b] opacity-25 blur-2xl"
            style={{ transform: `translate(${mousePos.x / 20}px, ${mousePos.y / 20}px)` }}
          />

          {/* Profile Image */}
          <motion.div className="relative flex items-center justify-center mb-5 md:mb-0">
            <div className="relative flex items-center justify-center w-[200px] h-[200px] md:w-[250px] md:h-[250px] rounded-full shadow-lg border-4 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
              <motion.div
                className="rounded-full w-full h-full flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image 
                  src="/me.png" 
                  alt="Profile Picture" 
                  height={700} 
                  width={700} 
                  className="rounded-full w-full h-full object-cover" 
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div className="flex-grow my-5 mx-5 max-w-3xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h1 className="text-4xl  font-semibold text-blue-400 dark:text-blue-300 mb-6">👨‍💻 About Me</h1>
            <motion.p className="text-base sm:text-lg text-gray-300 leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              I am a student at <span className="text-blue-400">STMIK Widya Cipta Dharma</span> majoring in <span className="text-blue-400">Informatics Engineering</span>, currently exploring <span className="text-blue-400">web development</span>, both in <span className="text-blue-400">frontend</span> and <span className="text-blue-400">backend</span>, using technologies such as <span className="text-blue-400">Next.js</span>.
            </motion.p>
            <motion.p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              I am always eager to learn new technologies and keep up with industry trends. Technology evolves constantly, and I strive to <span className="text-blue-400">adapt and grow</span> alongside these advancements.
            </motion.p>
            <motion.p className="mt-4 text-base sm:text-lg text-gray-300 leading-relaxed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              Currently, I am also diving into <span className="text-blue-400">Artificial Intelligence (AI)</span>, a rapidly growing field shaping various industries. Understanding AI will allow me to develop more <span className="text-blue-400">innovative and impactful solutions</span> for the future. 🚀
            </motion.p>
          </motion.div>
        </motion.section>
        
<motion.div 
  className="flex flex-wrap gap-4 justify-center mt-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.1 }}
>
  <motion.a
    href="https://s.id/himang"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-2 rounded-full bg-blue-900/20 hover:bg-blue-900/40 transition-all"
    aria-label="Personal Website"
  >
    <Globe className="w-6 h-6 text-blue-300" />
  </motion.a>

  <motion.a
    href="https://instagram.com/himang_dg"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-2 rounded-full bg-pink-900/20 hover:bg-pink-900/40 transition-all"
    aria-label="Instagram"
  >
    <Instagram className="w-6 h-6 text-pink-300" />
  </motion.a>

  <motion.a
    href="https://s.id/linkedin-himang"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-2 rounded-full bg-blue-800/20 hover:bg-blue-800/40 transition-all"
    aria-label="LinkedIn"
  >
    <Linkedin className="w-6 h-6 text-blue-200" />
  </motion.a>

  <motion.a
    href="https://tiktok.com/@himang_dg"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-2 rounded-full bg-black/20 hover:bg-black/40 transition-all"
    aria-label="TikTok"
  >
    <Music2 className="w-6 h-6 text-gray-100" />
  </motion.a>

  <motion.a
    href="https://www.youtube.com/channel/UCX8aSUkYR0tAW3md1JFmhnQ?sub_confirmation=1"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-2 rounded-full bg-red-900/20 hover:bg-red-900/40 transition-all"
    aria-label="YouTube"
  >
    <Youtube className="w-6 h-6 text-red-300" />
  </motion.a>

  <motion.a
    href="https://github.com/himangmyid"
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    className="p-2 rounded-full bg-gray-800/20 hover:bg-gray-800/40 transition-all"
    aria-label="GitHub"
  >
    <Github className="w-6 h-6 text-gray-100" />
  </motion.a>
</motion.div>
      </div>
      <div className="mt-40 md:mt-0 border-4 border-dashed border-blue-500/5">
  <TechStack/>
  </div>
  </motion.div>
      )}
    </>
  );
}
