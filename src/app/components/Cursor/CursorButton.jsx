"use client";

import React, { useRef, useCallback } from "react";
import { useCursor } from "../../context/CursorContext";

export default function CursorButton({ children, className = "", ...props }) {
  const buttonRef = useRef(null);
  const { setMenuHover } = useCursor();

  // Default button styling (without background to allow parent control)
  const defaultClasses =
    "px-6 py-3 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out";

  const mergedClasses = `${defaultClasses} ${className}`.trim();

  const handleMouseEnter = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuHover(true, {
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [setMenuHover]);

  const handleMouseLeave = useCallback(() => {
    setMenuHover(false);
  }, [setMenuHover]);

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={mergedClasses}
      {...props}
    >
      {children}
    </button>
  );
}
