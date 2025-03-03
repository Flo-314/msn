import ChatAvatar from "./ChatAvatar";
import ChatMessages from "./ChatMesagges";

function ChatContact() {
  return (
    <div className="w-full h-[92%] grid grid-cols-[1fr_140px] m-[4px_8px]">
      <ChatMessages />
      <ChatAvatar image="msn" />
    </div>
  );
}

export default ChatContact;
