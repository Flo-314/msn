"use client";

import ChatHeaderToolbar from "./ChatHeaderToolbar";
import ChatContact from "./ChatContact";
import ChatUser from "./ChatUser";
import {useChat} from "@/lib/hooks/ChatContext";
import Window from "@/lib/common/Window";

function ChatWindow() {
  const {closeChatInstance} = useChat();

  return (
    <Window onClose={closeChatInstance}>
      <div
        className="w-[475px] h-[400px] grid grid-rows-[60px_1fr_140px_24px] rounded-[6px] overflow-hidden shadow-[2px_2px_5px_#0009,_5px_5px_10px_#000c] relative"
        style={{
          background: "#D7E4F5 url(ui/main-background.png) bottom 20px right no-repeat",
        }}
      >
        <ChatHeaderToolbar />
        <ChatContact />
        <ChatUser />

        <div
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none"
          style={{
            backgroundImage: `
            url(ui/main-corner-left.png),
            url(ui/main-corner-right.png),
            url(ui/main-left.png),
            url(ui/main-right.png),
            url(ui/main-bottom.png)
          `,
            backgroundRepeat: "no-repeat, no-repeat, repeat-y, repeat-y, repeat-x",
            backgroundPosition: "bottom left, bottom -1px right, bottom left, bottom right, bottom",
            clipPath: "polygon(0 14.5%, 100% 5%, 100% 100%, 0 100%)",
          }}
        ></div>
      </div>
    </Window>
  );
}

export default ChatWindow;
