"use client";

import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";

import {Session} from "@supabase/supabase-js";
import {supabase} from "../utils/supabase/client";
import {useUser} from "./userContext";
import {getProfileById} from "../supabase/models";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [session, setSession] = useState<Session | null>(null);
  /*   const [_, setIsLoading] = useState(true);
   */ const {setUser} = useUser();

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(async (_, session) => {
      setSession(session);
      /*       setIsLoading(false);
       */ const user = session?.user;

      if (user?.id && user?.email) {
        getProfileById(user.id).then((profile) => {
          setUser({id: user.id, email: user.email ?? "", username: profile.username});
        });
      }
    });

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [setUser]);

  return <SessionContext.Provider value={{session}}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
