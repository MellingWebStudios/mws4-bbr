"use client"

import { useState } from "react"
import { useFormState } from "react-dom"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { CheckCircle, AlertCircle } from "lucide-react"
import { submitContactForm, type FormState } from "@/app/actions/contact-form"

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full bg-secondary text-white hover:bg-secondary/90" disabled={pending}>
      {pending ? "Sending..." : "Send Message"}
    </Button>
  )
}

const ContactForm = () => {
  const initialState: FormState = {}
  const [state, formAction] = useFormState(submitContactForm, initialState)
  const [resetKey, setResetKey] = useState(0) // Used to reset the form

  // Function to handle starting a new message after successful submission
  const handleNewMessage = () => {
    setResetKey((prev) => prev + 1) // Increment key to reset form
  }

  return (
    <Card className="border-none shadow-lg">
      {state?.success ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {state.message || "Thank you for contacting us. We'll get back to you as soon as possible."}
          </p>
          <Button className="mt-6 bg-secondary text-white hover:bg-secondary/90" onClick={handleNewMessage}>
            Send Another Message
          </Button>
        </div>
      ) : (
        <form key={resetKey} action={formAction} className="space-y-6 p-6">
          {/* Form-level error message */}
          {state?.errors?._form && (
            <div className="rounded-md bg-red-50 p-4 dark:bg-red-900/30">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-red-700 dark:text-red-300">{state.errors._form}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className={state?.errors?.name ? "text-red-500" : ""}>
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              required
              className={state?.errors?.name ? "border-red-500" : ""}
              aria-invalid={!!state?.errors?.name}
              aria-describedby={state?.errors?.name ? "name-error" : undefined}
            />
            {state?.errors?.name && (
              <p id="name-error" className="text-sm text-red-500">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className={state?.errors?.email ? "text-red-500" : ""}>
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              required
              className={state?.errors?.email ? "border-red-500" : ""}
              aria-invalid={!!state?.errors?.email}
              aria-describedby={state?.errors?.email ? "email-error" : undefined}
            />
            {state?.errors?.email && (
              <p id="email-error" className="text-sm text-red-500">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className={state?.errors?.phone ? "text-red-500" : ""}>
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Your phone number"
              required
              className={state?.errors?.phone ? "border-red-500" : ""}
              aria-invalid={!!state?.errors?.phone}
              aria-describedby={state?.errors?.phone ? "phone-error" : undefined}
            />
            {state?.errors?.phone && (
              <p id="phone-error" className="text-sm text-red-500">
                {state.errors.phone[0]}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className={state?.errors?.message ? "text-red-500" : ""}>
              Message
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              rows={5}
              required
              className={state?.errors?.message ? "border-red-500" : ""}
              aria-invalid={!!state?.errors?.message}
              aria-describedby={state?.errors?.message ? "message-error" : undefined}
            />
            {state?.errors?.message && (
              <p id="message-error" className="text-sm text-red-500">
                {state.errors.message[0]}
              </p>
            )}
          </div>

          <SubmitButton />
        </form>
      )}
    </Card>
  )
}

export default ContactForm
