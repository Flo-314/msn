"use client";

import {UUID} from "crypto";
import {getContacts} from "./models";
import {supabase} from "../utils/supabase/client";

export async function subsTest(id: string | UUID) {
  const contacts = await getContacts(id);

  if (contacts) {
    const contactsIds = contacts.map((contact) => contact.contactId);
    const filter = `id=in.(${contactsIds.join(",")})`;

    return supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_status",
          filter: filter,
        },
        (payload) => console.log(payload),
      )
      .subscribe();
  } else {
    return null;
  }
}
