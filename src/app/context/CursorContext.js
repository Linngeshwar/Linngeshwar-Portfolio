"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const CursorContext = createContext();

export const useCursor = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
};

export const CursorProvider = ({ children }) => {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [menuButtonPosition, setMenuButtonPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const setMenuHover = useCallback((isHovered, position = null) => {
    setIsMenuHovered(isHovered);
    if (position) {
      setMenuButtonPosition(position);
    } else if (!isHovered) {
      // Reset position when hover ends to avoid cursor getting stuck
      setMenuButtonPosition({ x: 0, y: 0, width: 0, height: 0 });
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      isMenuHovered,
      menuButtonPosition,
      setMenuHover,
    }),
    [isMenuHovered, menuButtonPosition, setMenuHover]
  );

  return (
    <CursorContext.Provider value={contextValue}>
      {children}
    </CursorContext.Provider>
  );
};
