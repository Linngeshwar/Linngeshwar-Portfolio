"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import About from "./components/About";
// import Projects from "./components/Projects";
import MaybeProjects from "./components/MaybeProjects";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import Lenis from "lenis";

// Import KoalaType lazily
const KoalaType = dynamic(() => import("./components/KoalaType"), {
  loading: () => (
    <div className="h-screen flex items-center justify-center text-neutral-400">
      Loading typing game...
    </div>
  ),
  ssr: false, // Disable server-side rendering for this component
});

export default function Home() {
  const [showKoalaType, setShowKoalaType] = useState(false);
  const [koalaTypeRef, setKoalaTypeRef] = useState(null);

  useEffect(() => {
    // Force scroll to top on initial page load

    // Set up intersection observer for lazy loading
    if (koalaTypeRef) {
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

      observer.observe(koalaTypeRef);

      return () => observer.disconnect();
    }
  }, [koalaTypeRef]);

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
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      console.log("scrollYProgress:", v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // const scale = useTransform(scrollYProgress, [0.9, 1], [1, 0.7]);

  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);
  // const antiRotate = useTransform(scrollYProgress, [0.9, 1], [0, 30]);

  // const rotate = useTransform(scrollYProgress, [0.9, 1], [30, 0]);
  const scale = useTransform(scrollYProgress, [0.9, 1], [0.5, 1]);
  // const x = useTransform(scrollYProgress, [0.9, 1], ["-100%", "0% "]);

  return (
    <div>
      <Navbar />
      <About />
      {/* <Projects /> */}
      <div className="min-h-screen" ref={containerRef}>
        {/* Projects section with opacity fade */}
        <motion.div className="sticky top-0" style={{ opacity }}>
          <MaybeProjects />
        </motion.div>

        {/* KoalaType section - Removed motion.div wrapper to improve interactivity */}
        <motion.div
          ref={setKoalaTypeRef}
          // style={{ scale }}
          className="min-h-screen relative z-10"
        >
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
        </motion.div>
      </div>
    </div>
  );
}
