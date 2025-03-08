import {Contact, Message, UserStatus} from "@/types/types";
import {supabase} from "../utils/supabase/client";

export async function getProfileById(id: string) {
  const {data, error} = await supabase.from("profiles").select("*").eq("id", id).single();

  if (error) throw new Error(error.message);

  return data;
}

export async function addContact(userId: string, contactEmail: string): Promise<Contact | null> {
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
    status: contact.status as UserStatus,
    personalMessage: contact.personal_message,
  }));

  return contactData;
}

export async function insertMessage(userId: string, contactId: string, message: string) {
  const {data, error} = await supabase
    .from("messages")
    .insert([{user_id: userId, contact_id: contactId, message}]);

  if (error) {
    throw error;
  }

  return data;
}

export async function fetchUserStatus(userId: string) {
  const {data, error} = await supabase
    .from("user_status")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateUserStatus(userId: string, newStatus: UserStatus): Promise<boolean> {
  const isValidStatus = (status: UserStatus) => {
    return Object.values(UserStatus).includes(status);
  };

  if (isValidStatus(newStatus) === false) {
    throw new Error("invalid state");
  }

  const {error} = await supabase
    .from("user_status")
    .update({status: newStatus})
    .eq("user_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return true;
}

export const updatePersonalMessage = async (
  userId: string,
  personalMessage: string,
): Promise<boolean> => {
  const {error} = await supabase
    .from("user_status")
    .update({personal_message: personalMessage})
    .eq("user_id", userId);

  if (error) throw error;

  return true;
};

export const updateUsername = async (userId: string, username: string): Promise<boolean> => {
  const {error} = await supabase.from("profiles").update({username}).eq("id", userId);

  if (error) throw error;

  return true;
};

export async function getMessages(
  userId: string,
  contactId: string,
  messageLimit?: number,
  dateFilter?: string,
) {
  const {data, error} = await supabase.rpc("get_messages", {
    p_contact_id: contactId,
    p_user_id: userId,
    p_limit: messageLimit,
    p_created_at: dateFilter,
  });

  if (error) {
    return null;
  }
  const messages: Message[] = data.map(({contact_id, user_id, message, created_at}) => {
    return {contactId: contact_id, userId: user_id, message, createdAt: created_at};
  });

  return messages;
}
