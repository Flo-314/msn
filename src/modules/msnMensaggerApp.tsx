"use client";

import { useUser } from "@/lib/hooks/userContext";
import Login from "./login/Login";
import Mensagger from "./mensagger/mensagger";
import Chats from "./chat/Chats";

function MsnMensaggerApp() {
                                                                    const { user } = useUser();

  return (
    <div>
      {user ? (
        <div>
          <Mensagger user={user}></Mensagger>
          <Chats></Chats>
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default MsnMensaggerApp;
