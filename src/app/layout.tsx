"use client";

import { Kanit, Oswald, Quicksand, Sofia_Sans } from "next/font/google";
import "@/app/globals.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import PageOverlay from "@/app/components/ul/PageOverlay";
import { OverlayProvider } from "@/app/components/ul/OverlayContext";
import TitleUpdater from "@/app/components/TitleUpdater";
import ClickSpark from '@/app/components/ul/ClickSpark/ClickSpark';
import Marquee from "@/app/components/Marquee";
import { SparklesCore } from "@/app/components/sparkles";


const kanit = Kanit({ weight: ["100", "400", "700", "900"], subsets: ["latin"], variable: "--font-kanit" });
const oswald = Oswald({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-oswald" });
const quicksand = Quicksand({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-quicksand" });
const sofiaSans = Sofia_Sans({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-sofia-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" data-theme="dark" className={`${kanit.variable} ${oswald.variable} ${quicksand.variable} ${sofiaSans.variable}`}>
            <body className="bg-black text-white relative overflow-auto">

                {/* ClickSpark */}
                <ClickSpark sparkColor="blue" sparkSize={30} sparkRadius={35} sparkCount={12} duration={200}>
                    <TitleUpdater />
                    <OverlayProvider>
                        <Header />
                        {children}
                        <Marquee />
                        <Footer />
                        <PageOverlay />
                        <SparklesCore
                            id="tsparticlesfullpage"
                            background="transparent"
                            minSize={0.6}
                            maxSize={1.2}
                            particleDensity={100}
                            particleColor={["#FFFFFF", "#0000FF"]}
                        />


                    </OverlayProvider>
                </ClickSpark>
            </body>
        </html>
    );
}
