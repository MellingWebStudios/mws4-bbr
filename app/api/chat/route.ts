import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const runtime = "nodejs";
export const maxDuration = 30;

// Redis client via Upstash
const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"), // 5 requests per minute per IP
  analytics: true,
});

export async function POST(req: Request) {
  try {
    // 1. Identify IP (via headers or fallback)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "anonymous";

    // 2. Enforce rate limit
    const { success, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
      const now = Math.floor(Date.now() / 1000);
      const secondsUntilReset = reset - now;

      const friendlyMessage = `Whoa! Slow down a bit. You're sending messages too fast — try again in about ${
        secondsUntilReset > 0 ? `${secondsUntilReset} seconds` : "1 minute"
      }.`;

      return new Response(
        JSON.stringify({
          error: "Rate limit exceeded",
          message: friendlyMessage,
          reset_in_seconds: secondsUntilReset,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. Get chatbot prompt
    const systemPrompt = process.env.CHATBOT_SYSTEM_PROMPT;
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: "System prompt not set in environment." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Parse chat message
    const { messages } = await req.json();

    // 5. Stream OpenAI GPT-4o response
    const result = streamText({
      model: openai("gpt-4o"),
      messages,
      system: systemPrompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
