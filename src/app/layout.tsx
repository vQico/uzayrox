import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";
import { CMSProvider } from "@/context/CMSContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UZAYROX | Sosyal Medya, Yazılım ve Grafik Tasarım",
  description: "UZAYROX; sosyal medya operasyonları, yazılım geliştirme, web tasarım ve grafik tasarım alanlarında profesyonel dijital çözümler sunar.",
  openGraph: {
    title: "UZAYROX | Sosyal Medya, Yazılım ve Grafik Tasarım",
    description: "UZAYROX; sosyal medya operasyonları, yazılım geliştirme, web tasarım ve grafik tasarım alanlarında profesyonel dijital çözümler sunar.",
    url: "https://uzayrox.com",
    siteName: "UZAYROX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UZAYROX | Profesyonel Dijital Çözümler",
    description: "Sosyal medya operasyonları, yazılım geliştirme, web tasarım ve grafik tasarım.",
  },
};

import BackgroundCode from "@/components/BackgroundCode";
import Snake3D from "@/components/Snake3D";
import GlobalParticles from "@/components/GlobalParticles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-black text-white min-h-screen selection:bg-white selection:text-black relative">
        
        {/* The Ultimate Base Layer: 3D Particle Cloud */}
        <GlobalParticles />

        {/* Global Terminal Code Typing Background */}
        <BackgroundCode />

        {/* Global 3D Snake Background */}
        <Snake3D />

        {/* Global Cinematic Red Glow Overlaying the Code */}
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150vw] h-[100vh] bg-red-900/15 blur-[150px] rounded-[100%] opacity-50" />
          <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-red-950/20 to-transparent blur-[100px]" />
        </div>
        
        <LanguageProvider>
          <CMSProvider>
            <SmoothScroll>
              <CustomCursor />
              {children}
            </SmoothScroll>
          </CMSProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
