"use client";
import Window from "@/lib/common/Window";
import { Message, User } from "@/types/types";
import usePartySocket from "partysocket/react";
import { useState } from "react";
interface ChatProps {
  user: User;
  room: string;
}

function Chat({ user, room }: ChatProps) {
  const [text, setText] = useState("");
  const [mesagges, setMessages] = useState<Message[]>([]);

  const ws = usePartySocket({
    host: "localhost:1999", // or localhost:1999 in dev
    room: room,

    onMessage(messageEvent) {
      try {
        const message: Message = JSON.parse(messageEvent.data);

        if (message.type === "chatMessage") {
          setMessages((prev) => [...prev, message]);
        }
      } catch {}
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (!text.trim()) return;

    const newMessage: Message = {
      senderId: user.id, // Usa el `id` del usuario
      message: text,
      type: "chatMessage",
    };

    ws.send(JSON.stringify(newMessage)); // Asegura que se envíe en JSON
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
