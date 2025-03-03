"use client";

import {ChatProvider} from "@/lib/hooks/ChatContext";
import ChatWindow from "./subcomponents/ChatWindow";

interface ChatWindowProps {
  userId: string;
  contactId: string;
}

function Chat({userId, contactId}: ChatWindowProps) {
  return (
    <ChatProvider userId={userId} contactId={contactId}>
      <ChatWindow />
    </ChatProvider>
  );
}

export default Chat;
