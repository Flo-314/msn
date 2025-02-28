import {Contact} from "@/types/types";
import {UUID} from "crypto";
import {StatusIcon} from "./StatusIcon";

type ContactCardProps = Contact & {
  handleOpenChat: (contactId: UUID | string) => void;
};

function ContactCard({contactId, email, username, handleOpenChat, status}: ContactCardProps) {
  return (
    <div className="flex items-center gap-2 p-1  rounded">
      <StatusIcon userStatus={status}></StatusIcon>
      <div className="text-sm">
        <span className="text-gray-800">{email}</span>
        <span
          onClick={() => {
            handleOpenChat(contactId);
          }}
          className="text-gray-500 ml-1"
        >
          {contactId}
        </span>
        <span className="text-gray-500 ml-1">{username}</span>
      </div>
    </div>
  );
}

export default ContactCard;
