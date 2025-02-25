import {createClient as ssbCreateClient} from "@supabase/supabase-js";
import {Database} from "../../../../database.types";

export async function createServerClient() {
  return await ssbCreateClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.supabase_private_key!,
  );
}
