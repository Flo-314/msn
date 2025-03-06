"use client";

import {useUser} from "@/lib/hooks/userContext";
import type React from "react";

import {useState, useRef, useEffect} from "react";

export default function PersonalMessageInput() {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const {updatePersonalMessage, user} = useUser();

  // Handle clicking on the label to enter edit mode
  const handleLabelClick = () => {
    setIsEditing(true);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // Handle saving the edit (on blur or Enter key)
  const handleSave = () => {
    updatePersonalMessage(text);
    setIsEditing(false);
  };

  // Handle key press events (Enter to save, Escape to cancel)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // Position cursor at the end of the text
      inputRef.current.setSelectionRange(text.length, text.length);
    }
  }, [isEditing, text.length]);
  useEffect(() => {
    setText(user?.personalMessage || "");
  }, [user]);

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`text-msngray text-xs p-0.5 bg-transparent h-4   `}
        />
      ) : (
        <div
          onClick={handleLabelClick}
          className={`cursor-pointer text-xs text-ellipsis  max-w-40 overflow-hidden whitespace-nowrap  `}
        >
          {text || "Click to add text "}
        </div>
      )}
    </>
  );
}
