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

// 2. Get the password from env
const FORM_PASSWORD = process.env.FORM_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    // 3. Check password header (optional)
    const password = request.headers.get("x-form-password");
    if (FORM_PASSWORD && password !== FORM_PASSWORD) {
      // Uncomment next line if you want this to return 401 Unauthorized
      // return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      // If you want to allow public (no password), comment this block out
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // 4. Parse and validate input
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // 5. Honeypot check
    if (parsed.data.website && parsed.data.website.length > 0) {
      // Bot detected. Silently succeed (do nothing else)
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 6. Forward to FastAPI backend
    const { name, email, phone, message } = parsed.data;
    const response = await fetch("https://bbr-api.fly.dev/forms/contact", {
      method: "OPTIONS",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("FastAPI error:", error);
      throw new Error("Failed to send form data to backend.");
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 }
    );
  }
}
