"use client";

import { useUser } from "@/lib/hooks/userContext";
import Login from "./login/Login";
import Mensagger from "./mensagger/mensagger";

function MsnMensaggerApp() {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <div>
          <Mensagger user={user}></Mensagger>
        </div>
      ) : (
        <Login></Login>
      )}
    </div>
  );
}

export default MsnMensaggerApp;
