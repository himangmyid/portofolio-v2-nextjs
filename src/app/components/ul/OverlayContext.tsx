"use client";
import { createContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const OverlayContext = createContext<boolean>(false);

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [overlayFinished, setOverlayFinished] = useState(false);

  useEffect(() => {
    setOverlayFinished(false);
    const timer = setTimeout(() => setOverlayFinished(true), 1800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <OverlayContext.Provider value={overlayFinished}>
      {children}
    </OverlayContext.Provider>
  );
}
