"use client";
import Window from "@/lib/common/Window";
import { createClient } from "@/lib/utils/supabase/client";
import usePartySocket from "partysocket/react";
import { useEffect, useState } from "react";
const supabase = createClient();
const getChatRoomId = (userId1: string, userId2: string): string => {
  const [id1, id2] = [userId1, userId2].sort();

  return `${id1}-${id2}`;
};

function Chat() {
  const [user, setUser] = useState<any>(null);
  const [text, setText] = useState("");
  const [mesagges, setMesagges] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchUser();
  }, []);

  const ws = usePartySocket({
    // usePartySocket takes the same arguments as PartySocket.
    host: "localhost:1999", // or localhost:1999 in dev
    room: "asd",
    // in addition, you can provide socket lifecycle event handlers
    // (equivalent to using ws.addEventListener in an effect hook)
    onOpen() {
      console.log("openeado");
    },
    onMessage(e) {},
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
        {mesagges.map((mesagge, i) => (
          <div key={i}>{mesagge}</div>
        ))}
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
