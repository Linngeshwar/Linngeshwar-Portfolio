"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCursor } from "../context/CursorContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { setMenuHover } = useCursor();

  const navItems = useMemo(
    () => ["Welcome", "About", "Koala", "Projects", "Contact"],
    []
  );

  const handleMenuHover = useCallback(
    (isHovered) => {
      if (menuButtonRef.current) {
        const rect = menuButtonRef.current.getBoundingClientRect();
        const position = {
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        };
        setMenuHover(isHovered, position);
      }
    },
    [setMenuHover]
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const buttonClasses = useMemo(
    () =>
      `px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out ${
        isMenuOpen
          ? "bg-transparent text-white"
          : "bg-white text-black hover:bg-transparent hover:text-white"
      }`,
    [isMenuOpen]
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
        <button
          ref={menuButtonRef}
          onMouseEnter={() => handleMenuHover(true)}
          onMouseLeave={() => handleMenuHover(false)}
          onClick={toggleMenu}
          className={buttonClasses}
        >
          Menu
        </button>
      </nav>

      {/* Full-screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="fixed inset-0 bg-black z-30 flex flex-col items-center justify-center"
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="absolute top-8 right-8 text-white text-2xl hover:text-gray-300 transition-colors z-40"
            >
              ✕
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col items-center space-y-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="group relative overflow-hidden"
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    onClick={closeMenu}
                    className="block relative px-8 py-4 text-4xl md:text-6xl font-bold text-white transition-colors duration-300 group-hover:text-black z-10"
                  >
                    {/* Background slide effect */}
                    <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                    {/* Top bar slide effect */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-black transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out delay-200"></div>

                    {/* Text */}
                    <span className="relative z-10">{item}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Additional overlay content or decorative elements */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-8 text-white text-sm opacity-50"
            >
              Navigate to explore
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
