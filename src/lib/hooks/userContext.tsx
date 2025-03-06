"use client";

import {User, UserStatus} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode} from "react";
import {
  updateUserStatus as updateUserStatusRow,
  updatePersonalMessage as updatePersonalMessageRow,
  updateUsername as updateUsernameRow,
} from "../supabase/models";

const UserContext = createContext<
  | {
      user: User | null;
      setUser: React.Dispatch<React.SetStateAction<User | null>>;
      updateUserStatus: (status: UserStatus) => Promise<boolean>;
      updatePersonalMessage: (personalMessage: string) => Promise<boolean>;
      updateUsername: (username: string) => Promise<boolean>;
    }
  | undefined
>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUserStatus = async (status: UserStatus): Promise<boolean> => {
    if (!user) return false;
    const userStatusUpdate = await updateUserStatusRow(user?.id, status);

    if (!userStatusUpdate) return false;
    setUser({...user, status: status});

    return true;
  };
  const updatePersonalMessage = async (personalMessage: string): Promise<boolean> => {
    if (!user) return false;
    const personalMessageUpdate = updatePersonalMessageRow(user?.id, personalMessage);

    if (!personalMessageUpdate) return false;
    setUser({...user, personalMessage: personalMessage});

    return true;
  };
  const updateUsername = async (username: string): Promise<boolean> => {
    if (!user) return false;
    const usernameUpdate = await updateUsernameRow(user?.id, username);

    if (!usernameUpdate) return false;

    setUser({...user, username: username});

    return true;
  };

  return (
    <UserContext.Provider
      value={{user, setUser, updateUserStatus, updatePersonalMessage, updateUsername}}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }

  return context;
};
