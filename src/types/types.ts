export type User = {
  id: string;
  email: string;
  status: UserStatus;
  username: string;
  personalMessage: string;
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
  personalMessage?: string | null;
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

export enum statusIcons {
  Online = "/icons/contact/connectedContactIcon.png",
  Away = "/icons/contact/awayContactIcon.png",
  Offline = "/icons/contact/offlineContactIcon.png",
  Busy = "/icons/contact/busyContactIcon.png",
}

export const STATUS_ICONS: Record<UserStatus, string> = {
  [UserStatus.Online]: "/icons/contact/connectedContactIcon.png",
  [UserStatus.Away]: "/icons/contact/awayContactIcon.png",
  [UserStatus.Offline]: "/icons/contact/offlineContactIcon.png",
  [UserStatus.Busy]: "/icons/contact/busyContactIcon.png",
};

export const STATUS_OPTIONS = [
  {label: "Online", status: UserStatus.Online},
  {label: "Busy", status: UserStatus.Busy},
  {label: "Away", status: UserStatus.Away},
  {label: "Appear Offline", status: UserStatus.Offline},
] as const;

export const STATUS_DESCRIPTIONS: Record<UserStatus, string> = {
  [UserStatus.Online]: "Online",
  [UserStatus.Busy]: "Busy",
  [UserStatus.Away]: "Away",
  [UserStatus.Offline]: "Appear Offline",
};
