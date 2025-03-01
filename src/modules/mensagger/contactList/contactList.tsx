import {Contact} from "@/types/types";
import ContactCard from "./contactCard";

function ContactList({
  contacts,
  handleOpenChat,
}: {
  contacts: Contact[];
  handleOpenChat: (contactId: string) => void;
}) {
  return (
    <div className="overflow-y-scroll max-h-96 bg-white">
      {contacts.map((contact, index) => (
        <ContactCard
          key={index}
          username={contact.username}
          email={contact.email}
          contactId={contact.contactId}
          handleOpenChat={handleOpenChat}
          status={contact.status}
        ></ContactCard>
      ))}
    </div>
  );
}

export default ContactList;
