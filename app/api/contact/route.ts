import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Define the form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedFields = formSchema.safeParse(body)

    if (!validatedFields.success) {
      return NextResponse.json(
        { success: false, errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const formData = validatedFields.data

    // 🔁 Forward to FastAPI backend
    const response = await fetch("https://bbr-api.fly.dev/forms/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("FastAPI error:", error)
      throw new Error("Failed to send form data to backend.")
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you shortly.",
    })
  } catch (error) {
    console.error("Contact form API error:", error)
    return NextResponse.json(
      { success: false, message: "Server error. Please try again later." },
      { status: 500 },
    )
  }
}

