"use client";

import { useContext } from "react";
import { OverlayContext } from "@/app/components/ul/OverlayContext";
import { motion } from "framer-motion"; 
import { Award, ExternalLink } from "lucide-react";

// ... educationData tetap sama ...
const certificatesData = [
    // Dari Dicoding
    {
      title: "Belajar Dasar Visualisasi Data",
      issuer: "Dicoding",
      filePath: "https://drive.google.com/file/d/1N1eFp6AEqPYwn2Ikiof9IKjGOsaB0v22/preview"
    },
    {
      title: "Belajar Membuat Front-End Web untuk Pemula",
      issuer: "Dicoding",
      filePath: "https://drive.google.com/file/d/1DAXlwOLHrEVnY2YYLN9qCwtKV8MWUFYp/preview"
    },
    {
      title: "Belajar Dasar Pemrograman Web", 
      issuer: "Dicoding",
      filePath: "https://drive.google.com/file/d/1clCmSKX5FhPd-p9OjX-U6sgm3KPde8zS/preview"
    },
    {
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Dicoding",
      filePath: "https://drive.google.com/file/d/1cxMZ8NRoYgf_Y2bAyzXqVg6zTFp634hV/preview"
    },
  
    // Dari Skill Academy
    {
      title: "Tingkatkan Produktivitas dengan MS. Excel",
      issuer: "Skill Academy",
      filePath: "https://drive.google.com/file/d/1gHbsF64Gy3dORMae9uodnppIfFKf89vw/preview"
    },
    {
      title: "Bedah CV untuk Sekolah Luar Negeri",
      issuer: "Skill Academy",
      filePath: "https://drive.google.com/file/d/13NMJa5iGIyc8daQ2Ss16_gPdYxV5SdhS/preview"
    },
    {
      title: "Sukses Bisnis Online Shop di Instagram",
      issuer: "Skill Academy",
      filePath: "https://drive.google.com/file/d/1CdDb1WYhOlB6G3S4InBy8VnWyrpM04Fy/preview"
    },
    {
      title: "Cara Dapat Penghasilan Melalui Blog",
      issuer: "Skill Academy", 
      filePath: "https://drive.google.com/file/d/1CLXRQoKXvtJmg0pdaCZrlcoXbuzjR3J0/preview"
    },
  
    // Dari Digital Talent
    {
      title: "Video Content Creator",
      issuer: "Digital Talent",
      filePath: "https://drive.google.com/file/d/19yltkT1CkIGt8duwm8tZ1-fQrCdVhldd/preview"
    },
    {
      title: "Junior Web Developer",
      issuer: "Digital Talent",
      filePath: "https://drive.google.com/file/d/1p_fAhxTV08cagoJWO3MkOcTyl9yQsHnk/preview"
    },
    {
      title: "Big Data using Python",
      issuer: "Digital Talent",
      filePath: "https://drive.google.com/file/d/1pZiL706LSnhgCIibv4fB1Di-4HIesttt/preview"
    }
  ];

export default function EducationOverlayComponent() {
  const overlayFinished = useContext(OverlayContext);

  return (
    <>
      {overlayFinished && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-12 px-4 sm:px-6 rounded-xl shadow-2xl text-white"
        >
          <div className="max-w-6xl mx-auto">
            {/* Section Pendidikan (tetap sama)... */}
            
            {/* Section Sertifikat */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 text-sky-300 drop-shadow-md">
                <Award className="inline-block mr-3 mb-1 h-8 w-8 sm:h-9 sm:w-9" />
                Certifications & Training
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificatesData.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 120
                    }}
                    className="group relative h-full"
                  >
                    <div className="h-full flex flex-col bg-sky-900/20 backdrop-blur-sm border border-sky-400/30 rounded-xl p-6 transition-all hover:border-sky-300 hover:bg-sky-900/30">
                      {/* Preview PDF */}
                      <div className="mb-4 relative rounded-lg overflow-hidden border border-sky-500/20 aspect-video">
                        <iframe
                          src={cert.filePath}
                          className="w-full h-full"
                          loading="lazy"
                          title={`Preview Sertifikat ${cert.title}`}
                          frameBorder="0"
                          allow="autoplay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-sky-100 mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-sky-300/80 text-sm mb-4">
                          Issued by: {cert.issuer}
                        </p>
                      </div>
                      
                      <a
                        href={cert.filePath.replace('/preview', '/view')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-sky-600/30 border border-sky-400/50 rounded-lg text-sky-100 hover:bg-sky-600/50 hover:text-white transition-colors mt-auto"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in Google Drive
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}