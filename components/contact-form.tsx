"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, AlertCircle } from "lucide-react"

type FormErrors = {
  name?: string[]
  email?: string[]
  phone?: string[]
  message?: string[]
  boilerBrand?: string[]
  boilerModel?: string[]
  problemType?: string[]
  urgency?: string[]
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
  boilerBrand: "",
  boilerModel: "",
  problemType: "",
  urgency: "normal",
  website: "", // Honeypot (hidden) field
  formStartTime: Date.now(), // Track when form was loaded
  submitTime: 0, // Will be set on submission
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
    
    // Track form start on first interaction
    if (typeof window !== 'undefined' && (window as any).gtag && !formState.isSubmitted) {
      const hasAnyData = Object.values(formData).some(val => val !== "")
      if (!hasAnyData && value.length > 0) {
        (window as any).gtag('event', 'form_start', {
          event_category: 'Contact Form',
          event_label: 'User started filling contact form'
        })
      }
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormState({ ...formState, isSubmitting: true })

    try {
      // Add timing information
      const submissionData = {
        ...formData,
        submitTime: Date.now(),
      }

      const response = await fetch("/api/contact-resend", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })
      const data = await response.json()
      if (!response.ok || !data.message) {
        setFormState({
          ...formState,
          isSubmitting: false,
          errors: data.errors || { _form: ["Failed to submit the form. Please try again."] },
        })
        
        // Track form submission error
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_error', {
            event_category: 'Contact Form',
            event_label: 'Contact form submission failed',
            error_type: data.errors ? 'validation_error' : 'submission_error'
          })
        }
        return
      }
      setFormState({
        isSubmitting: false,
        isSubmitted: true,
        errors: {},
        message: data.message,
      })
      
      // Track successful form submission in Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Contact Form',
          event_label: 'Contact Form Submission',
          urgency: formData.urgency,
          boiler_brand: formData.boilerBrand || 'not_specified',
          problem_type: formData.problemType || 'not_specified',
          custom_parameters: {
            form_type: 'enhanced_contact_form',
            has_boiler_info: !!(formData.boilerBrand || formData.boilerModel || formData.problemType)
          }
        })
      }
      
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
    setFormData({
      ...initialFormData,
      formStartTime: Date.now(), // Reset the timing
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
            {formState.errors.name && (
              <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.name[0]}</p>
            )}
          </div>
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            {formState.errors.email && (
              <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.email[0]}</p>
            )}
          </div>
          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            {formState.errors.phone && (
              <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.phone[0]}</p>
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
              {formState.errors.boilerModel && (
                <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.boilerModel[0]}</p>
              )}
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

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea 
              id="message" 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              rows={4} 
              placeholder="Please describe the problem in more detail, when it started, any error codes you've seen, etc."
              required 
            />
            {formState.errors.message && (
              <p className="text-sm text-red-600 dark:text-red-400">{formState.errors.message[0]}</p>
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
