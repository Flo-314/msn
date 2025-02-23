import {Contact} from "@/types/types";
import ContactCard from "./contactCard";
import {UUID} from "crypto";

function ContactList({
  contacts,
  handleOpenChat,
}: {
  contacts: Contact[];
  handleOpenChat: (contactId: UUID | string) => void;
}) {
  return (
    <div className="overflow-y-scroll max-h-96 bg-white">
      {contacts.map((contact, index) => (
        <ContactCard
          key={index}
          username={contact.username}
          email={contact.email}
          id={contact.contactId}
          handleOpenChat={handleOpenChat}
        ></ContactCard>
      ))}
    </div>
  );
}

export default ContactList;
