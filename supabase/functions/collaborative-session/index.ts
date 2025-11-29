import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { RealtimeMessage, SessionState } from './types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { session_id, challenge_id } = await req.json();
    if (!session_id || !challenge_id) {
      return new Response(JSON.stringify({ error: 'session_id and challenge_id are required' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 401,
      });
    }

    // Check if user is a participant
    const { data: participant, error: participantError } = await supabase
      .from('session_participants')
      .select('*')
      .eq('session_id', session_id)
      .eq('user_id', user.id)
      .single();

    if (participantError || !participant) {
       // If not a participant, maybe they are the host trying to create/join
       const { data: session, error: sessionError } = await supabase
       .from('collaborative_sessions')
       .select('host_id')
       .eq('id', session_id)
       .single();

       if(sessionError || session.host_id !== user.id) {
        return new Response(JSON.stringify({ error: 'Not a participant of this session' }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 403,
          });
       }
    }

    const channel = supabase.channel(`session:${session_id}`);

    // The function doesn't handle the websocket connection itself,
    // but it can be used to authorize and initiate the channel for the client.
    // The client will then subscribe to this channel.

    // This function can also be used to broadcast messages from a trusted server-side process if needed.
    // For example, if a user action needs to trigger a state change for everyone.

    return new Response(JSON.stringify({ message: `Authorized for session ${session_id}` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
