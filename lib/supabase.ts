// lib/supabase.ts — Client Supabase (server-side et client-side)

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client public (lecture, pages publiques)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client admin (écriture, Server Actions uniquement — jamais exposé au navigateur)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
