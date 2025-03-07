"use client";

import usePartySocket from "partysocket/react";
import {partykitUrl} from "../utils/partykit/partykitUtils";
import {Message, NewContact, User, UserStatus} from "@/types/types";
import {useEffect} from "react";
import {RealtimeChannel} from "@supabase/supabase-js";
import {useContacts} from "./contactsContext";
import {createStatusChannel} from "../supabase/subscriptions";

export const useChatNotification = (
  user: User,
  notificationToast: (username: string, isMessage: boolean, message?: string) => void,
) => {
  const savedStatus = localStorage.getItem("status") as UserStatus;
  const {getContact, setContacts} = useContacts();

  const contactNotificationSocket = usePartySocket({
    host: partykitUrl,
    party: "notifications",
    room: user.id,
    id: user.id,
    query: () => {
      return {initialStatus: savedStatus ?? "connected", token: null};
    },

    async onMessage(messageEvent) {
      const message: (Message & {type: "chatMessage"}) | NewContact = JSON.parse(messageEvent.data);

      if (message.type === "newContact") {
        const newContact = message as NewContact;

        setContacts((prev) => [...prev, newContact]);

        return;
      }

      if (message.type === "chatMessage") {
        const contact = getContact(message.userId);

        notificationToast(contact.username, true, message.message);
      }
    },
  });

  const toggleChatNotification = (contactId: string, isChatOpen: boolean): void => {
    contactNotificationSocket.send(
      JSON.stringify({
        type: "chatToggle",
        opened: isChatOpen,
        contactId: contactId,
      }),
    );
  };

  return {toggleChatNotification};
};

export const useUserStatusSubscription = (
  user: User,
  notificationToast: (username: string, isMessage: boolean, message?: string) => void,
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
          notificationToast(contact.username, false);
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
  }, [contacts, setContacts, user, notificationToast, getContact]);
};
