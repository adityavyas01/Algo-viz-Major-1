// supabase/functions/track-event/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "" // Use service role for trusted operations
);

serve(async (req) => {
  const { event_type, metadata } = await req.json();
  
  // The user's ID is extracted from the JWT token by Supabase Auth.
  // We need to get it from the request headers.
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Missing Authorization header" }), { status: 401 });
  }
  
  const token = authHeader.replace("Bearer ", "");
  const { data: { user } } = await supabase.auth.getUser(token);

  if (!user) {
    return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
  }

  try {
    // 1. Insert the raw event
    const { error: eventError } = await supabase.from("user_events").insert({
      user_id: user.id,
      event_type,
      metadata,
    });

    if (eventError) throw eventError;

    // 2. If the event is a problem submission, update proficiency score
    if (event_type === 'problem_solved' && metadata.topic) {
      await updateProficiency(user.id, metadata.topic, metadata.difficulty);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error tracking event:", error);
    return new Response(JSON.stringify({ error: "Failed to track event." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// This function calculates the new proficiency score.
// A more complex algorithm could be used here in the future.
const updateProficiency = async (userId: string, topic: string, difficulty: 'easy' | 'medium' | 'hard') => {
  const scoreChange = {
    easy: 2.5,
    medium: 5.0,
    hard: 10.0,
  }[difficulty] || 1.0;

  // Use an RPC call to an SQL function to perform the upsert atomically.
  const { error } = await supabase.rpc('update_topic_proficiency', {
    p_user_id: userId,
    p_topic: topic,
    p_score_change: scoreChange
  });

  if (error) {
    console.error(`Failed to update proficiency for user ${userId} on topic ${topic}:`, error);
  }
};
