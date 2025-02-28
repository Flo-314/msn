/*  
STATES: 
  openedChats: the chats that the user has open.

NOTIFICATIONS:
  Message notifications:    When a message arrives, if the contactID is not in the open chats, a notification is sent to the user.
  chatToggle notifications: When a chat is opened the contactID is pushed to the opened chats. user is not gonna receive notifications of a opened chat. 
                            when a chat is closed the openedchat is popped from it.


*/

import {createClient} from "@supabase/supabase-js";

import {UUID} from "crypto";
import type * as Party from "partykit/server";
import {Database} from "../database.types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {auth: {persistSession: false}},
);

type MessageNotification = {
  type: "chatMessage";
  contactId: UUID;
  message: string;
};

type chatToggleNotification = {
  type: "chatToggle";
  contactId: UUID;
  opened: boolean;
};

export default class Server implements Party.Server {
  private openedChats: string[] = [];

  constructor(readonly room: Party.Room) {}

  onMessage(message: string, sender: Party.Connection) {
    //this is the room owner connection. its the only receptor of data
    const roomOwnerConnection = this.room.getConnection(this.room.id);

    const parsedMsg: MessageNotification | chatToggleNotification = JSON.parse(message);

    if (parsedMsg.type === "chatMessage") {
      const isChatOppened = this.openedChats.includes(sender.id);

      if (isChatOppened) {
      } else {
        //closed chat; send notification to user of incoming msg
        roomOwnerConnection?.send(message);
      }
    } else if (parsedMsg.type === "chatToggle") {
      if (parsedMsg.opened === true) {
        this.openedChats.push(parsedMsg.contactId);
      } else {
        this.openedChats = this.openedChats.filter((senderId) => senderId !== parsedMsg.contactId);
      }
    }
  }

  onClose(connection: Party.Connection): void | Promise<void> {
    const roomOwnerConnection = this.room.getConnection(this.room.id);

    if (connection.id === roomOwnerConnection?.id) {
      supabase
        .from("user_status")
        .update({status: "offline"})
        .eq("user_id", roomOwnerConnection.id);
    }
  }
}

Server satisfies Party.Worker;
