import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// BBR leads are handled by the GMTO platform via the authenticated lead-ingestion
// endpoint. This route is a same-origin proxy so the browser never makes a
// cross-origin request. It forwards:
//   - the visitor's real IP (x-client-ip) so rate-limiting works on the real caller
//   - the honeypot field value (x-hp-value) so bot detection works
//   - the form load timestamp (x-form-ts) so submit-speed detection works
//   - a Bearer API key (GMTO_API_KEY) that authenticates this server as BBR
// Boiler-specific fields ride along as `metadata` and render in the owner email.
const GMTO_INGEST_URL =
  process.env.GMTO_INGEST_URL || "https://getmytradeonline.co.uk/api/ingest/lead";
const GMTO_API_KEY = process.env.GMTO_API_KEY || "";

const ratelimit = process.env.UPSTASH_REDIS_REST_URL
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.fixedWindow(5, "1 m"),
      analytics: true,
    })
  : null;

// Accepts submissions from the main contact form (boiler fields) + booking modal.
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  message: z.string().optional().default(""),
  service: z.string().optional(), // booking modal
  boilerBrand: z.string().optional(),
  boilerModel: z.string().optional(),
  problemType: z.string().optional(),
  urgency: z.string().optional(),
  website: z.string().optional(),     // honeypot
  formStartTime: z.number().optional(), // form load timestamp (for submit-speed check)
  submitTime: z.number().optional(),    // submission timestamp
});

const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL || "https://birminghamboilerrepairs.co.uk";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-form-password",
};

/** "worcester-bosch" / "no_hot_water" → "Worcester Bosch" / "No Hot Water" */
function prettify(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const cleaned = value.replace(/[-_]/g, " ").trim();
  if (!cleaned) return undefined;
  return cleaned.replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  if (ratelimit) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429, headers: corsHeaders }
      );
    }
  }

  // Visitor's real IP — forwarded to the platform so per-visitor rate-limiting works.
  const visitorIp =
    request.headers.get("fly-client-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "";

  try {
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400, headers: corsHeaders }
      );
    }

    const { name, email, phone, message, service, boilerBrand, boilerModel, problemType, urgency, website, formStartTime } = parsed.data;
    const fullMessage = service
      ? `Service requested: ${service}${message ? `\n\n${message}` : ""}`
      : message;

    // Boiler details → metadata so they render in the owner email + dashboard.
    const metadata: Record<string, string> = {};
    const brand = prettify(boilerBrand);
    const model = boilerModel?.trim();
    const problem = prettify(problemType);
    const urgencyLabel = prettify(urgency);
    if (brand) metadata["Boiler brand"] = brand;
    if (model) metadata["Boiler model"] = model;
    if (problem) metadata["Problem"] = problem;
    if (urgencyLabel) metadata["Urgency"] = urgencyLabel;

    const response = await fetch(GMTO_INGEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Auth: identifies this server as the BBR tenant.
        "Authorization": `Bearer ${GMTO_API_KEY}`,
        // Forwarded visitor signals for spam filter structural layers.
        ...(visitorIp ? { "x-client-ip": visitorIp } : {}),
        "x-hp-value": website ?? "",
        ...(formStartTime ? { "x-form-ts": String(formStartTime) } : {}),
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message: fullMessage,
        source: service ? "booking_modal" : "contact_form",
        ...(Object.keys(metadata).length ? { metadata } : {}),
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
