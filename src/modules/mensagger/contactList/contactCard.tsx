import {Contact} from "@/types/types";
import {StatusIcon} from "./StatusIcon";

type ContactCardProps = Contact & {
  handleOpenChat: (contactId: string) => void;
};

function ContactCard({
  contactId,
  username,
  handleOpenChat,
  status,
  personalMessage,
}: ContactCardProps) {
  console.log(personalMessage);

  return (
    <div className="flex items-center gap-2  rounded ml-4">
      <StatusIcon userStatus={status}></StatusIcon>
      <div
        className="text-xs "
        onClick={() => {
          handleOpenChat(contactId);
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
