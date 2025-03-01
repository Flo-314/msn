import {Message} from "@/types/types";
import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  private messages = 0; // Estado para almacenar los mensajes

  constructor(readonly room: Party.Room) {}

  onMessage(message: string, sender: Party.Connection) {
    const msg: Message = {contactId: sender.id, message, type: "chatMessage"};

    this.messages += 1;

    this.room.broadcast(
      JSON.stringify(msg),
      // ...except for the connection it came from
      [sender.id],
    );
  }
}

Server satisfies Party.Worker;
