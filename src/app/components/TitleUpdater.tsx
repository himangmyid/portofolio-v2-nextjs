"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TitleUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    const titleMap: Record<string, string> = {
      "/": "Home | HIMANG",
      "/about": "About | HIMANG",
      "/education": "Education | HIMANG",
      "/projects": "Projects | HIMANG",
      "/resume": "Resume | HIMANG",
      "/contact": "Contact | HIMANG",
    };

    document.title = titleMap[pathname] || "HIMANG";
  }, [pathname]);

  return null;
}
