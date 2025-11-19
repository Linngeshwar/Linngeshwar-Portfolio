"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useCursor } from "../../context/CursorContext";

// Custom hook for throttled mouse position
const useThrottledMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastUpdateRef = useRef(0);
  const pendingUpdateRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const now = performance.now();

    // Cancel any pending update
    if (pendingUpdateRef.current) {
      cancelAnimationFrame(pendingUpdateRef.current);
    }

    // Throttle to max 60fps (16.67ms)
    const timeSinceLastUpdate = now - lastUpdateRef.current;
    if (timeSinceLastUpdate < 16.67) {
      pendingUpdateRef.current = requestAnimationFrame(() => {
        handleMouseMove(e);
      });
      return;
    }

    lastUpdateRef.current = now;

    // Batch state updates
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    const options = { passive: true, capture: false };
    document.addEventListener("mousemove", handleMouseMove, options);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove, options);
      if (pendingUpdateRef.current) {
        cancelAnimationFrame(pendingUpdateRef.current);
      }
    };
  }, [handleMouseMove]);

  return { position };
};

function CustomCursor() {
  const { position } = useThrottledMousePosition();
  const [clicked, setClicked] = useState(false);
  const cursorRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const { isMenuHovered, menuButtonPosition } = useCursor();

  // Track if mouse is inside a button
  const [isButtonActive, setIsButtonActive] = useState(false);

  useEffect(() => {
    // Listen for mouseup to reset hover state if stuck
    const handleMouseUp = () => {
      setIsButtonActive(false);
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    // If menu hover is off, always reset button active
    if (!isMenuHovered) setIsButtonActive(false);
  }, [isMenuHovered]);

  // Memoized styles with better performance
  const cursorStyles = useMemo(() => {
    if (isMenuHovered && menuButtonPosition && !isButtonActive) {
      return {
        position: "fixed",
        transform: `translate3d(${menuButtonPosition.x}px, ${menuButtonPosition.y}px, 0)`,
        width: `${menuButtonPosition.width}px`,
        height: `${menuButtonPosition.height}px`,
        borderRadius: "8px",
        willChange: "transform",
      };
    }
    return {
      position: "fixed",
      transform: `translate3d(${position.x - 10}px, ${position.y - 10}px, 0)`,
      width: "25px",
      height: "25px",
      borderRadius: "50%",
    };
  }, [
    isMenuHovered,
    menuButtonPosition,
    position.x,
    position.y,
    isButtonActive,
  ]);

  // Optimize class concatenation
  const cursorClasses = useMemo(() => {
    const baseClasses =
      "fixed pointer-events-none z-[9999] transition-all duration-150 ease-out border-3 mix-blend-difference  ";

    if (isMenuHovered) {
      return `${baseClasses} border-white`;
    } else {
      return `${baseClasses} border-white`;
    }
  }, [isMenuHovered]);

  const innerCursorClasses = useMemo(() => {
    const baseClasses =
      "w-[1.2rem] h-[1.2rem] bg-white transition-all duration-150 ease-in-out rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";

    if (isMenuHovered) {
      return `${baseClasses} hidden`;
    }

    return `${baseClasses} ${
      clicked ? "opacity-100 scale-100" : "opacity-0 scale-0"
    }`;
  }, [clicked, isMenuHovered]);

  // Handle click animation for inner cursor
  const handleMouseClick = useCallback(() => {
    setClicked(true);
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    clickTimeoutRef.current = setTimeout(() => {
      setClicked(false);
    }, 300);
    // Also reset button active state on click to prevent stuck border
    setIsButtonActive(false);
  }, []);

  useEffect(() => {
    const options = { passive: true };
    document.addEventListener("click", handleMouseClick, options);
    return () => {
      document.removeEventListener("click", handleMouseClick, options);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [handleMouseClick]);

  return (
    <div
      ref={cursorRef}
      style={cursorStyles}
      className={cursorClasses}
      onMouseDown={() => setIsButtonActive(true)}
      onMouseUp={() => setIsButtonActive(false)}
    >
      <div className={innerCursorClasses} />
    </div>
  );
}

export default CustomCursor;
