"use client";

import React, {useState, useRef, useEffect} from "react";

interface EditableTextProps {
  text: string;
  onSave: (newText: string) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  text,
  onSave,
  placeholder = "Click to add text",
  className = "",
  inputClassName = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle clicking on the label to enter edit mode
  const handleLabelClick = () => {
    setIsEditing(true);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value);
  };

  // Handle saving the edit (on blur or Enter key)
  const handleSave = () => {
    onSave(currentText);
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
      inputRef.current.setSelectionRange(currentText.length, currentText.length);
    }
  }, [isEditing, currentText.length]);

  return (
    <>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={currentText}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className={`text-msngray text-xs p-0.5 bg-transparent h-4 ${inputClassName}`}
        />
      ) : (
        <div
          onClick={handleLabelClick}
          className={`cursor-pointer text-xs text-ellipsis max-w-40 overflow-hidden whitespace-nowrap ${className}`}
        >
          {currentText || placeholder}
        </div>
      )}
    </>
  );
};

export default EditableText;
