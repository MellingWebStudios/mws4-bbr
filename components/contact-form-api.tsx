
"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    boilerBrand: "",
    boilerModel: "",
    problemType: "",
    urgency: "normal",
    website: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setFormState({
      isSubmitting: true,
      isSubmitted: false,
    })

    try {
      const response = await fetch("/api/contact-resend", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
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

      // Track successful form submission in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Contact Form API',
          event_label: 'Contact Form API Submission',
          urgency: formData.urgency,
          boiler_brand: formData.boilerBrand || 'not_specified',
          problem_type: formData.problemType || 'not_specified',
          custom_parameters: {
            form_type: 'enhanced_contact_form_api',
            has_boiler_info: !!(formData.boilerBrand || formData.boilerModel || formData.problemType)
          }
        })
      }

      // Reset form data
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        boilerBrand: "",
        boilerModel: "",
        problemType: "",
        urgency: "normal",
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

          {/* Boiler Information Section */}
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Boiler Information (Optional)</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Help us prepare by providing boiler details. This allows us to bring the right parts and tools on our first visit.
            </p>
            
            {/* Boiler Brand */}
            <div className="space-y-2">
              <Label htmlFor="boilerBrand">Boiler Brand</Label>
              <Select onValueChange={(value) => handleSelectChange("boilerBrand", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your boiler brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="worcester-bosch">Worcester Bosch</SelectItem>
                  <SelectItem value="vaillant">Vaillant</SelectItem>
                  <SelectItem value="baxi">Baxi</SelectItem>
                  <SelectItem value="ideal">Ideal</SelectItem>
                  <SelectItem value="glow-worm">Glow-worm</SelectItem>
                  <SelectItem value="potterton">Potterton</SelectItem>
                  <SelectItem value="ferroli">Ferroli</SelectItem>
                  <SelectItem value="alpha">Alpha</SelectItem>
                  <SelectItem value="main">Main</SelectItem>
                  <SelectItem value="viessmann">Viessmann</SelectItem>
                  <SelectItem value="ariston">Ariston</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="unknown">Don't know</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Boiler Model */}
            <div className="space-y-2">
              <Label htmlFor="boilerModel">Boiler Model (if known)</Label>
              <Input 
                id="boilerModel" 
                name="boilerModel" 
                value={formData.boilerModel} 
                onChange={handleChange} 
                placeholder="e.g. Greenstar 30CDi, EcoTec Pro 28"
              />
            </div>

            {/* Problem Type */}
            <div className="space-y-2">
              <Label htmlFor="problemType">Type of Problem</Label>
              <Select onValueChange={(value) => handleSelectChange("problemType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="What's the main issue?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-heating">No heating</SelectItem>
                  <SelectItem value="no-hot-water">No hot water</SelectItem>
                  <SelectItem value="both-heating-hot-water">No heating or hot water</SelectItem>
                  <SelectItem value="low-pressure">Low pressure</SelectItem>
                  <SelectItem value="leaking">Leaking water</SelectItem>
                  <SelectItem value="strange-noises">Strange noises</SelectItem>
                  <SelectItem value="pilot-light">Pilot light issues</SelectItem>
                  <SelectItem value="thermostat">Thermostat problems</SelectItem>
                  <SelectItem value="radiator-issues">Radiator not heating</SelectItem>
                  <SelectItem value="annual-service">Annual service</SelectItem>
                  <SelectItem value="installation">New installation</SelectItem>
                  <SelectItem value="other">Other issue</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Urgency */}
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency</Label>
              <Select onValueChange={(value) => handleSelectChange("urgency", value)} defaultValue="normal">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency (no heating/hot water)</SelectItem>
                  <SelectItem value="urgent">Urgent (within 24 hours)</SelectItem>
                  <SelectItem value="normal">Normal (within 48 hours)</SelectItem>
                  <SelectItem value="routine">Routine (next available appointment)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={formState.errors?.message ? "text-red-500" : ""}>
              Additional Details
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe the problem in more detail, when it started, any error codes you've seen, etc."
              rows={4}
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
