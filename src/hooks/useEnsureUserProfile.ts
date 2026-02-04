import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

/**
 * Hook to ensure user has a profile in user_profiles table
 * Creates one automatically if it doesn't exist
 */
export function useEnsureUserProfile() {
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function ensureProfile() {
      if (!user) {
        setIsReady(true);
        return;
      }

      try {
        // Check if profile exists
        const { data: existingProfile, error: fetchError } = await supabase
          .from('user_profiles' as any)
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          // PGRST116 = not found, which is expected
          throw fetchError;
        }

        if (!existingProfile) {
          // Create profile
          const { error: insertError } = await supabase
            .from('user_profiles' as any)
            .insert({
              user_id: user.id,
              display_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
              bio: '',
              skills: [],
              interests: [],
              is_public: true
            });

          if (insertError && !insertError.message.includes('duplicate')) {
            throw insertError;
          }
        }

        setIsReady(true);
      } catch (err) {
        console.error('Error ensuring user profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize profile');
        setIsReady(true); // Still set ready to not block the app
      }
    }

    ensureProfile();
  }, [user]);

  return { isReady, error };
}
