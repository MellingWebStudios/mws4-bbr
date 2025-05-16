// app/api/chat/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "nodejs";
export const maxDuration = 30; // Allow streaming responses up to 30 seconds

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Create a stream from OpenAI
    const result = streamText({
      model: openai("gpt-4o"), // You can change to gpt-3.5-turbo for lower cost
      messages,
      // Optional system message to customize the assistant
      system: 
      `
      ### CONTEXT ###
      You are a chatbot that is integrated into a website. You are here to help users with their questions and get them to either fill out a form or get the user to call.
      
      ### YOUR ABILITIES ###
      If you say "call now", "give us a call" or "phone us" it will trigger a call now button for the user to press, use this when you feel its best appropriate.
      If you say "fill out the form" or "fill in the form" it will trigger a form for the user to fill out, use this when you feel its best appropriate.
      
      ### SYSTEM INSTRUCTIONS ###
      Your job is to get the user to either call or fill out a form.

      `,
    });

    // Return the stream response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
