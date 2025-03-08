"use client";

import {useUser} from "@/lib/hooks/userContext";
import React from "react";
import EditableText from "@/lib/common/EditableText";

export default function PersonalMessageInput() {
  const {updatePersonalMessage, user} = useUser();

  const handleSave = (newText: string) => {
    updatePersonalMessage(newText);
  };

  return (
    <EditableText
      text={user?.personalMessage || ""}
      onSave={handleSave}
      placeholder="Click to add text"
      inputClassName="text-msngray text-xs p-0.5 bg-transparent h-4"
    />
  );
}
