import { Metadata } from "next";
import ClientLayout from "./layout-client";
import { Kanit, Oswald, Quicksand, Sofia_Sans } from "next/font/google";

const kanit = Kanit({ weight: ["100", "400", "700", "900"], subsets: ["latin"], variable: "--font-kanit" });
const oswald = Oswald({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-oswald" });
const quicksand = Quicksand({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-quicksand" });
const sofiaSans = Sofia_Sans({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-sofia-sans" });

export const metadata: Metadata = {
  title: "Portfolio v2 | HIMANG",
  description: "Explore the portfolio of HIMANG, a web developer specializing in Next.js, Tailwind CSS, and UI/UX design.",
  keywords: ["portfolio", "web developer", "full-stack", "Next.js", "Tailwind CSS", "UI/UX"],
  authors: [{ name: "HIMANG", url: "https://www.himang.my.id/" }],
  openGraph: {
    title: "Portfolio v2 | HIMANG",
    description: "Explore the portfolio of HIMANG, a web developer specializing in Next.js, Tailwind CSS, and UI/UX design.",
    url: "https://portofolio-v2-dun.vercel.app/",
    siteName: "HIMANG Portfolio",
    images: [
      {
        url: "/me.png",
        width: 800,
        height: 800,
        alt: "HIMANG Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Portfolio v2 | HIMANG",
    description: "Explore the portfolio of HIMANG, a web developer specializing in Next.js, Tailwind CSS, and UI/UX design.",
    images: ["/me.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${kanit.variable} ${oswald.variable} ${quicksand.variable} ${sofiaSans.variable}`}>
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}
