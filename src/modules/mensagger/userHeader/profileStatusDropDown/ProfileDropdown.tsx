"use client";

import {useState} from "react";
import WindowsDropDown from "./windowsDropDown";
import {useUser} from "@/lib/hooks/userContext";
import {STATUS_DESCRIPTIONS} from "@/types/types";
import TriangleIcon from "@/lib/common/TriangleIcon";

export default function ProfileDropdown() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const {user} = useUser();

  const handleClose = () => {
    setIsProfileDropdownOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 mt-1 relative w-fit">
      <div
        className={`relative flex text-xs gap-2 px-1 border cursor-pointer hover:border-blue-dark hover:bg-gray-light ${isProfileDropdownOpen ? "bg-gray-light border-blue-dark" : "border-transparent bg-transparent"}`}
        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
      >
        <span className="font-bold">{user?.username}</span>
        <div className="flex gap-1">
          <span className="text-gray-dark capitalize">
            ({STATUS_DESCRIPTIONS[user?.status ?? "offline"]})
          </span>
          <TriangleIcon></TriangleIcon>
        </div>
      </div>
      {isProfileDropdownOpen && <WindowsDropDown onClose={handleClose} />}
    </div>
  );
}
