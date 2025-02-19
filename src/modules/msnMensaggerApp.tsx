"use client";

import { useUser } from "@/lib/hooks/userContext";
import Login from "./login/Login";
import Chat from "./chat/chat";
import Mensagger from "./mensagger/mensagger";

function MsnMensaggerApp() {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <div>
          <Chat></Chat>
          <Mensagger></Mensagger>
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default MsnMensaggerApp;
