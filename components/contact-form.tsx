"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"

type FormErrors = {
  name?: string[]
  email?: string[]
  phone?: string[]
  message?: string[]
  _form?: string[]
}

type FormState = {
  isSubmitting: boolean
  isSubmitted: boolean
  errors: FormErrors
  message: string
}

const initialFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "", // Honeypot (hidden) field
}

export default function ContactForm() {
  const [formData, setFormData] = useState(initialFormData)
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSubmitted: false,
    errors: {},
    message: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState({ ...formState, isSubmitting: true })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-form-password": process.env.NEXT_PUBLIC_FORM_PASSWORD || "",
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok || !data.message) {
        setFormState({
          ...formState,
          isSubmitting: false,
          errors: data.errors || { _form: ["Failed to submit the form. Please try again."] },
        })
        return
      }
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        errors: {},
        message: data.message,
      })
      setFormData(initialFormData)
    } catch (error) {
      setFormState({
        ...formState,
        isSubmitting: false,
        errors: { _form: ["An error occurred while submitting the form. Please try again later."] },
      })
    }
  }

  const handleNewMessage = () => {
    setFormState({ isSubmitting: false, isSubmitted: false, errors: {}, message: "" })
    setFormData(initialFormData)
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
          {/* Honeypot field */}
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />
          {formState.errors._form && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-red-700 dark:text-red-300">{formState.errors._form[0]}</p>
              </div>
            </div>
          )}
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>
          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} required />
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
