"use client";

import {Contact} from "@/types/types";
import React, {createContext, useState, useContext, ReactNode} from "react";

const ContactsContext = createContext<
  | {
      contacts: Contact[] | null;
      setContacts: React.Dispatch<React.SetStateAction<Contact[] | null>>;
    }
  | undefined
>(undefined);

export const ContactsProvider = ({children}: {children: ReactNode}) => {
  const [contacts, setContacts] = useState<Contact[] | null>(null);

  return (
    <ContactsContext.Provider value={{contacts, setContacts}}>{children}</ContactsContext.Provider>
  );
};

export const useContacts = () => {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error("useContacts debe ser usado dentro de un ContactsProvider");
  }

  return context;
};
