import {useEffect, useState} from "react";
import {Contact, UserStatus} from "@/types/types";
import ContactCard from "./contactCard";
import ContactGroupSeparator from "./GroupListSeparator";
import {useContacts} from "@/lib/hooks/contactsContext";

function ContactList({handleOpenChat}: {handleOpenChat: (contactId: string) => void}) {
  const {contacts} = useContacts();

  const [collapsedGroups, setCollapsedGroups] = useState<Record<UserStatus, boolean>>({
    online: false,
    away: false,
    busy: false,
    offline: false,
  });

  const toggleGroup = (status: UserStatus) => {
    setCollapsedGroups((prev) => ({...prev, [status]: !prev[status]}));
  };

  const [groupedContacts, setGroupedContacts] = useState<Record<UserStatus, Contact[]>>({
    online: [],
    away: [],
    busy: [],
    offline: [],
  });

  useEffect(() => {
    const newGroupedContacts: Record<UserStatus, Contact[]> = {
      online: contacts.filter((c) => c.status === UserStatus.Online),
      away: contacts.filter((c) => c.status === UserStatus.Away),
      busy: contacts.filter((c) => c.status === UserStatus.Busy),
      offline: contacts.filter((c) => c.status === UserStatus.Offline),
    };

    setGroupedContacts(newGroupedContacts);
  }, [contacts]);

  return (
    <div className="overflow-y-auto h-60 bg-white flex flex-col p-1">
      {Object.entries(groupedContacts).map(
        ([status, users]) =>
          users.length > 0 && (
            <div key={status} className="mb-2">
              <ContactGroupSeparator
                contactStatus={status as UserStatus}
                isCollapsed={collapsedGroups[status as UserStatus]}
                toggleGroup={toggleGroup}
                count={users.length}
              />
              {!collapsedGroups[status as UserStatus] && (
                <div className="flex flex-col gap-1 pl-4">
                  {users.map((contact) => (
                    <ContactCard
                      key={contact.contactId}
                      username={contact.username}
                      email={contact.email}
                      contactId={contact.contactId}
                      handleOpenChat={handleOpenChat}
                      status={contact.status}
                      personalMessage={contact.personalMessage}
                    />
                  ))}
                </div>
              )}
            </div>
          ),
      )}
    </div>
  );
}

export default ContactList;
