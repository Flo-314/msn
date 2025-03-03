import ChatInput from "./ChatInput";
import ChatAvatar from "./ChatAvatar";

function ChatUser() {
  return (
    <div className="w-full h-full grid grid-cols-[1fr_140px] m-[4px_8px]">
      <ChatInput />
      <ChatAvatar image="duck" />
    </div>
  );
}

export default ChatUser;
