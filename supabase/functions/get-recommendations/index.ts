// supabase/functions/get-recommendations/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

serve(async (req) => {
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
    // 1. Fetch user's proficiency scores
    const { data: proficiencies, error: profError } = await supabase
      .from("user_topic_proficiency")
      .select("topic, proficiency_score")
      .eq("user_id", user.id);

    if (profError) throw profError;

    // 2. Identify the topic with the lowest proficiency score
    let targetTopic = "Arrays & Hashing"; // Default topic
    if (proficiencies && proficiencies.length > 0) {
      const sortedProficiencies = [...proficiencies].sort((a, b) => a.proficiency_score - b.proficiency_score);
      targetTopic = sortedProficiencies[0].topic;
    }

    // 3. Fetch challenges in that topic that the user has not yet solved
    // We need to know which problems have been solved. We can get this from user_events.
    const { data: solvedEvents, error: solvedError } = await supabase
      .from("user_events")
      .select("metadata->>challengeId as challengeId")
      .eq("user_id", user.id)
      .eq("event_type", "problem_solved");

    if (solvedError) throw solvedError;
    
    const solvedChallengeIds = solvedEvents.map(e => e.challengeId);

    // 4. Query for recommended challenges
    const query = supabase
      .from("challenges")
      .select("id, title, category, difficulty, points")
      .eq("category", targetTopic);

    if (solvedChallengeIds.length > 0) {
      query.not("id", "in", `(${solvedChallengeIds.join(',')})`);
    }
    
    const { data: recommendedChallenges, error: challengesError } = await query.limit(5);

    if (challengesError) throw challengesError;

    return new Response(JSON.stringify({ recommendations: recommendedChallenges, weakTopic: targetTopic }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error getting recommendations:", error);
    return new Response(JSON.stringify({ error: "Failed to get recommendations." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
