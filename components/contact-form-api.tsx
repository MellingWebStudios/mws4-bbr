
"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

type FormState = {
  isSubmitting: boolean
  isSubmitted: boolean
  errors?: {
    name?: string[]
    email?: string[]
    phone?: string[]
    message?: string[]
    _form?: string[]
  }
  message?: string
}

const ContactFormAPI = () => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setFormState({
      isSubmitting: true,
      isSubmitted: false,
    })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-form-password": process.env.NEXT_PUBLIC_FORM_PASSWORD || "",
        },
        body: JSON.stringify(formData),
      });

      // 👇 Log raw response status and text
      console.log("API response status:", response.status);
      console.log("API response ok:", response.ok);
      const data = await response.json();
      console.log("API response status:", response.status);
      console.log("API response data:", data);

      if (!response.ok || !data.message) {
        setFormState({
          isSubmitting: false,
          isSubmitted: false,
          errors: data.errors || { _form: ["Failed to submit the form. Please try again."] },
        });
        return;
      }

      // Success
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        message: data.message,
      })

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        website: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        errors: {
          _form: ["An error occurred while submitting the form. Please try again later."],
        },
      })
    }
  }

  const handleNewMessage = () => {
    setFormState({
      isSubmitting: false,
      isSubmitted: false,
    })
  }

  return (
    <Card className="border-none shadow-lg">
      {formState.isSubmitted ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {formState.message || "Thank you for contacting us. We'll get back to you as soon as possible."}
          </p>
          <Button className="mt-6 bg-secondary text-white hover:bg-secondary/90" onClick={handleNewMessage}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          {/* Form-level error message */}
          {formState.errors?._form && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-red-700 dark:text-red-300">{formState.errors._form[0]}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className={formState.errors?.name ? "text-red-500" : ""}>
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className={formState.errors?.name ? "border-red-500" : ""}
              aria-invalid={!!formState.errors?.name}
              aria-describedby={formState.errors?.name ? "name-error" : undefined}
            />
            {formState.errors?.name && (
              <p id="name-error" className="text-sm text-red-500">
                {formState.errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={formState.errors?.email ? "text-red-500" : ""}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className={formState.errors?.email ? "border-red-500" : ""}
              aria-invalid={!!formState.errors?.email}
              aria-describedby={formState.errors?.email ? "email-error" : undefined}
            />
            {formState.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {formState.errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className={formState.errors?.phone ? "text-red-500" : ""}>
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              required
              className={formState.errors?.phone ? "border-red-500" : ""}
              aria-invalid={!!formState.errors?.phone}
              aria-describedby={formState.errors?.phone ? "phone-error" : undefined}
            />
            {formState.errors?.phone && (
              <p id="phone-error" className="text-sm text-red-500">
                {formState.errors.phone[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={formState.errors?.message ? "text-red-500" : ""}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={5}
              required
              className={formState.errors?.message ? "border-red-500" : ""}
              aria-invalid={!!formState.errors?.message}
              aria-describedby={formState.errors?.message ? "message-error" : undefined}
            />
            {formState.errors?.message && (
              <p id="message-error" className="text-sm text-red-500">
                {formState.errors.message[0]}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary text-white hover:bg-secondary/90"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </Card>
  )
}

export default ContactFormAPI
