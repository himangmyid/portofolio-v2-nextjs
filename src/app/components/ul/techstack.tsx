"use client";

import { motion } from "framer-motion";
import { FaReact, FaGithub, FaPhp, FaHtml5, FaCss3Alt, FaBootstrap } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiMysql, SiLaravel,  } from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";
import { DiVisualstudio, DiPhotoshop } from "react-icons/di";

const techStack = [
  { icon: <FaHtml5 className="w-full h-full" />, name: "HTML", color: "text-orange-500" },
  { icon: <FaCss3Alt className="w-full h-full" />, name: "CSS", color: "text-blue-500" },
  { icon: <TbBrandJavascript className="w-full h-full" />, name: "JavaScript", color: "text-yellow-400" },
  { icon: <SiTypescript className="w-full h-full" />, name: "TypeScript", color: "text-blue-400" },
  { icon: <FaReact className="w-full h-full" />, name: "React", color: "text-cyan-400" },
  { icon: <SiNextdotjs className="w-full h-full" />, name: "Next.js", color: "text-white" },
  { icon: <FaPhp className="w-full h-full" />, name: "PHP", color: "text-purple-500" },
  { icon: <SiMysql className="w-full h-full" />, name: "MySQL", color: "text-blue-300" },
  { icon: <SiLaravel className="w-full h-full" />, name: "Laravel", color: "text-red-500" },
  { icon: <FaBootstrap className="w-full h-full" />, name: "Bootstrap", color: "text-purple-400" },
  { icon: <FaGithub className="w-full h-full" />, name: "GitHub", color: "text-gray-300" },
  { icon: <DiVisualstudio className="w-full h-full" />, name: "VS Code", color: "text-blue-500" },
  { icon: <DiPhotoshop className="w-full h-full" />, name: "Photoshop", color: "text-blue-300" },
];

export function TechStack() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-20 md:mb-20"
    >
      <h3 className="text-3xl font-bold text-center mb-8 text-blue-400">Tech Stack That I Use</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.05, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex flex-col items-center p-4 bg-sky-900/30 rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            <div className={`w-16 h-16 mb-3 ${tech.color} hover:animate-spin-slow`}>
              {tech.icon}
            </div>
            <span className="text-gray-300 text-sm font-medium">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}