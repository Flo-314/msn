"use client";
import Window from "@/lib/common/Window";
import { insertMessage } from "@/lib/supabase/models";
import { getChatRoomId } from "@/lib/utils/partykit/partykitUtils";
import { Message } from "@/types/types";
import { UUID } from "crypto";
import usePartySocket from "partysocket/react";
import { useState } from "react";
interface ChatProps {
  userId: UUID;
  contactId: UUID;
}

function Chat({ userId, contactId }: ChatProps) {
  const [text, setText] = useState("");
  const [mesagges, setMessages] = useState<Message[]>([]);
  const chatPartySocket = usePartySocket({
    host: "localhost:1999", // or localhost:1999 in dev
    party: "chat",
    room: getChatRoomId(userId, contactId),
    id: userId,
    onMessage(messageEvent) {
      try {
        const message: Message = JSON.parse(messageEvent.data);
        if (message.type === "new_message") {
          setMessages((prev) => [...prev, JSON.parse(message.message)]);
        }
      } catch {}
    },
  });

  const contactNotificationSocket = usePartySocket({
    host: "localhost:1999", // or localhost:1999 in dev
    party: "notifications",
    room: contactId,
    id: userId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (!text.trim()) return;

    const newMessage: Message = {
      senderId: userId,
      message: text,
      type: "chatMessage",
    };

    chatPartySocket.send(JSON.stringify(newMessage));
    contactNotificationSocket.send(JSON.stringify(newMessage));

    insertMessage(userId, contactId, text);

    setMessages((prev) => [...prev, newMessage]);
    setText("");
  };
  return (
    <div>
      <Window>
        {mesagges.map((mesagge, i) => (
          <div key={i} className="flex gap-4">
            <p className="text-white">{mesagge.senderId} : </p>
            <p>{mesagge.message}</p>
          </div>
        ))}
        <textarea value={text} onChange={handleChange} />
        <button onClick={handleSend}>enviar</button>
      </Window>
    </div>
  );
}

export default Chat;
