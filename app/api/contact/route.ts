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
    // Parse the request body
    const body = await request.json()

    // Validate the form data
    const validatedFields = formSchema.safeParse(body)

    if (!validatedFields.success) {
      // Return validation errors
      return NextResponse.json(
        {
          success: false,
          errors: validatedFields.error.flatten().fieldErrors,
        },
        { status: 400 },
      )
    }

    const { name, email, phone, message } = validatedFields.data

    // In a real implementation, you would send the data to an email service or CRM
    // For example, using a service like SendGrid, Mailgun, or a CRM API

    // Log the form data (in a real implementation, this would be sent to a service)
    console.log("Form submission via API route:", { name, email, phone, message })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a success response
    return NextResponse.json({
      success: true,
      message: "Thank you for your message. We'll get back to you as soon as possible.",
    })
  } catch (error) {
    console.error("Contact form API error:", error)

    // Return an error response
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 },
    )
  }
}
