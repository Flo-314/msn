export const getChatRoomId = (userId1: string, userId2: string): string => {
  const [id1, id2] = [userId1, userId2].sort();

  return `${id1}-${id2}`;
};

export const partykitUrl = process.env.NEXT_IS_DEV
  ? partykitUrl,
  : process.env.NEXT_PUBLIC_PARTYKIT_URL;
