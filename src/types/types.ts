export type User = {
  id: string;
  email: string;
};

export type Message = {
  message: string;
  senderId: string;
  type: string | "chatMessage";
};
