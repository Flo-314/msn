import { createServerClient as sbssr } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as ssbCreateClient } from "@supabase/supabase-js";
import { Database } from "../../../../database.types";

export async function createClient() {
  const cookieStore = await cookies();

  return sbssr<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.supabase_private_key!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function createServerClient() {
  return await ssbCreateClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.supabase_private_key!
  );
}
