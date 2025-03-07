"use client";

import {ChatInstance} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode} from "react";

const ChatsInstancesContext = createContext<
  | {
      chatInstances: ChatInstance[];
      setChatInstances: React.Dispatch<React.SetStateAction<ChatInstance[]>>;
      closeChatInstance: (contactId: string) => void;
    }
  | undefined
>(undefined);

export const ChatsInstancesProvider = ({children}: {children: ReactNode}) => {
  const [chatsInstances, setChatInstances] = useState<ChatInstance[]>([]);

  const closeChatInstance = (contactId: string): void => {
    setChatInstances((prev) => prev.filter((chat) => chat.contactId !== contactId));
  };

  return (
    <ChatsInstancesContext.Provider
      value={{
        chatInstances: chatsInstances,
        setChatInstances: setChatInstances,
        closeChatInstance: closeChatInstance,
      }}
    >
      {children}
    </ChatsInstancesContext.Provider>
  );
};

export const useChatInstances = () => {
  const context = useContext(ChatsInstancesContext);

  if (!context) {
    throw new Error("useChats debe ser usado dentro de un chatsContext provider");
  }

  return context;
};
