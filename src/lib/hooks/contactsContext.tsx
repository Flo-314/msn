"use client";

import {Contact} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode, useEffect} from "react";
import {useUser} from "./userContext";
import {getContacts} from "../supabase/models";

const ContactsContext = createContext<
  | {
      contacts: Contact[] | [];
      getContact: (contactId: string) => Contact;
      setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
    }
  | undefined
>(undefined);

export const ContactsProvider = ({children}: {children: ReactNode}) => {
  const {user} = useUser();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const getContact = (contactId: string) =>
    contacts.filter((contact) => contact.contactId === contactId)[0];

  // Fetch contacts when user is logged in.
  useEffect(() => {
    if (user) {
      getContacts(user.id).then((contacts) => {
        setContacts(contacts ?? []);
      });
    }
  }, [user]);

  return (
    <ContactsContext.Provider value={{contacts, setContacts, getContact}}>
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
