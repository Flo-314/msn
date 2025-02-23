export const getChatRoomId = (userId1: string, userId2: string): string => {
  const [id1, id2] = [userId1, userId2].sort();

  return `${id1}-${id2}`;
};
