"use server";

import { createClient } from "@/lib/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  data.email = "assd@gmail.com";
  data.password = "abcdefg123";
  const { error } = await supabase.auth.signInWithPassword(data);
  console.log(data, error);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  data.email = "assd@gmail.com";
  data.password = "abcdefg123";
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error);
  }

  /*   revalidatePath("/", "layout");
  redirect("/"); */
}
