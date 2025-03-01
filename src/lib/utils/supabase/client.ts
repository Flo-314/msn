import {createClient as CClient} from "@supabase/supabase-js";
import {Database} from "../../../../database.types";

export const supabase = CClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {auth: {}},
);
