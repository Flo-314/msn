import {createClient} from "@supabase/supabase-js";

import type * as Party from "partykit/server";
import {Database} from "../database.types";
import {NewContact, NotificationMessage, UserStatus} from "@/types/types";

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
//
//  newContact: User A(lf) adds partyroomOwner as a contact.
//              User A(lf) sends a notification to the roomOwner with his user profile.
//              RoomOwner receives the notification and updates his contact list with A(LF).
//
//
//
//

export default class Server implements Party.Server {
  private openedChats: Set<string> = new Set(); // Evita duplicados
  constructor(readonly room: Party.Room) {}
  onConnect(connection: Party.Connection, ctx: Party.ConnectionContext): void | Promise<void> {
    //When a user connects to the room, update the user_status to online.
    const initialStatus =
      (new URL(ctx.request.url).searchParams.get("initialStatus") as UserStatus) ?? "online";

    if (connection.id === this.room.id) {
      // i wrap it in a timeout, just to not mess with the statusChange on disconnect. if the user refresh the browser, the call stack can be buggy.
      setTimeout(async () => {
        const {error} = await supabase
          .from("user_status")
          .update({status: initialStatus})
          .eq("user_id", connection.id);

        if (error) {
          console.error("Error updating status:", error);
        }
      }, 500);
    }
  }

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
        const isChatOppened = this.openedChats.has(parsedMsg.contactId);

        if (isChatOppened === false) {
          //Send notification to RoomOwner
          roomOwnerConnection?.send(message);
        }
        break;

      case "chatToggle":
        if (parsedMsg.opened) {
          this.openedChats.add(parsedMsg.contactId);
        } else {
          this.openedChats.delete(parsedMsg.contactId);
        }

        break;
      case "newContact":
        parsedMsg.contactId = parsedMsg.id;
        roomOwnerConnection?.send(message);
        break;

      default:
        break;
    }
  }

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      const newContact = await req.json<NewContact>();
      const roomOwnerConnection = this.room.getConnection(this.room.id);

      newContact.contactId = newContact.id;
      roomOwnerConnection?.send(JSON.stringify(newContact));

      return new Response("OK");
    } else {
      return new Response("Method not allowed", {status: 405});
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
        console.error("Error updating status:", error);
      }
    }
  }
}

Server satisfies Party.Worker;
