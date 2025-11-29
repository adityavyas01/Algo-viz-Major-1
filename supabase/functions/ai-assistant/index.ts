// supabase/functions/ai-assistant/index.ts

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { OpenAI } from "https://esm.sh/openai";

const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
const supabase = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

serve(async (req) => {
  const { messages, algorithm, code, step } = await req.json();

  // 1. Construct the system prompt
  const systemPrompt = `You are an expert computer science tutor integrated into an algorithm visualization platform called AlgoViz. Your role is to provide clear, concise, and helpful explanations.

Current context:
- Algorithm: ${algorithm || "Not specified"}
- User's Code:
\`\`\`
${code || "No code provided."}
\`\`\`
- Visualization Step: ${step || "Not specified"}

Your instructions:
- Be encouraging and supportive.
- If the user asks for the answer, guide them with a hint instead of giving it away directly.
- Explain concepts step-by-step.
- Use Markdown for formatting, especially for code snippets.
- Keep responses concise and to the point.`;

  // 2. Call OpenAI API
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      stream: true,
    });

    // 3. Log the usage (do not await, run in background)
    logUsage(req);

    // 4. Stream the response back to the client
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const delta = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(new TextEncoder().encode(delta));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return new Response(JSON.stringify({ error: "Failed to process your request." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});

// Helper to log usage without blocking the response
const logUsage = async (req: Request) => {
  const { user_id } = req.headers.get("x-user-info") ? JSON.parse(req.headers.get("x-user-info")!) : { user_id: null };
  if (user_id) {
    await supabase.from("usage_logs").insert({
      user_id,
      feature: "ai_assistant",
    });
  }
};
