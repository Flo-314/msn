"use client"
// components/Window.tsx
import { useState } from "react";
import { useZIndex } from "@/lib/ZIndexContext";

const Window = () => {
  const { zIndex, incrementZIndex } = useZIndex();
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [localZIndex, setLocalZIndex] = useState(zIndex);

  const updatePosition = (moveEvent: MouseEvent, offsetX: number, offsetY: number) => {
    setPosition({
      x: moveEvent.clientX - offsetX,
      y: moveEvent.clientY - offsetY,
    });
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    document.body.style.userSelect = "none";

    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;

    const handleDrag = (moveEvent: MouseEvent) => {
      updatePosition(moveEvent, offsetX, offsetY);
    };

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', handleDrag);
    });
  };

  const handleMouseUp = () => {
    document.body.style.userSelect = "text";


  }      

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
        background: "linear-gradient(to bottom, #A9C2D9, #7F9BBF)",
        border: "2px solid #003366",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        fontFamily: "Tahoma, sans-serif",
        zIndex: localZIndex, //usa el zindex global + 1
      }}
    >
      <div
        style={{
          background: "#003366",
          color: "white",
          padding: "5px",
          cursor: "move",
          textAlign: "center",
          borderRadius: "3px 3px 0 0",
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        My Windows XP Window
      </div>
      <div
        style={{
          padding: "10px",
          overflowY: "auto",
        }}
      >
        <p>
          Some content goes here. It can be any text or elements e to show
          inside the window.
        </p>
      </div>
    </div>
  );
};

export default Window;
