import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase client — used for database only (demo_bookings, support_tickets)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
