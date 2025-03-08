import {Contact} from "@/types/types";
import {StatusIcon} from "./StatusIcon";
import {useChatInstances} from "@/lib/hooks/chatsContext";
import {useUser} from "@/lib/hooks/userContext";

type ContactCardProps = Contact;

function ContactCard({contactId, username, status, personalMessage}: ContactCardProps) {
  const {openChat} = useChatInstances();
  const {user} = useUser();

  return (
    <div className="flex items-center gap-2  rounded ml-4">
      <StatusIcon userStatus={status}></StatusIcon>
      <div
        className="text-xs "
        onClick={() => {
          if (!user) return;
          openChat(contactId, user.id);
        }}
      >
        <span className="text-gray-800">{username}</span>
        {personalMessage === "" || personalMessage === undefined ? null : (
          <span className="text-gray-500 italic"> - {personalMessage}</span>
        )}
      </div>
    </div>
  );
}

export default ContactCard;
