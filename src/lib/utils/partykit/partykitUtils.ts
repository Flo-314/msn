import {NewContact, User} from "@/types/types";
import PartySocket from "partysocket";

export const getChatRoomId = (userId1: string, userId2: string): string => {
  const [id1, id2] = [userId1, userId2].sort();

  return `${id1}-${id2}`;
};

export const partykitUrl = process.env.NEXT_PUBLIC_IS_DEV
  ? "localhost:1999"
  : process.env.NEXT_PUBLIC_PARTYKIT_URL || "localhost:1999";

// This function is used to notify to a contact, in the partykit server, has been added by the user.
export const triggerContactAddedNotification = (contactId: string, user: User) => {
  const newContactNotification: NewContact = {
    ...user,
    contactId: user.id,
    type: "newContact",
  };

  PartySocket.fetch(
    {host: partykitUrl, party: "notifications", room: contactId},
    {
      method: "POST",
      body: JSON.stringify(newContactNotification),
    },
  );
};
