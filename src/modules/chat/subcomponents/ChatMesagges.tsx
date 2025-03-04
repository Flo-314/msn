import {useChat} from "@/lib/hooks/chatContext";
import {useUser} from "@/lib/hooks/userContext";
import {useEffect, useRef} from "react";

function ChatMessages() {
  const {contact, messages} = useChat();
  const {user} = useUser();

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  }, [messages]);

  return (
    <div className="grid justify-center grid-cols-[1fr] grid-rows-[28px_1fr] font-[Verdana] text-[10px] w-[97%] h-full border border-[#586170] rounded-t-[8px] m-[2px_1px]">
      <div className="rounded-t-[8px] bg-[#EEF0FD] flex items-center pl-[6px] border-b border-b-[#586170]">
        To: <strong className="pl-[3px]">{contact.username}</strong>
      </div>
      <div className="bg-white overflow-y-auto max-h-[130px]">
        {messages.map(({message, contactId}, i) => (
          <div key={i} className="">
            <p className="text-winBlue text-wrap">
              {contactId === contact.contactId ? contact.username : user?.username} says:{" "}
            </p>
            <p className="text-violet-950 text-wrap ml-6">{message}</p>
          </div>
        ))}
        {/* This is a anchor div for scrolling when a new msg incomes  */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatMessages;
