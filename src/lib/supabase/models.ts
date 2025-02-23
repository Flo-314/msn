"use server";

import { UUID } from "crypto";
import { createServerClient } from "../utils/supabase/server";

export async function getProfileById(id: string) {
  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
export async function addContact(userId: string, contactEmail: string) {
  const supabase = await createServerClient();
  console.log(userId, contactEmail);
  const { data: contactProfiles, error: contactError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", contactEmail)
    .single();
  if (contactError || !contactProfiles) {
    console.error(new Error("Contacto no encontrado."));
  }

  const contactId = contactProfiles?.id;

  const { data, error } = await supabase.from("contacts").insert([
    {
      user_id: userId,
      contact_id: contactId,
      status: "pending", // Puede ser 'pending', 'accepted', etc.
    },
  ]);
  if (error) {
    console.log(error);
  }

  return data;
}
export async function getContacts(userId: string) {
  const supabase = await createServerClient();
  console.log(userId);
  const { data, error } = await supabase.rpc("get_contacts", {
    user_uuid: userId,
  });

  console.log(data, userId);
  if (error) {
    console.error(error);
    return null;
  }

  const contactData = data.map((contact) => {
    const { profiles, ...rest } = contact;
    return { ...profiles, ...rest };
  });

  return contactData;
}

export async function insertMessage(
  userId: UUID,
  contactId: UUID,
  message: string
) {
  const supabase = await createServerClient();
  const { data, error } = await supabase
    .from("messages")
    .insert([{ user_id: userId, contact_id: contactId, message }]);

  if (error) {
    console.log(error);
  }

  return data;
}
