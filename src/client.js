import { createClient } from '@supabase/supabase-js'

const URL = 'https://pwzibmcbiszjspuckzov.supabase.co'
const API_KEY = 'sb_publishable_qjr9p5VHFr_oQGJyfKpvQg_-wB9Cyxb'

export const supabase = createClient(URL, API_KEY)


