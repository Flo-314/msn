"use client";
import React, {useState} from "react";
import {useZIndex} from "@/lib/hooks/ZIndexContext";

const Window = ({children, childrenName}: {children?: React.ReactNode; childrenName?: string}) => {
  const {zIndex, incrementZIndex} = useZIndex();
  const [position, setPosition] = useState({x: 100, y: 100});
  const [localZIndex, setLocalZIndex] = useState(zIndex);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (moveEvent: MouseEvent, offsetX: number, offsetY: number) => {
    setPosition({
      x: moveEvent.clientX - offsetX,
      y: moveEvent.clientY - offsetY,
    });
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    document.body.style.userSelect = "none";
    setIsDragging(true);

    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleDrag = (moveEvent: MouseEvent) => {
      updatePosition(moveEvent, offsetX, offsetY);
    };

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", () => {
      window.removeEventListener("mousemove", handleDrag);
      setIsDragging(false);
      document.body.style.userSelect = "text"; // Restore text selection
    });
  };

  const handleWindowClick = () => {
    setLocalZIndex(zIndex + 1); // Increment zIndex for the current window
    incrementZIndex(); // Update global zIndex
  };

  return (
    <div
      onClick={handleWindowClick}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
        zIndex: localZIndex,
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        className={`flex items-center justify-between bg-window-header-gradient ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 " />
          <span className="text-sm text-white">{childrenName}</span>
        </div>
        <div className="flex gap-1">
          <button aria-label="Minimize" className="h-xpButton w-xpButton ">
            _
          </button>
          <button aria-label="Maximize" className="h-xpButton w-xpButton  ">
            □
          </button>
          <button aria-label="Close" className="h-xpButton w-xpButton  ">
            x
          </button>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Window;
