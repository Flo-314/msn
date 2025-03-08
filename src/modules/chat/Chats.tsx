import {ChatInstance} from "@/types/types";
import Chat from "./Chat";

function Chats({chatInstances}: {chatInstances: ChatInstance[]}) {
  return (
    <div>
      {chatInstances.map(({contactId, userId, isOpen}) =>
        isOpen ? <Chat key={contactId + userId} contactId={contactId} userId={userId} /> : null,
      )}
    </div>
  );
}

export default Chats;
