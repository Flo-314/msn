"use client";
import Window from "@/lib/common/Window";
import {insertMessage} from "@/lib/supabase/models";
import {getChatRoomId, partykitUrl} from "@/lib/utils/partykit/partykitUtils";
import {Message} from "@/types/types";
import Image from "next/image";
import usePartySocket from "partysocket/react";
import {useState} from "react";
interface ChatProps {
  userId: string;
  contactId: string;
}

function Chat({userId, contactId}: ChatProps) {
  const [text, setText] = useState("");
  const [mesagges, setMessages] = useState<Message[]>([]);
  const chatPartySocket = usePartySocket({
    host: partykitUrl,
    party: "chat",
    room: getChatRoomId(userId, contactId),
    id: userId,
    onMessage(messageEvent) {
      try {
        const message: Message = JSON.parse(messageEvent.data);

        if (message.type === "chatMessage") {
          setMessages((prev) => [...prev, JSON.parse(message.message)]);
        }
      } catch {}
    },
  });
  const contactNotificationSocket = usePartySocket({
    host: partykitUrl,
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
      contactId: userId,
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
    <Window>
      <div className="w-[500px] border border-[#2454C5] shadow-lg rounded-t overflow-hidden bg-[#ECE9D8]">
        <div className="flex">
          <div className="flex-1 p-2">
            <div className="">
              <label className="text-sm mb-1 block">To:</label>
            </div>

            <div className="bg-white border border-[#999] h-[200px] rounded mb-4">
              {mesagges.map((mesagge, i) => (
                <div key={i} className="flex gap-4">
                  <p className="text-winBlue text-wrap">{mesagge.contactId} : </p>
                  <p className="text-violet-950 text-wrap">{mesagge.message}</p>
                </div>
              ))}
            </div>

            {/* Formatting Toolbar */}
            <div className="flex items-center gap-2 mb-2">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <textarea value={text} onChange={handleChange} />
              <div className="space-y-1">
                <button
                  onClick={() => {
                    handleSend();
                  }}
                  className="w-16 bg-gradient-to-b from-[#FFF] to-[#E3E3E3] border border-[#999] text-black hover:from-[#E3E3E3] hover:to-[#E3E3E3]"
                >
                  Send
                </button>
                <button className="w-16 bg-gradient-to-b from-[#FFF] to-[#E3E3E3] border border-[#999] text-black hover:from-[#E3E3E3] hover:to-[#E3E3E3]">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="flex  flex-col gap-36 p-2">
            <div className="border-2 border-msnDarkGray">
              <Image
                src="/msnpersonlogo.png"
                alt="Avatar"
                width={80}
                height={80}
                className="rounded"
              />
            </div>

            <div className=" border-2 border-msnDarkGray">
              <Image src="/dog.webp" alt="Duck Avatar" width={80} height={80} className="rounded" />
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
}

export default Chat;
