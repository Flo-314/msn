import ChatInput from "./ChatInput";
import ChatAvatar from "./ChatAvatar";
import {useChat} from "@/lib/hooks/ChatContext";

function ChatUser() {
  const {text, handleChange, handleSend} = useChat();

  return (
    <div className="w-full h-full grid grid-cols-[1fr_140px] m-[4px_8px]">
      <ChatInput text={text} onChange={handleChange} onSend={handleSend} />
      <ChatAvatar image="duck" />
    </div>
  );
}

export default ChatUser;
