import {UUID} from "crypto";
import {Contact} from "@/types/types";
import {supabase} from "../utils/supabase/client";

export async function getProfileById(id: UUID | string) {
  const {data, error} = await supabase.from("profiles").select("*").eq("id", id).single();

  if (error) throw new Error(error.message);

  return data;
}

export async function addContact(
  userId: UUID | string,
  contactEmail: string,
): Promise<Contact | null> {
  const {data: contactProfiles, error: contactError} = await supabase
    .from("profiles")
    .select("id, email, username")
    .eq("email", contactEmail)
    .single();

  if (contactError || !contactProfiles) {
    return null;
  }

  const contactId = contactProfiles.id;

  const {error} = await supabase.from("contacts").insert({
    user_id: userId,
    contact_id: contactId,
    status: "pending", // Puede ser 'pending', 'accepted', etc.
  });

  if (error) {
    return null;
  } else {
    const {id: contactId, ...rest} = contactProfiles;

    return {contactId, ...rest} as Contact;
  }
}

export async function getContacts(userId: string) {
  const {data, error} = await supabase.rpc("get_contacts", {
    user_uuid: userId,
  });

  if (error) {
    return null;
  }

  const contactData: Contact[] = data.map((contact) => ({
    contactId: contact.contact_id,
    email: contact.email,
    username: contact.username,
  }));

  return contactData;
}

export async function insertMessage(
  userId: UUID | string,
  contactId: UUID | string,
  message: string,
) {
  const {data, error} = await supabase
    .from("messages")
    .insert([{user_id: userId, contact_id: contactId, message}]);

  if (error) {
  }

  return data;
}
