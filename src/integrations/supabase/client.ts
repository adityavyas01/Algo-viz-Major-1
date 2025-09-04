import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';
import { env } from '@/lib/env';

// Create Supabase client with enhanced session management
export const supabase = createClient<Database>(
  env.SUPABASE_URL, 
  env.SUPABASE_ANON_KEY,
  {
    auth: {
      // Enable automatic token refresh
      autoRefreshToken: true,
      // Persist session in localStorage (default)
      persistSession: true,
      // Session will be refreshed when the browser tab regains focus
      detectSessionInUrl: true,
      // Custom storage for session persistence (optional)
      storage: {
        getItem: (key: string) => {
          if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key);
          }
          return null;
        },
        setItem: (key: string, value: string) => {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, value);
          }
        },
        removeItem: (key: string) => {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
          }
        },
      },
      // Flow type for better UX
      flowType: 'pkce'
    },
    // Global settings
    global: {
      headers: {
        'X-Client-Info': 'algviz-web-app'
      }
    }
  }
);

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";