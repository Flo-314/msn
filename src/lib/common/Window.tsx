"use client";
// components/Window.tsx
import React, { useState } from "react";
import { useZIndex } from "@/lib/hooks/ZIndexContext";

const Window = ({
  children,
  childrenName,
}: {
  children?: React.ReactNode;
  childrenName?: string;
}) => {
  const { zIndex, incrementZIndex } = useZIndex();
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [localZIndex, setLocalZIndex] = useState(zIndex);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = (
    moveEvent: MouseEvent,
    offsetX: number,
    offsetY: number,
  ) => {
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
    });
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "text";
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={() => {
        setLocalZIndex(zIndex + 1); // usa el zindex global +1 para superponerse.
      }}
      onMouseUp={() => {
        incrementZIndex();
      }}
      style={{
        position: "absolute",
        top: position.y,
        left: position.x,
        width: "400px",
        height: "300px",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        zIndex: localZIndex, //usa el zindex global + 1
      }}
    >
      <div
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={`flex  h-7 items-center justify-between bg-gradient-to-r from-[#0D396E] to-[#BFD7F2] px-2 ${isDragging ? "cursor-grabbing" : "cursor-grab"} `}
      >
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gradient-to-br from-[#5CB800] via-[#76E600] to-[#5CB800]" />
          <span className="text-sm text-white">{childrenName}</span>
        </div>
        <div className="flex gap-[2px]">
          <button className="h-[18px] w-[21px] bg-[#C5C9D2] text-xs leading-3 hover:bg-[#E3E6ED]">
            _
          </button>
          <button className="h-[18px] w-[21px] bg-[#C5C9D2] text-xs leading-3 hover:bg-[#E3E6ED]">
            □
          </button>
          <button className="h-[18px] w-[21px] bg-[#C5C9D2] text-xs leading-3 hover:bg-[#E3E6ED]">
            x
          </button>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default Window;
