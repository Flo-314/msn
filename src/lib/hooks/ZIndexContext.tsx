"use client";

/*
 * Global context for managing Z-index in a multi-window interface.

 * context  controls the stacking order of windows with a Zindex counter.
 * whenever a window is clicked, its Z-index increases, ensuring it appears top.
 * 
 * Usage:
 * 1. Wrap the application with `<ZIndexProvider>`.
 * 2. Use `useZIndex()` whenever yo need modify or read the Z-index.
 */

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ZIndexContextType {
  zIndex: number;
  incrementZIndex: () => void;
}
interface ZIndexProviderProps {
  children: ReactNode;
}

const ZIndexContext = createContext<ZIndexContextType | undefined>(undefined);

export const ZIndexProvider: React.FC<ZIndexProviderProps> = ({ children }) => {
  const [zIndex, setZIndex] = useState(1);

  const incrementZIndex = () => {
    setZIndex((prevZIndex) => prevZIndex + 1);
  };

  return (
    <ZIndexContext.Provider value={{ zIndex, incrementZIndex }}>
      {children}
    </ZIndexContext.Provider>
  );
};

export const useZIndex = (): ZIndexContextType => {
  const context = useContext(ZIndexContext);
  if (!context) {
    throw new Error("useZIndex must be used within a ZIndexProvider");
  }
  return context;
};
