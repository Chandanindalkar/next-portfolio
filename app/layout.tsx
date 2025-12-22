import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/Providers";
import ThemeToggle from "@/components/ui/ThemeToggle";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import FloatingNav from "@/components/ui/FloatingNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Portfolio | Engineering Excellence",
    template: "%s | Portfolio"
  },
  description: "A premium portfolio showcasing high-performance web applications and engineering excellence.",
  openGraph: {
    title: "Portfolio | Engineering Excellence",
    description: "A premium portfolio showcasing high-performance web applications and engineering excellence.",
    url: "https://portfolio.example.com",
    siteName: "Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Engineering Excellence",
    description: "A premium portfolio showcasing high-performance web applications and engineering excellence.",
    creator: "@handle",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Preloader />
          <CustomCursor />
          <FloatingNav />
          <ThemeToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
