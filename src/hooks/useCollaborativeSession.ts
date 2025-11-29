import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import { RealtimeChannel, User } from '@supabase/supabase-js';
import { SessionState, RealtimeMessage } from '../../supabase/functions/collaborative-session/types';
import { useParams } from 'react-router-dom';

// Define a more specific type for presence tracking
interface TrackedPresence {
  user_id: string;
  online_at: string;
  username: string;
  avatar_url: string;
}

export interface Participant {
  id: string;
  username: string;
  avatar_url: string;
}

export function useCollaborativeSession() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const [sessionState, setSessionState] = useState<SessionState>({
    code: '// Welcome to the collaborative session!',
    language: 'javascript',
    visualizationState: { array: [], steps: [] }
  });
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const initializeSession = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return;
      setUser(currentUser);

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', currentUser.id)
        .single();

      // Add user to participants table if not already there
      await supabase.from('session_participants').upsert({ session_id: sessionId, user_id: currentUser.id });

      const channel = supabase.channel(`session:${sessionId}`, {
        config: {
          broadcast: {
            self: true,
          },
          presence: {
            key: currentUser.id,
          },
        },
      });

      channel
        .on('presence', { event: 'sync' }, () => {
          const presenceState = channel.presenceState<TrackedPresence>();
          const userList: Participant[] = Object.keys(presenceState).map(key => {
            const pres = presenceState[key][0];
            return { id: pres.user_id, username: pres.username, avatar_url: pres.avatar_url };
          });
          setParticipants(userList);
        })
        .on('broadcast', { event: 'state-update' }, (message: { payload: RealtimeMessage }) => {
          setSessionState(message.payload.payload as SessionState);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await channel.track({
              user_id: currentUser.id,
              online_at: new Date().toISOString(),
              username: profile?.username || 'Anonymous',
              avatar_url: profile?.avatar_url || '',
            });
          }
        });

      channelRef.current = channel;
    };

    initializeSession();

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [sessionId]);

  const broadcastStateUpdate = (newState: SessionState) => {
    if (channelRef.current) {
      const message: RealtimeMessage = {
        event: 'state-update',
        payload: newState,
      };
      channelRef.current.send({
        type: 'broadcast',
        ...message,
      });
    }
  };

  return { user, sessionState, participants, broadcastStateUpdate, setSessionState };
}
