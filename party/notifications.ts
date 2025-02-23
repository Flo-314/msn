/*  
STATES: 
  openedChats: the chats that the user has open.

NOTIFICATIONS:
  Message notifications:    When a message arrives, if the contactID is not in the open chats, a notification is sent to the user.
  chatToggle notifications: When a chat is opened the contactID is pushed to the opened chats. user is not gonna receive notifications of a opened chat. 
                            when a chat is closed the openedchat is popped from it.


*/

import { UUID } from "crypto";
import type * as Party from "partykit/server";
type MessageNotification = {
  type: "new_message";
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
    let connection = this.room.getConnection(this.room.id);
    connection?.send(
      "CCCCCCCCCCCCAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );
    console.log("connection", connection, this.room.id);

    const parsedMsg: MessageNotification | chatToggleNotification =
      JSON.parse(message);
    if (parsedMsg.type === "new_message") {
      let connection = this.room.getConnection(this.room.name);

      console.log("connection");
    } else if (parsedMsg.type === "chatToggle") {
      if (parsedMsg.opened === true) {
        this.openedChats.push(sender.id);
      } else {
        this.openedChats = this.openedChats.filter(
          (senderId) => senderId !== sender.id
        );
      }
    }
  }
}

Server satisfies Party.Worker;
