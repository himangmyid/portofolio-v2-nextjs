"use client";

import { useContext } from "react";
import { OverlayContext } from "@/app/components/ul/OverlayContext";
import { motion } from "framer-motion";

export default function ResumeOverlayComponent() {
  const overlayFinished = useContext(OverlayContext);

  return (
    <>
      {overlayFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full min-h-screen p-4"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-sky-300 drop-shadow-md text-center sm:text-left">
              My Resume
            </h2>
            
            <div className="bg-sky-900/20 backdrop-blur-sm rounded-xl shadow-2xl border border-sky-400/30 overflow-hidden">
              <div className="aspect-[1/1.414] sm:aspect-auto"> {/* Ratio A4 */}
                <iframe 
                  src="/Las-Benidiktus Himang-CV.pdf#view=fitH"
                  className="w-full h-[70vh] sm:h-[80vh] md:h-[85vh]"
                  title="Benidiktus Himang Resume"
                  loading="lazy"
                  style={{ minHeight: '500px' }}
                >
                  <p className="text-white p-4">
                    Browser tidak mendukung PDF viewer. Silakan unduh melalui 
                    <a 
                      href="/Las-Benidiktus Himang-CV.pdf" 
                      className="text-sky-300 hover:text-sky-100 ml-1"
                      download
                    >
                      link ini
                    </a>
                  </p>
                </iframe>
              </div>
            </div>

            <div className="mt-4 flex justify-center sm:justify-end">
              <a
                href="/Las-Benidiktus Himang-CV.pdf"
                download
                className="inline-flex items-center px-4 py-2 bg-sky-600/30 border border-sky-400/50 rounded-lg text-sky-100 hover:bg-sky-600/50 hover:text-white transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
              >
                Download Full Resume
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}