import { UUID } from "crypto";

export type User = {
  id: string;
  email: string;
};

export type Message = {
  message: string;
  senderId: string;
  type: string | "chatMessage";
};

export type Contact = {
  contactId: UUID;
  email: string;
  username: string;
}

