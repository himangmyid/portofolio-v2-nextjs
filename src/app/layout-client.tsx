"use client";

import "@/app/globals.css";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import PageOverlay from "@/app/components/ul/PageOverlay";
import { OverlayProvider } from "@/app/components/ul/OverlayContext";
import TitleUpdater from "@/app/components/TitleUpdater";
import ClickSpark from '@/app/components/ul/ClickSpark/ClickSpark';
import Marquee from "@/app/components/Marquee";
import { SparklesCore } from "@/app/components/sparkles";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <body className="bg-black text-white relative overflow-auto">
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
    );
}
