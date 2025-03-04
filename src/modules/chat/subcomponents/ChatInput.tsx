import type React from "react";
import SimpleButton from "./ChatSimpleButton";
import TabButton from "./ChatTabButton";
import {useChat} from "@/lib/hooks/chatContext";

function ChatInput() {
  const {text, handleChange, handleSend} = useChat();

  return (
    <div className="grid grid-rows-[24px_1fr_24px] min-h-[122px] bg-white w-[97%] border border-[#586170] rounded-[6px]">
      <div className="bg-gradient-to-b from-[#D8E8F7] via-[#F5F2F9] to-[#D8E8F7] border-b border-b-[#586170] rounded-t-[6px] flex">
        <SimpleButton image="letter" />
        <SimpleButton image="happy" arrow />
        <SimpleButton image="voice-clip" label="Voice clip" />
        <SimpleButton image="wink" arrow />
        <SimpleButton image="mountain" arrow />
        <SimpleButton image="gift" arrow />
      </div>

      <div className="flex justify-end m-[3px]">
        <textarea
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          value={text}
          onChange={handleChange}
          className="flex-grow mr-2 p-2 border border-[#93989C] rounded-[5px]"
        />
        <div className="flex flex-col gap-[3px]">
          <button
            onClick={handleSend}
            className="border border-[#93989C] bg-[#FBFBFB] shadow-[inset_-4px_-4px_4px_#C0C9E0] w-[58px] h-[37px] rounded-[5px] font-[Tahoma] font-bold text-[11px] text-[#969C9A]"
          >
            Send
          </button>
          <button className="border border-[#93989C] bg-[#FBFBFB] shadow-[inset_-4px_-4px_4px_#C0C9E0] w-[58px] h-[25px] rounded-[5px] font-[Tahoma] font-bold text-[11px] text-[#969C9A]">
            Search
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#D8E8F7] via-[#F5F2F9] to-[#D8E8F7] border-t border-t-[#565F70] rounded-b-[6px] flex justify-end pr-[12px]">
        <TabButton image="paint" />
        <TabButton image="letter" focus />
      </div>
    </div>
  );
}

export default ChatInput;
