"use client";

import {useUser} from "@/lib/hooks/userContext";
import Login from "./login/Login";
import Mensagger from "./mensagger/mensagger";
import Chats from "./chat/Chats";
import {useChatInstances} from "@/lib/hooks/chatsContext";

function MsnMensaggerApp() {
  const {user} = useUser();
  const {chatInstances} = useChatInstances();

  return (
    <div>
      {user ? (
        <div>
          <Mensagger user={user}></Mensagger>
          <Chats chatInstances={chatInstances}></Chats>
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default MsnMensaggerApp;
