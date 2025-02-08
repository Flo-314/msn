"use client"

// context/ZIndexContext.tsx
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
