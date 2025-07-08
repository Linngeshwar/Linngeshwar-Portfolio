"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useCursor } from "../context/CursorContext";

// Custom hook for throttled mouse position
const useThrottledMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const lastUpdateTime = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const now = Date.now();

    // Throttle to 60fps max
    if (now - lastUpdateTime.current < 16) {
      return;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      lastUpdateTime.current = now;
    });
  }, []);

  useEffect(() => {
    const options = { passive: true };
    window.addEventListener("mousemove", handleMouseMove, options);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleMouseMove]);

  return position;
};

function CustomCursor() {
  const position = useThrottledMousePosition();
  const [clicked, setClicked] = useState(false);
  const cursorRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const { isMenuHovered, menuButtonPosition } = useCursor();

  const handleMouseClick = useCallback(() => {
    setClicked(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setClicked(false);
    }, 300);
  }, []);

  // Memoized styles to prevent recalculation
  const cursorStyles = useMemo(() => {
    if (isMenuHovered && menuButtonPosition) {
      return {
        transform: `translate3d(${menuButtonPosition.x}px, ${menuButtonPosition.y}px, 0)`,
        width: `${menuButtonPosition.width}px`,
        height: `${menuButtonPosition.height}px`,
        borderRadius: "8px",
      };
    }
    return {
      transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
      width: "20px",
      height: "20px",
      borderRadius: "50%",
    };
  }, [isMenuHovered, menuButtonPosition, position.x, position.y]);

  const cursorClasses = useMemo(() => {
    return `fixed pointer-events-none z-50 border-2 border-white transition-all duration-300 ease-out cursor-optimized ${
      isMenuHovered ? "border-white" : ""
    }`;
  }, [isMenuHovered]);

  const innerCursorClasses = useMemo(() => {
    return `w-[1.2rem] h-[1.2rem] bg-white transition-all duration-300 ease-in-out rounded-full ${
      clicked ? "opacity-100 scale-100" : "opacity-0 scale-0"
    } ${isMenuHovered ? "hidden" : ""}`;
  }, [clicked, isMenuHovered]);

  useEffect(() => {
    const options = { passive: true };
    window.addEventListener("click", handleMouseClick, options);

    return () => {
      window.removeEventListener("click", handleMouseClick);

      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [handleMouseClick]);

  return (
    <div ref={cursorRef} style={cursorStyles} className={cursorClasses}>
      <div className={innerCursorClasses} />
    </div>
  );
}

export default CustomCursor;
