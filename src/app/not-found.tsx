"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";


const FuzzyText = dynamic(() => import("@/app/components/FuzzyText/FuzzyText"), { ssr: false });

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/");
    }, 4000);

    return () => clearTimeout(timeout); 
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="max-w-screen-sm text-center">
      <FuzzyText
        fontSize="clamp(5rem, 8vw, 10rem)" 
        fontWeight={700}
        color="red"
        baseIntensity={0.2}
        hoverIntensity={0.5}
      >
        404
      </FuzzyText>
      <p className="text-center mt-4 text-lg text-gray-400">Page not found. Redirecting...</p>
    </div>
    </div>
  );
}
