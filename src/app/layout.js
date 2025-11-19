import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Squares from "@/Backgrounds/Squares/Squares";
import Particles from "@/Backgrounds/Particles/Particles";
import CustomCursor from "./components/Cursor/CustomCursor";
import { CursorProvider } from "./context/CursorContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://linngeshwar-portfolio.vercel.app"),
  title: {
    default: "Linngeshwar B | Full Stack Developer & Web Engineer",
    template: "%s | Linngeshwar B",
  },
  description:
    "Wow you're actually reading this? Thats crazyyyyy - Passionate full-stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my portfolio of innovative projects and interactive experiences.",
  keywords: [
    "Linngeshwar",
    "linngeshwar b",
    "linngeshwar",
    "Linngeshwar B",
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Portfolio",
    "Web Engineer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: [{ name: "Linngeshwar B" }],
  creator: "Linngeshwar B",
  publisher: "Linngeshwar B",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://linngeshwar-portfolio.vercel.app",
    title: "Linngeshwar B | Full Stack Developer & Web Engineer",
    description:
      "Wow you're actually reading this? Thats crazyyyyy - Passionate full-stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Explore my portfolio of innovative projects and interactive experiences.",
    siteName: "Linngeshwar B Portfolio",
    images: [
      {
        url: "/og-image.jpg", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Linngeshwar B - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Linngeshwar B | Full Stack Developer & Web Engineer",
    description:
      "Wow you're actually reading this? Thats crazyyyyy - Passionate full-stack web developer specializing in React, Next.js, Node.js, and modern web technologies.",
    creator: "@linngeshwar", // Update with your Twitter handle
    images: ["/og-image.jpg"], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://linngeshwar-portfolio.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CursorProvider>
          <CustomCursor />
          <Toaster position="top-right" reverseOrder={false} />
          {children}
          <div className="fixed inset-0 z-[-1] overflow-hidden">
            <Particles particleCount={200} alphaParticles={true} />
          </div>
        </CursorProvider>
      </body>
    </html>
  );
}
