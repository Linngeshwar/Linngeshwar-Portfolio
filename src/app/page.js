"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import MaybeProjects from "./components/Projects/MaybeProjects";
import ProjectsFinally from "./components/Projects/ProjectsFinally";
import Footer from "./components/Footer/Footer";
import QuickFactsCarousel from "./components/About/QuickFactsCarousel";
import { useRef } from "react";
import Lenis from "lenis";

const KoalaType = dynamic(() => import("./components/Koala/KoalaType"), {
  loading: () => (
    <div className="h-screen flex items-center justify-center text-neutral-400">
      Loading typing game...
    </div>
  ),
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  const [showKoalaType, setShowKoalaType] = useState(false);
  const koalaTypeRef = useRef(null);

  useEffect(() => {
    // Set up intersection observer for lazy loading
    if (koalaTypeRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          // When KoalaType section is approaching viewport, load it
          if (entry.isIntersecting) {
            setShowKoalaType(true);
            observer.disconnect();
          }
        },
        {
          rootMargin: "200px", // Start loading when within 200px of viewport
        }
      );

      observer.observe(koalaTypeRef.current);

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Navbar />
      <About />
      <QuickFactsCarousel />
      {/* <MaybeProjects /> */}
      <ProjectsFinally />

      {/* Sticky scroll container */}
      <div className="relative">
        {/* KoalaType section */}
        <div ref={koalaTypeRef} className="min-h-screen sticky top-0 z-10">
          {showKoalaType ? (
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center text-neutral-400">
                  Loading typing game...
                </div>
              }
            >
              <KoalaType />
            </Suspense>
          ) : (
            <div className="h-screen flex items-center justify-center text-neutral-400">
              Scroll down to load typing game...
            </div>
          )}
        </div>

        {/* Skills section - sticks on top of KoalaType */}
        <div className="min-h-screen sticky top-0 z-20">
          <Skills />
        </div>

        {/* Contact section - sticks on top of Skills */}
        <div className="min-h-screen sticky top-0 z-30">
          <Contact />
        </div>
      </div>

      {/* Footer section - static after sticky sections */}
      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  );
}
