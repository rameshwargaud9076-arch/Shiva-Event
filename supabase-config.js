/* =========================================================
   SHIVA EVENT - SUPABASE CONFIG
   ========================================================= */
"use strict";

const SUPABASE_URL = "https://rvvonqdyghhjdbigjrra.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kDn8mpFHmVtseDSdkZCkig_Tpu3oBDT";

const shivaSupabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
