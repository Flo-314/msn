"use client";
import Window from "@/lib/common/Window";
import usePartySocket from "partysocket/react";
import { useState } from "react";

function Chat() {
  const [text, setText] = useState("");

  const ws = usePartySocket({
    // usePartySocket takes the same arguments as PartySocket.
    host: "localhost:1999", // or localhost:1999 in dev
    room: "my-room",

    // in addition, you can provide socket lifecycle event handlers
    // (equivalent to using ws.addEventListener in an effect hook)
    onOpen() {
      console.log("openeado");
    },
    onMessage(e) {
      console.log("message", e.data);
    },
    onClose() {
      console.log("closed");
    },
    onError() {
      console.log("error");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  return (
    <div>
      <Window>
        <textarea value={text} onChange={handleChange} />
        <button
          onClick={() => {
            ws.send(text);
          }}
        >
          enviar
        </button>
      </Window>
    </div>
  );
}

export default Chat;
