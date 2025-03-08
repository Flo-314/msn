"use client";

import {useState} from "react";
import WindowsDropDown from "./windowsDropDown";
import {useUser} from "@/lib/hooks/userContext";
import {STATUS_DESCRIPTIONS} from "@/types/types";
import TriangleIcon from "@/lib/common/TriangleIcon";
import EditableText from "@/lib/common/EditableText";

export default function ProfileDropdown() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const {user, updateUsername} = useUser();

  const handleClose = () => {
    setIsProfileDropdownOpen(false);
  };
  const handleSaveUsername = (newUsername: string) => {
    updateUsername(newUsername);
  };

  return (
    <div className="flex flex-col gap-1 mt-1 relative w-fit">
      <div
        className={`relative flex text-xs gap-2  border cursor-pointer hover:border-blue-dark hover:bg-gray-light ${isProfileDropdownOpen ? "bg-gray-light border-blue-dark" : "border-transparent bg-transparent"}`}
      >
        <EditableText
          text={user?.username || ""}
          onSave={handleSaveUsername}
          placeholder="Click to add username"
          className="font-bold"
          inputClassName="text-msngray text-xs p-0.5 bg-transparent h-4"
        />
        <div
          className="flex gap-1"
          onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
        >
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
