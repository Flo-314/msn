import { UUID } from "crypto";

export type User = {
  id: UUID | string;
  email: string;
};

export type Message = {
  message: string;
  senderId: UUID |string;
  type: string | "chatMessage";
};

export type Contact = {
  contactId: UUID | string;
  email: string;
  username: string;
}

export type ChatInstance = {
  userId: string | UUID;
  contactId: string | UUID;
}