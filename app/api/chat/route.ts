// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'nodejs';
export const maxDuration = 30; // Allow streaming responses up to 30 seconds

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Create a stream from OpenAI
    const result = streamText({
      model: openai('gpt-4o'), // You can change to gpt-3.5-turbo for lower cost
      messages,
      // Optional system message to customize the assistant
      system: "You are a helpful assistant for Birmingham Boiler Repairs. You provide information about boiler services, pricing, repairs, and booking appointments. Be friendly, professional, and concise. If you don't know the answer to a specific question, suggest the customer call 0800 320 2345 or email boilers.birmingham@yahoo.com.",
    });
    
    // Return the stream response
    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in chat API:', error);
    return new Response(JSON.stringify({ error: 'Failed to process your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}