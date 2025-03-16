import { Metadata } from "next";
import ClientLayout from "./layout-client";
import { Kanit, Oswald, Quicksand, Sofia_Sans } from "next/font/google";

const kanit = Kanit({ weight: ["100", "400", "700", "900"], subsets: ["latin"], variable: "--font-kanit" });
const oswald = Oswald({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-oswald" });
const quicksand = Quicksand({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-quicksand" });
const sofiaSans = Sofia_Sans({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-sofia-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${kanit.variable} ${oswald.variable} ${quicksand.variable} ${sofiaSans.variable}`}>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
