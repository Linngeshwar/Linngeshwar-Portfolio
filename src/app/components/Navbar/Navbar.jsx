"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCursor } from "../../context/CursorContext";
import CursorButton from "../Cursor/CursorButton";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const { setMenuHover } = useCursor();

  const navItems = useMemo(
    () => ["About", "Projects", "Koala", "Skills", "Contact", "Resume"],
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

  const handleNavClick = useCallback(
    (e, item) => {
      if (item === "Resume") return; // Let Resume link work normally

      e.preventDefault();
      closeMenu();

      // Use setTimeout to ensure menu closes before scrolling
      setTimeout(() => {
        const targetId = item.toLowerCase();
        const element = document.getElementById(targetId);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300); // Wait for menu close animation
    },
    [closeMenu]
  );

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
      <nav className="fixed flex flex-col justify-center items-end top-8 right-8 z-[200] outline-none">
        <CursorButton onClick={toggleMenu} className={buttonClasses}>
          <span className="relative block h-[1.5em] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isMenuOpen ? "close" : "menu"}
                initial={{ y: isMenuOpen ? 20 : -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: isMenuOpen ? 20 : -20, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="w-full block text-inherit"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </motion.span>
            </AnimatePresence>
          </span>
        </CursorButton>
      </nav>

      {/* Full-screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-101%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.6, ease: [0.6, 0.01, 0.05, 0.95] }}
            className="fixed inset-0 bg-[#000000db] z-[50] flex flex-col items-center justify-center"
          >
            {/* Close button */}
            {/* Navigation Links */}
            <div className="flex flex-col items-start space-y-8">
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
                  className=" clickable-white group relative overflow-hidden"
                >
                  <Link
                    href={
                      item === "Resume"
                        ? "/resume.pdf"
                        : `#${item.toLowerCase()}`
                    }
                    target={item === "Resume" ? "_blank" : undefined}
                    onClick={(e) => handleNavClick(e, item)}
                    className="block relative px-8 py-4 text-4xl md:text-6xl font-bold text-white transition-colors duration-300 group-hover:text-black z-10"
                  >
                    {/* Background slide effect */}
                    <div className="absolute inset-0 bg-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>

                    {/* Left bar - always visible */}
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-white"></div>

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
