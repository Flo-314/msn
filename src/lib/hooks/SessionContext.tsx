"use client";

import React, {createContext, useState, useContext, ReactNode, useEffect, useRef} from "react";

import {Session} from "@supabase/supabase-js";
import {supabase} from "../utils/supabase/client";
import {useUser} from "./userContext";
import {fetchUserStatus, getProfileById} from "../supabase/models";
import {UserStatus} from "@/types/types";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const SessionProvider = ({children}: {children: ReactNode}) => {
  const [session, setSession] = useState<Session | null>(null);
  const {user, setUser} = useUser();
  // Just to manage when a user dont want to log in automatically
  const firstLoad = useRef<boolean>(false);

  useEffect(() => {
    if (firstLoad.current === false) {
      const isAutoLogin: string | null = localStorage.getItem("isAutoLogin");

      if (isAutoLogin !== "true") {
        localStorage.removeItem("sb-akghrlumeubtskrxwkll-auth-token");
      }
      firstLoad.current = true;
    }

    const handleAuthStateChange = async (_: string, newSession: Session | null) => {
      if (session || user) return;
      setSession(newSession);
      const sessionUser = newSession?.user;

      if (sessionUser?.id && sessionUser?.email && !user) {
        const baseStatus = window.localStorage.getItem("status") as UserStatus | undefined;

        const userStatus = await fetchUserStatus(sessionUser.id);

        const profile = await getProfileById(sessionUser.id);

        setUser({
          id: sessionUser.id,
          email: sessionUser.email ?? "",
          username: profile.username ?? "",
          status: baseStatus ?? UserStatus.Offline,
          personalMessage: userStatus.personal_message ?? "",
        });
      }
    };

    const authStateListener = supabase.auth.onAuthStateChange((_, newSession) => {
      handleAuthStateChange(_, newSession);
    });

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [user, session, setUser]);

  return <SessionContext.Provider value={{session}}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};
