"use client";

import {useEffect, useRef} from "react";
import DropDownCard from "./dropDownCard";
import {STATUS_OPTIONS, UserStatus} from "@/types/types";

type WindowsDropDownProps = {
  onClose: () => void;
  onUpdateUserStatus: (userStatus: UserStatus) => void;
  isLogin?: boolean;
};

function StatusDropDown({onClose, onUpdateUserStatus, isLogin = false}: WindowsDropDownProps) {
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
            onUpdateUserStatus(option.status);
            onClose();
          }}
          key={index}
          iconStatus={option.status}
          text={option.label}
        ></DropDownCard>
      ))}
      <hr className="border-input" />

      <DropDownCard
        text={isLogin ? "Personal Settings" : "Change My Display Picture..."}
        onClick={() => {
          onClose();
        }}
      />
      <hr className="border-input" />
    </ul>
  );
}

export default StatusDropDown;
