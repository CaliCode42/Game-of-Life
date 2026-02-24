import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://luzcuwmashnvvolopjdj.supabase.co"
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx1emN1d21hc2hudnZvbG9wamRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MjE2NzIsImV4cCI6MjA4NzQ5NzY3Mn0.4ZvbDric3K5jwvFivgHD6xKGLM1t_sIrBSI-kGApXtY"

export const supabase = createClient(supabaseUrl, supabaseKey)