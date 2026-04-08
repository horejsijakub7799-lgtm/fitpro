import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bkagynsogdzczarqxacz.supabase.co'
const supabaseKey = 'sb_publishable_VSp2mh1wMDVGaY6ameKeKQ_X_ks6661'

export const supabase = createClient(supabaseUrl, supabaseKey)