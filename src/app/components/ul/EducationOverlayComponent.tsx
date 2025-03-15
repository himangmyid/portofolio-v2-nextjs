"use client";

import { useContext } from "react";
import { OverlayContext } from "@/app/components/ul/OverlayContext";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import CertificateOverlayComponent from "./CertificateOverlayComponent";

const educationData = [
  {
    school: "STMIK Widya Cipta Dharma",
    description: "STMIK Widya Cipta Dharma - Majoring in Informatics Engineering",
    year: "2020 – Present",
    location: "Samarinda, Indonesia"
  },
  
  {
    school: "SMKS Pemuda Samarinda",
    description: "Sekolah Menengah Kejuruan Pemuda Samarinda - Department of Office Automation & Governance",
    year: "2018 – 2020",
    location: "Samarinda, Indonesia"
  },
  {
    school: "SMK-SPP Negeri Samarinda",
    description: "Sekolah Pertanian Pembangunan Negeri Samarinda - One Semester Horticulture Department",
    year: "2017 – 2018",
    location: "Samarinda, Indonesia"
  }];

export default function EducationOverlayComponent() {
  const overlayFinished = useContext(OverlayContext);

  return (
    <>
      {overlayFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-12 px-4 sm:px-6 rounded-xl shadow-2xl  text-white"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 text-sky-300 drop-shadow-md">
              <GraduationCap className="inline-block mr-3 mb-1 h-8 w-8 sm:h-9 sm:w-9" />
              Educational Background
            </h2>
            
            <div className="relative flex flex-col items-center mt-2">
              {/* Garis timeline */}
              <div className="w-1 bg-gradient-to-b from-sky-400 to-sky-600 absolute h-full left-1/2 transform -translate-x-1/2 shadow-lg" />

              {educationData.map((edu, index) => (
                <div key={index} className="relative w-full mb-15 sm:mb-12">
                  {/* Icon di timeline */}
                  <div className="absolute top-0 sm:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-500 p-2 rounded-full text-white shadow-xl border-4 border-sky-200 z-10">
  <GraduationCap size={20} className="stroke-[1.5]" />
</div>

                  {/* Container untuk card */}
                  <div className={`w-full flex ${
                    index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                  }`}>
                    {/* Card pendidikan */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.3,
                        type: "spring",
                        stiffness: 120
                      }}
                      className="w-full md:w-[45%] mt-8 sm:mt-0 md:mt-12"
                    >
                      <div className={`relative bg-sky-800/5 backdrop-blur-sm shadow-xl p-5 sm:p-6 rounded-xl border border-sky-400/30 hover:border-sky-300 transition-all duration-300 ${
                        index % 2 === 0 ? 'md:ml-4' : 'md:mr-4'
                      }`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-transparent rounded-xl" />
                        
                        <div className="relative">
                          <h3 className="text-lg sm:text-xl font-bold text-sky-100 mb-2 group-hover:text-sky-50 transition-colors">
                            {edu.school}
                            <span className="block text-sm font-medium text-sky-300/80 mt-1">
                              {edu.year}
                            </span>
                          </h3>
                          
                          <p className="text-sky-100/90 text-sm leading-relaxed mb-3 whitespace-normal break-words">
                            {edu.description}
                          </p>
                          
                          <div className="flex items-center text-sky-300/80 text-sm">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-2"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {edu.location}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      <CertificateOverlayComponent />
    </>
  );
}