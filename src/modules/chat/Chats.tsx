import {ChatInstance} from "@/types/types";
import Chat from "./Chat";

function Chats({chatInstances}: {chatInstances: ChatInstance[]}) {
  return (
    <div>
      {chatInstances.map(({contactId, userId}) => {
        return <Chat key={contactId + userId} contactId={contactId} userId={userId}></Chat>;
      })}
    </div>
  );
}

export default Chats;
