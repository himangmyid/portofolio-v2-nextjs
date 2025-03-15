"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Book, Briefcase, FileText, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/app/components/GradientText/GradientText";
export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/", icon: Home, color: "text-emerald-400 group-hover:text-emerald-300" },
    { name: "About", href: "/about", icon: User, color: "text-sky-400 group-hover:text-sky-300" },
    { name: "Education", href: "/education", icon: Book, color: "text-violet-400 group-hover:text-violet-300" },
    { name: "Projects", href: "/projects", icon: Briefcase, color: "text-orange-400 group-hover:text-orange-300" },
    { name: "Resume", href: "/resume", icon: FileText, color: "text-yellow-400 group-hover:text-yellow-300" },
    { name: "Contact", href: "/contact", icon: Mail, color: "text-rose-400 group-hover:text-rose-300" },
  ];

  return (
    <header className="bg-slate-800/60 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <GradientText
  colors={["#00FFFF", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={1}
  showBorder={false}
  className="custom-class text-4xl font-bold"
>
<h1>HIMANG</h1>
</GradientText>
        

        {/* Toggle Menu Button */}
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6">
          {navItems.map(({ name, href, icon: Icon, color }) => (
            <Link key={href} href={href} className="relative group flex items-center py-2 px-4 text-lg font-medium">
              <motion.div
                className="flex items-center gap-2"
                initial={{ x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <Icon className={`transition-colors duration-300 ${color}`} size={20} />
                <span>{name}</span>
              </motion.div>
              {pathname === href && <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white rounded-full" />}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black lg:hidden z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Navigation */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100 }}
              className="fixed top-0 left-0 w-45  rounded-r-4xl bg-slate-900 shadow-lg p-6 flex flex-col gap-4 lg:hidden z-50"
            >
              {navItems.map(({ name, href, icon: Icon, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 text-lg font-medium ${
                    pathname === href ? "text-white" : "text-gray-400"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className={`${color} transition-colors duration-300`} size={20} />
                  <span>{name}</span>
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
