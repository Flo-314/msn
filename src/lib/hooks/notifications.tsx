"use client";

import usePartySocket from "partysocket/react";
import {partykitUrl} from "../utils/partykit/partykitUtils";
import {Message, User, UserStatus} from "@/types/types";
import {useEffect} from "react";
import {RealtimeChannel} from "@supabase/supabase-js";
import {useContacts} from "./contactsContext";
import {createStatusChannel} from "../supabase/subscriptions";

export const useChatNotification = (user: User) => {
  const savedStatus = localStorage.getItem("status") as UserStatus;

  const contactNotificationSocket = usePartySocket({
    host: partykitUrl,
    party: "notifications",
    room: user.id,
    id: user.id,
    query: () => {
      return {initialStatus: savedStatus ?? "connected", token: null};
    },

    onMessage(messageEvent) {
      const message: Message = JSON.parse(messageEvent.data);
      const notificationSound = new Audio("/sounds/incomingMessage.mp3");

      if (message.type === message.type) {
        notificationSound.play();
      }
    },
  });

  const toggleChat = (contactId: string, isChatOpen: boolean): void => {
    contactNotificationSocket.send(
      JSON.stringify({
        type: "chatToggle",
        opened: !isChatOpen,
        contactId: contactId,
      }),
    );
  };

  return {toggleChat};
};

export const useUserStatusSubscription = (
  user: User,
  showContactOnlineToast: (username: string) => void,
) => {
  const {contacts, setContacts, getContact} = useContacts();

  useEffect(() => {
    if (!user || contacts.length === 0) return;

    let statusChannel: RealtimeChannel | null = null;

    const subscribeToChannel = async () => {
      const contactsIds = contacts.map((contact) => contact.contactId);
      const filter = `user_id=in.(${contactsIds.join(",")})`;

      // subscribe to the user_status channel
      statusChannel = createStatusChannel(filter, (payload) => {
        const {status, user_id} = payload.new as {status: UserStatus; user_id: string};
        const contact = getContact(user_id);

        if (contact.status !== UserStatus.Online && status === UserStatus.Online) {
          showContactOnlineToast(contact.username);
        }

        // update the updated contact with the new status
        setContacts((prevContacts) => {
          const updatedContacts = prevContacts.map((contact) => {
            if (contact.contactId === user_id) {
              return {...contact, status};
            }

            return contact;
          });

          return updatedContacts;
        });
      }).subscribe();
    };

    subscribeToChannel();

    return () => {
      statusChannel?.unsubscribe();
    };
  }, [contacts, setContacts, user]);
};
