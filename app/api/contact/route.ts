import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// BBR leads are handled by the GMTO platform: persistence, dashboard inbox,
// owner SMS/email alerts, visitor confirmation and analytics — all keyed on
// siteId. This route is a thin same-origin proxy so the browser never has to
// make a cross-origin request.
const GMTO_CONTACT_URL =
  process.env.GMTO_CONTACT_URL || "https://getmytradeonline.co.uk/api/contact";
const GMTO_SITE_ID = "birmingham-boiler-repairs";

// Accepts submissions from both contact forms and the booking modal.
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  message: z.string().optional().default(""),
  service: z.string().optional(), // booking modal
  website: z.string().optional(), // honeypot
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-form-password",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400, headers: corsHeaders }
      );
    }

    // Honeypot — silently succeed for bots without doing anything.
    if (parsed.data.website && parsed.data.website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200, headers: corsHeaders });
    }

    const { name, email, phone, message, service } = parsed.data;
    const fullMessage = service
      ? `Service requested: ${service}${message ? `\n\n${message}` : ""}`
      : message;

    const response = await fetch(GMTO_CONTACT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        message: fullMessage,
        siteId: GMTO_SITE_ID,
        source: service ? "booking_modal" : "contact_form",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("GMTO contact error:", error);
      throw new Error("Failed to send form data.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We'll get back to you shortly.",
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error("Contact form API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500, headers: corsHeaders }
    );
  }
}
