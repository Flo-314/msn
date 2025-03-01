import {createClient} from "@supabase/supabase-js";

import type * as Party from "partykit/server";
import {Database} from "../database.types";
import {NotificationMessage} from "@/types/types";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.supabase_private_key as string,
  {auth: {persistSession: false}},
);

//Two types of users gonna connect this Instance:
//
//  *The Room owner, the only one that receives chat msg notifications.
//
//  *The contacts of the room owner. They connect to the room owner Room
//    to let know the room owner if a msg is sended to him
//
//
//states:
//  openedChats: When a room owner opens a chat, its ID is saved in the state.
//
//notifications
//
//   MessageNotification: sended by contacts when they send a MSG to the room Owner.
//                        if the contactId is in openedChats, nothing happen. ELSE
//                        sends a notification to the roomOwner.
//
//  chatToggle: sended by roomOwner when they open a chat.

export default class Server implements Party.Server {
  private openedChats: Set<string> = new Set(); // Evita duplicados

  constructor(readonly room: Party.Room) {}

  onMessage(message: string) {
    const roomOwnerConnection = this.room.getConnection(this.room.id);

    let parsedMsg: NotificationMessage;

    try {
      parsedMsg = JSON.parse(message);
    } catch {
      return;
    }

    switch (parsedMsg.type) {
      case "chatMessage":
        console.log(this.openedChats, parsedMsg.contactId);

        const isChatOppened = this.openedChats.has(parsedMsg.contactId);

        console.log(isChatOppened);

        if (isChatOppened === false) {
          //Send notification to RoomOwner
          roomOwnerConnection?.send(message);
        }
        break;

      case "chatToggle":
        console.log(this.openedChats);

        if (parsedMsg.opened) {
          this.openedChats.add(parsedMsg.contactId);
        } else {
          this.openedChats.delete(parsedMsg.contactId);
        }
        console.log(this.openedChats);

        break;
      default:
        break;
    }
  }

  async onClose(connection: Party.Connection): Promise<void> {
    //If the room owner disconnect, change the user_status to offline.
    if (connection.id === this.room?.id) {
      this.openedChats.clear();
      const {error} = await supabase
        .from("user_status")
        .update({status: "offline"})
        .eq("user_id", connection.id);

      if (error) {
        console.error("Error updating status:", error); // Evita romper el Worker
      }
    }
  }
}

Server satisfies Party.Worker;
