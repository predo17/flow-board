import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

console.log("Url do Supabase",import.meta.env.VITE_SUPABASE_URL);
console.log("KEY do Supabase",import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Variáveis de ambiente do Supabase não configuradas. '
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
