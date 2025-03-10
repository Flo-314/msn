"use client";

import {useEffect, useRef} from "react";
import DropDownCard from "./dropDownCard";
import {useUser} from "@/lib/hooks/userContext";
import {STATUS_OPTIONS} from "@/types/types";

type WindowsDropDownProps = {
  onClose: () => void;
};

function WindowsDropDown({onClose}: WindowsDropDownProps) {
  const {updateUserStatus} = useUser();

  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul ref={dropdownRef} className="absolute top-full   z-50  border border-input select-none">
      {STATUS_OPTIONS.map((option, index) => (
        <DropDownCard
          onClick={() => {
            updateUserStatus(option.status);
            onClose();
          }}
          key={index}
          iconStatus={option.status}
          text={option.label}
        ></DropDownCard>
      ))}
      <hr className="border-input" />

      <DropDownCard
        text="Change My Display Picture..."
        onClick={() => {
          onClose();
        }}
      />
      <hr className="border-input" />
    </ul>
  );
}

export default WindowsDropDown;
