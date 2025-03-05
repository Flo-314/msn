export type User = {
  id: string;
  email: string;
  state?: UserStatus;
  username: string;
};

export type Contact = {
  contactId: string;
  email: string;
  username: string;
  status?: UserStatus;
  avatar?: string | null;
  created_at?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  updated_at?: string | null;
};

export type ChatInstance = {
  userId: string;
  contactId: string;
};

export enum UserStatus {
  Online = "online",
  Offline = "offline",
  Away = "away",
  Busy = "busy",
}

export type Message = {
  type: "chatMessage";
  contactId: string;
  message: string;
};

export type ChatToggle = {
  type: "chatToggle";
  contactId: string;
  opened: boolean;
};

export type NotificationMessage = Message | ChatToggle;
