import {Contact} from "@/types/types";
import {StatusIcon} from "./StatusIcon";

type ContactCardProps = Contact & {
  handleOpenChat: (contactId: string) => void;
};

function ContactCard({contactId, username, handleOpenChat, status}: ContactCardProps) {
  return (
    <div className="flex items-center gap-2  rounded ml-4">
      <StatusIcon userStatus={status}></StatusIcon>
      <div className="text-xs">
        <span
          onClick={() => {
            handleOpenChat(contactId);
          }}
          className="text-gray-800"
        >
          {username}
        </span>
      </div>
    </div>
  );
}

export default ContactCard;
