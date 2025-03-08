"use client";

import type React from "react";
import {createContext, useContext, useEffect, useRef, useState} from "react";

import {Contact, Message} from "@/types/types";
import {useChatInstances} from "@/lib/hooks/chatsContext";
import {useContacts} from "@/lib/hooks/contactsContext";
import usePartySocket from "partysocket/react";
import {getChatRoomId, partykitUrl} from "@/lib/utils/partykit/partykitUtils";
import {getMessages, insertMessage} from "@/lib/supabase/models";
import {useUser} from "./userContext";
import {format} from "date-fns";

interface ChatContextType {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  messages: Message[];
  contact: Contact;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSend: () => void;
  closeChatInstance: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  userId,
  contactId,
}: {
  children: React.ReactNode;
  userId: string;
  contactId: string;
}) {
  const {getContact} = useContacts();
  const contact = getContact(contactId);

  const {closeChatInstance, getChatInstance} = useChatInstances();
  const chatInstance = getChatInstance(contact.contactId);
  const initialLoad = useRef<boolean>(false);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const {user} = useUser();

  const chatPartySocket = usePartySocket({
    host: partykitUrl,
    party: "chat",
    room: getChatRoomId(userId, contactId),
    id: userId,
    onMessage(messageEvent) {
      if (!user) return;
      const message: Message = JSON.parse(messageEvent.data);

      setMessages((prev) => [...prev, message]);
    },
  });

  const contactNotificationSocket = usePartySocket({
    host: partykitUrl,
    party: "notifications",
    room: contactId,
    id: userId,
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    if (!user) return;
    const newMessage: Message = {
      userId: user.id,
      contactId: contactId,
      message: text,
      createdAt: format(new Date(), "MM-dd"),
    };

    chatPartySocket.send(JSON.stringify(newMessage));
    contactNotificationSocket.send(JSON.stringify({...newMessage, type: "chatMessage"}));

    insertMessage(userId, contactId, text);

    setMessages((prev) => [...prev, newMessage]);
    setText("");
  };

  useEffect(() => {
    if (!user?.id || !contact.contactId || !chatInstance) return;

    if (initialLoad.current === false) {
      initialLoad.current = true;

      const loadChatHistory = async () => {
        const instanceMessages = chatInstance?.messages;

        let loadedMessages: Message[];

        if (instanceMessages?.length === 0) {
          loadedMessages = (await getMessages(contact.contactId, user.id, 50)) ?? [];
        } else {
          loadedMessages = instanceMessages;
        }

        setMessages(loadedMessages);
      };

      loadChatHistory();
    }
  }, [contact.contactId, user?.id, chatInstance]);

  return (
    <ChatContext.Provider
      value={{
        text,
        setText,
        handleChange,
        handleSend,

        messages,
        contact,

        closeChatInstance: () => closeChatInstance(contactId, messages),
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }

  return context;
}
