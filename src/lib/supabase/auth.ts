"use client";

import {supabase} from "@/lib/utils/supabase/client";

export async function signIn(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const signData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    persistSession: formData.get("auto-login") === "on",
  };

  //if (signData.persistSession === true) {
  await supabase.auth.signInWithPassword(signData);
  /*   } else {
    const supabaseWithNoPersistSession = createNoPersistentClient();

    return await supabaseWithNoPersistSession.auth.signInWithPassword(signData);
  }
} */
}

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const {error} = await supabase.auth.signUp(data);

  if (error) {
  }
}
