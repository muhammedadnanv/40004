// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://zbnwztqwkusdurqllgzc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpibnd6dHF3a3VzZHVycWxsZ3pjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA1NjcyMDQsImV4cCI6MjA0NjE0MzIwNH0._JL1G62T1viqYi7xWz9oBNJf2nFR0QmhluhiH2_AGcE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);