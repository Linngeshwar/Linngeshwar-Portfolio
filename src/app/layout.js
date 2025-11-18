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
  title: "Linngeshwar's Portfolio",
  description: "Wow you're actually reading this? Thats crazyyyyy",
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
