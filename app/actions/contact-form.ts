"use server"

import { z } from "zod"

// Define the form schema for validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type ContactFormData = z.infer<typeof formSchema>

export type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form data
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "Please correct the errors in the form.",
    }
  }

  const { name, email, phone, message } = validatedFields.data

  try {
    // In a real implementation, you would send the data to an email service or CRM
    // For example, using a service like SendGrid, Mailgun, or a CRM API

    // Simulate API call with a delay
    // await new Promise((resolve) => setTimeout(resolve, 1500))

    // Log the form data (in a real implementation, this would be sent to a service)
    // console.log("Form submission:", { name, email, phone, message })

    // For demonstration purposes, let's simulate a successful submission
    // In a real implementation, you would check the response from your email/CRM service

    // return {
    //   success: true,
    //   message: "Thank you for your message. We'll get back to you as soon as possible.",
    // }

    // Uncomment the SendGrid implementation and update with actual code
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: "boilers.birmingham@yahoo.com" }],
            subject: `New contact form submission from ${name}`,
          },
        ],
        from: { email: "noreply@birminghamboilerrepairs.com", name: "Birmingham Boiler Repairs Website" },
        content: [
          {
            type: "text/plain",
            value: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\nLocation: Solihull`,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send email")
    }

    // Add GA4 event tracking
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "form_submission", {
        event_category: "conversion",
        event_label: "solihull-form",
      })
    }

    return {
      success: true,
      message: "Thank you for your message. We'll get back to you as soon as possible.",
    }
  } catch (error) {
    // Handle any errors that occur during submission
    console.error("Contact form submission error:", error)

    return {
      errors: {
        _form: ["An error occurred while submitting the form. Please try again later."],
      },
      success: false,
      message: "Failed to submit the form. Please try again later.",
    }
  }
}
