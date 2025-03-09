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

  const {error} = await supabase.auth.signInWithPassword(signData);

  if (error) {
    return error;
  }

  return true;
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
    return error;
  }

  return true;
}
