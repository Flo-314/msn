"use client";

import {useUser} from "@/lib/hooks/userContext";
import Login from "./login/Login";
import Mensagger from "./mensagger/mensagger";
import Chats from "./chat/Chats";
import {useChatInstances} from "@/lib/hooks/chatsContext";
import Image from "next/image";

function MsnMensaggerApp() {
  const {user} = useUser();
  const {chatInstances} = useChatInstances();

  return (
    <div>
      <button onClick={Login}></button>
      {user ? (
        <div>
          <Mensagger user={user}></Mensagger>
          <Chats chatInstances={chatInstances}></Chats>
        </div>
      ) : (
        <Login></Login>
      )}

      <footer
        className="h-8 min-w-full absolute bottom-0 right-0 left-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(#1F2F86 0px, #3165C4 4%, #3682E5 8%, #2B71E0 15%, #2663DA 20%, #2157D6 38%, #245BDC 54%, #2562DF 86%, #2158D4 92%, #1D4EC0 97%, #1941A5 100%)",
        }}
      >
        <Image
          src="/png/footer/windowsXpStartButton.png"
          width={106}
          height={34}
          alt="windowsxp start button"
        ></Image>
      </footer>
    </div>
  );
}

export default MsnMensaggerApp;
