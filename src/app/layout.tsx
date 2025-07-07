import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Baicheng Chen",
  description: "Baicheng Chen is a sophomore student at CUHK-Shenzhen working on Trustworthy AI.",
  icons: {
    icon: [
      { url: '/head.jpg', type: 'image/jpeg', sizes: 'any' },
    ],
    shortcut: '/head.jpg',
    apple: [
      { url: '/head.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/jpeg',
        url: '/head.jpg',
      },
      {
        rel: 'manifest',
        url: '/manifest.json',
      },
    ],
  },
  themeColor: '#3b82f6',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} ${notoSansSC.variable} ${notoSerifSC.variable}`} suppressHydrationWarning>
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        ></Script>
      </head>
      <body suppressHydrationWarning className="antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <ThemeProvider>
          <ClientBody>{children}</ClientBody>
        </ThemeProvider>
      </body>
    </html>
  );
}
