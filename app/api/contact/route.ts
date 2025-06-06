import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// 1. Zod schema with honeypot
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  website: z.string().optional(), // honeypot
});

// 2. Get the password from env (server-side only)
const FORM_PASSWORD = process.env.FORM_PASSWORD;

// Handle preflight OPTIONS requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-form-password',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    // 3. Parse and validate input
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, x-form-password',
          },
        }
      );
    }

    // 4. Honeypot check
    if (parsed.data.website && parsed.data.website.length > 0) {
      // Bot detected. Silently succeed (do nothing else)
      return NextResponse.json({ success: true }, { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-form-password',
        },
      });
    }

    // 5. Forward to FastAPI backend
    const { name, email, phone, message } = parsed.data;
    const response = await fetch("https://mws4-bbr-api.fly.dev/forms/contact", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "x-form-password": FORM_PASSWORD || ""
      },
      body: JSON.stringify({ name, email, phone, message, website: "" }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("FastAPI error:", error);
      throw new Error("Failed to send form data to backend.");
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you shortly.",
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, x-form-password',
      },
    });
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-form-password',
        },
      }
    );
  }
}
