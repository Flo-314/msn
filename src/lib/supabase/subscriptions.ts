import {supabase} from "../utils/supabase/client";
import {RealtimeChannel, RealtimePostgresChangesPayload} from "@supabase/supabase-js";

export const createStatusChannel = (
  filter: string,
  payloadCallback: (
    payload: RealtimePostgresChangesPayload<{
      [key: string]: unknown;
    }>,
  ) => void,
): RealtimeChannel =>
  supabase.channel("statusChanges").on(
    "postgres_changes",
    {
      event: "UPDATE",
      schema: "public",
      table: "user_status",
      filter,
    },
    (payload) => {
      payloadCallback(payload);
    },
  );
