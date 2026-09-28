import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/shared";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kartik Sharma | Senior Full Stack Developer",
  description: "Futuristic developer portfolio built with Next.js, Framer Motion, and Tailwind CSS, featuring high performance cosmic designs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${firaCode.variable} h-full antialiased lenis-smooth`}
    >
      <body className="min-h-full flex flex-col bg-surface-main text-text-primary font-sans">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
