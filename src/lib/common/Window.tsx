"use client";
import React, {useState} from "react";
import {useZIndex} from "@/lib/hooks/ZIndexContext";
import WindowButton from "./WindowButton";
import Image from "next/image";

const Window = ({
  children,
  windowHeaderName,
  onClose,
}: {
  children?: React.ReactNode;
  windowHeaderName?: string;
  onClose?: () => void;
}) => {
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
      className="absolute   rounded-t-xl  "
      onClick={handleWindowClick}
      style={{
        top: position.y,
        left: position.x,
        zIndex: localZIndex,
      }}
    >
      <div className="">
        <div
          onMouseDown={handleMouseDown}
          className={`flex items-center px-1 rounded-t-lg justify-between bg-window-header-gradient ${isDragging ? "cursor-grabbing" : "cursor-grab"} h-[29px]`}
        >
          <div className="flex items-center gap-2">
            <div className=" ">
              <Image height={16} width={16} alt="windowIcon" src="/msnpersonlogo.png"></Image>
            </div>
            <span className="text-sm text-white">{windowHeaderName}</span>
          </div>
          <div className="flex gap-1 text-white ">
            <WindowButton type="minimize"></WindowButton>
            <WindowButton type="maximize"></WindowButton>
            <WindowButton onClick={onClose} type="close"></WindowButton>
          </div>
        </div>
      </div>
      <div className="px-0.5 pb-0.5 bg-winBlue ">{children}</div>
    </div>
  );
};

export default Window;
