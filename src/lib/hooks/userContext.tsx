"use client";

import {User, UserStatus} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode} from "react";
import {
  updateUserStatus as updateUserStatusRow,
  updatePersonalMessage as updatePersonalMessageRow,
} from "../supabase/models";

const UserContext = createContext<
  | {
      user: User | null;
      setUser: React.Dispatch<React.SetStateAction<User | null>>;
      updateUserStatus: (status: UserStatus) => Promise<boolean>;
      updatePersonalMessage: (personalMessage: string) => Promise<boolean>;
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

  return (
    <UserContext.Provider value={{user, setUser, updateUserStatus, updatePersonalMessage}}>
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
