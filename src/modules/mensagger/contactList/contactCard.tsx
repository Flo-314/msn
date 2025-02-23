import {UUID} from "crypto";
import Image from "next/image";

function ContactCard({
  id,
  email,
  username,
  handleOpenChat,
}: {
  id: UUID | string;
  email: string;
  username: string;
  handleOpenChat: (contactId: UUID | string) => void;
}) {
  return (
    <div className="flex items-center gap-2 p-1  rounded">
      <Image src="/contactIcon.PNG" alt="Contact" width={16} height={16} />
      <div className="text-sm">
        <span className="text-gray-800">{email}</span>
        <span
          onClick={() => {
            handleOpenChat(id);
          }}
          className="text-gray-500 ml-1"
        >
          {id}
        </span>
        <span className="text-gray-500 ml-1">{username}</span>
      </div>
    </div>
  );
}

export default ContactCard;
