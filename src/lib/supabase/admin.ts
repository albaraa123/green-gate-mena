import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Admin client — uses service role key to bypass RLS
// Only use in server-side admin routes
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
