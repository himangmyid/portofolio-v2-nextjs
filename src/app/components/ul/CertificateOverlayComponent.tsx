// src\app\components\ul\CertificateOverlayComponent.tsx
"use client";

import { useContext, useState } from "react";
import { OverlayContext } from "@/app/components/ul/OverlayContext";
import { motion } from "framer-motion";
import { Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const certificatesData = [
    // Dari Dicoding
    {
        title: "Belajar Dasar Visualisasi Data",
        issuer: "Dicoding",
        fileId: "1N1eFp6AEqPYwn2Ikiof9IKjGOsaB0v22"
    },
    {
        title: "Belajar Membuat Front-End Web untuk Pemula",
        issuer: "Dicoding",
        fileId: "1DAXlwOLHrEVnY2YYLN9qCwtKV8MWUFYp"
    },
    {
        title: "Belajar Dasar Pemrograman Web",
        issuer: "Dicoding",
        fileId: "1clCmSKX5FhPd-p9OjX-U6sgm3KPde8zS"
    },
    {
        title: "Belajar Dasar Pemrograman JavaScript",
        issuer: "Dicoding",
        fileId: "1cxMZ8NRoYgf_Y2bAyzXqVg6zTFp634hV"
    },

    // Dari Skill Academy
    {
        title: "Tingkatkan Produktivitas dengan MS. Excel",
        issuer: "Skill Academy",
        fileId: "1gHbsF64Gy3dORMae9uodnppIfFKf89vw"
    },
    {
        title: "Bedah CV untuk Sekolah Luar Negeri",
        issuer: "Skill Academy",
        fileId: "13NMJa5iGIyc8daQ2Ss16_gPdYxV5SdhS"
    },
    {
        title: "Sukses Bisnis Online Shop di Instagram",
        issuer: "Skill Academy",
        fileId: "1CdDb1WYhOlB6G3S4InBy8VnWyrpM04Fy"
    },
    {
        title: "Cara Dapat Penghasilan Melalui Blog",
        issuer: "Skill Academy",
        fileId: "1CLXRQoKXvtJmg0pdaCZrlcoXbuzjR3J0"
    },

    // Dari Digital Talent
    {
        title: "Video Content Creator",
        issuer: "Digital Talent",
        fileId: "19yltkT1CkIGt8duwm8tZ1-fQrCdVhldd"
    },
    {
        title: "Junior Web Developer",
        issuer: "Digital Talent",
        fileId: "1p_fAhxTV08cagoJWO3MkOcTyl9yQsHnk"
    },
    {
        title: "Big Data using Python",
        issuer: "Digital Talent",
        fileId: "1pZiL706LSnhgCIibv4fB1Di-4HIesttt"
    }
];

export default function EducationOverlayComponent() {
    const overlayFinished = useContext(OverlayContext);
    const [showAll, setShowAll] = useState(false);
    
    // Determine which certificates to display
    const displayedCertificates = showAll ? certificatesData : certificatesData.slice(0, 3);

    const getDriveUrl = (fileId: string) => ({
        preview: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
        view: `https://drive.google.com/file/d/${fileId}/view`
    });

    return (
        <>
            {overlayFinished && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-1 lg:py-10 px-4 sm:px-6 rounded-xl shadow-2xl text-white"
                >
                    <div className="max-w-6xl mx-auto">
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
                                {displayedCertificates.map((cert, index) => {
                                    const driveUrls = getDriveUrl(cert.fileId);

                                    return (
                                        <motion.div
                                            key={cert.fileId}
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
                                                {/* Thumbnail Container */}
                                                <div className="mb-4 relative rounded-lg overflow-hidden border border-sky-500/20 aspect-video">
                                                    <a
                                                        href={driveUrls.view}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block h-full w-full relative"
                                                        aria-label={`View ${cert.title} certificate`}
                                                    >
                                                        <Image
                                                            src={driveUrls.preview}
                                                            alt={`Thumbnail for ${cert.title}`}
                                                            fill
                                                            className="object-cover"
                                                            quality={80}
                                                            loading="lazy"
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/40 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button className="bg-sky-600/80 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center transition-all">
                                                                <ExternalLink className="w-4 h-4 mr-2" />
                                                                View Full Certificate
                                                            </button>
                                                        </div>
                                                    </a>
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-sky-100 mb-2">
                                                        {cert.title}
                                                    </h3>
                                                    <p className="text-sky-300/80 text-sm mb-4">
                                                        Issued by: {cert.issuer}
                                                    </p>
                                                </div>

                                                {/* Footer Link */}
                                                <a
                                                    href={driveUrls.view}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center px-4 py-2 bg-sky-600/30 border border-sky-400/50 rounded-lg text-sky-100 hover:bg-sky-600/50 hover:text-white transition-colors mt-auto"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-2" />
                                                    Open in Google Drive
                                                </a>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Read More/Less Button */}
                            {certificatesData.length > 3 && (
                                <div className="flex justify-center mt-8">
                                    <button
                                        onClick={() => setShowAll(!showAll)}
                                        className="flex items-center px-6 py-3 bg-sky-700/50 hover:bg-sky-700/70 text-sky-100 rounded-lg transition-all border border-sky-500/30"
                                    >
                                        {showAll ? (
                                            <>
                                                <ChevronUp className="w-5 h-5 mr-2" />
                                                Show Less
                                            </>
                                        ) : (
                                            <>
                                                <ChevronDown className="w-5 h-5 mr-2" />
                                                Show More ({certificatesData.length - 3} more)
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </>
    );
}