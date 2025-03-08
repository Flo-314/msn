"use client";

import {ChatInstance, Message} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode} from "react";

const ChatsInstancesContext = createContext<
  | {
      chatInstances: ChatInstance[];
      setChatInstances: React.Dispatch<React.SetStateAction<ChatInstance[]>>;
      getChatInstance: (contactId: string) => ChatInstance | null;
      closeChatInstance: (contactId: string, messages: Message[]) => void;
      openChat: (contactId: string, userId: string) => boolean;
    }
  | undefined
>(undefined);

export const ChatsInstancesProvider = ({children}: {children: ReactNode}) => {
  const [chatInstances, setChatInstances] = useState<ChatInstance[]>([]);

  const closeChatInstance = (contactId: string, messages: Message[]): void => {
    setChatInstances((prevInstances) =>
      prevInstances.map((instance) =>
        instance.contactId === contactId ? {...instance, isOpen: false, messages} : instance,
      ),
    );
  };

  const openChat = (contactId: string, userId: string): boolean => {
    const instanceExist = chatInstances.some((cInstance) => {
      return cInstance.contactId === contactId;
    });

    //if instance doesent exist create one
    if (!instanceExist) {
      setChatInstances((chatInstances) => {
        return [
          ...chatInstances,
          {contactId: contactId, userId: userId, messages: [], isOpen: true},
        ];
      });

      return false;
    }
    const isOpen = chatInstances.some((chatInstance) => {
      return chatInstance.isOpen === true;
    });

    if (isOpen) return true;
    setChatInstances((prevInstances) =>
      prevInstances.map((instance) =>
        instance.contactId === contactId ? {...instance, isOpen: true} : instance,
      ),
    );

    return false;
  };
  const getChatInstance = (contactId: string): ChatInstance | null => {
    const chatInstance = chatInstances.find((instance) => instance.contactId === contactId);

    return chatInstance || null;
  };

  return (
    <ChatsInstancesContext.Provider
      value={{
        chatInstances,
        openChat,
        getChatInstance,
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
