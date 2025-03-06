"use client";

import {Contact, UserStatus} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode, useEffect, useRef} from "react";
import {useUser} from "./userContext";
import {getContacts, getProfileById, fetchUserStatus} from "../supabase/models";
import {addContact as addContactToSupabase} from "@/lib/supabase/models";

const ContactsContext = createContext<
  | {
      contacts: Contact[] | [];
      getContact: (contactId: string) => Contact;
      setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
      addContact: (contactId: string) => Promise<boolean>;
      syncNewContact: (contactId: string) => Promise<Contact | false>;
    }
  | undefined
>(undefined);

export const ContactsProvider = ({children}: {children: ReactNode}) => {
  const userLoaded = useRef(false);

  const {user} = useUser();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContact = (contactId: string) =>
    contacts.filter((contact) => contact.contactId === contactId)[0];
  const syncNewContact = async (contactId: string): Promise<Contact | false> => {
    const contact = await getProfileById(contactId);

    if (!contact) return false;

    const contactStatus = await fetchUserStatus(contactId);

    if (!contactStatus) return false;

    const newContact = {
      contactId: contactId,
      email: contact.email ?? "",
      username: contact.username,
      status: contactStatus.status as UserStatus,
    } as Contact;

    setContacts([...contacts, newContact]);

    return newContact;
  };

  const addContact = async (contactEmail: string) => {
    if (!user) return false;

    const newContact = await addContactToSupabase(user?.id, contactEmail);

    if (newContact) {
      const contactStatus = await fetchUserStatus(newContact.contactId);

      newContact.status = contactStatus.status as UserStatus;
      await setContacts([...contacts, newContact]);

      return true;
    }

    return false;
  };

  // Fetch contacts when user is logged in.
  useEffect(() => {
    if (user && !userLoaded.current) {
      getContacts(user.id).then((contacts) => {
        setContacts(contacts ?? []);
        userLoaded.current = true;
      });
    }
  }, [user]);

  return (
    <ContactsContext.Provider
      value={{addContact, syncNewContact, contacts, setContacts, getContact}}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error("useContacts debe ser usado dentro de un ContactsProvider");
  }

  return context;
};
