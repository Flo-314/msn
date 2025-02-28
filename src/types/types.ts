import {UUID} from "crypto";

export type User = {
  id: UUID | string;
  email: string;
  state?: UserStatus;
};

export type Message = {
  message: string;
  senderId: UUID | string;
  type?: "chatMessage";
};

export type Contact = {
  contactId: UUID | string;
  email: string;
  username: string;
  status?: UserStatus;
};

export type ChatInstance = {
  userId: string | UUID;
  contactId: string | UUID;
};

export enum UserStatus {
  Online = "online",
  Offline = "offline",
  Away = "away",
  Busy = "busy",
}
