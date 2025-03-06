"use client";
import {StatusIcon} from "@/modules/mensagger/contactList/StatusIcon";
import {UserStatus} from "@/types/types";
import {useState} from "react";

function DropDownCard({
  text,
  iconStatus,
  onClick,
}: {
  text: string;
  iconStatus?: UserStatus;
  onClick?: () => void;
}) {
  return (
    <li
      className={`flex items-center  py-1 text-xs cursor-pointer     bg-gray-light hover:bg-winBlue hover:text-white ${!iconStatus ? " text-nowrap pl-[22px] pr-10" : "px-1 gap-2"} `}
      onClick={onClick}
    >
      {iconStatus ? <StatusIcon userStatus={iconStatus}></StatusIcon> : null}
      {text}
    </li>
  );
}

export default DropDownCard;
