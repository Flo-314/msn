"use client";

import {User, UserStatus} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode} from "react";
import {updateUserStatus as updateUserStatusRow} from "../supabase/models";

const UserContext = createContext<
  | {
      user: User | null;
      setUser: React.Dispatch<React.SetStateAction<User | null>>;
      updateUserStatus: (status: UserStatus) => void;
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

  return (
    <UserContext.Provider value={{user, setUser, updateUserStatus}}>
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
