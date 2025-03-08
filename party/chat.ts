import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onMessage(message: string, sender: Party.Connection) {
    this.room.broadcast(
      message,
      // ...except for the connection it came from
      [sender.id],
    );
  }
}

Server satisfies Party.Worker;
