"use client";
import Window from "@/lib/common/Window";
import { createClient } from "@/lib/utils/supabase/client";
import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";
const supabase = createClient();

function Chat() {
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState("");
  let ws = undefined;
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      ws = usePartySocket({
        // usePartySocket takes the same arguments as PartySocket.
        host: "localhost:1999", // or localhost:1999 in dev
        room: data.user,

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
    };

    fetchUser();
  }, []);

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
