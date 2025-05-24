"use client"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import { Send, X, Sparkles, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { SheetClose } from "@/components/ui/sheet"

const DAVE_PHONE_NUMBER = "08003202345"
const DAVE_WA_NUMBER = DAVE_PHONE_NUMBER.replace(/^0/, "44")

// --- WhatsApp Button ---
function WhatsAppButton({ phone, message }: { phone: string, message?: string }) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message || "Hi Dave, I need help with my boiler.")}`
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="w-full justify-center border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 mt-2 rounded-xl font-semibold"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="mr-2 mb-0.5" size={20} />
        WhatsApp Us
      </a>
    </Button>
  )
}

// --- Call Now Button ---
function CallNowButton({ phone }: { phone: string }) {
  return (
    <Button
      asChild
      variant="outline"
      size="lg"
      className="w-full justify-center border-green-600 text-green-600 hover:bg-green-600/10 mt-2 rounded-xl font-semibold"
    >
      <a href={`tel:${phone}`}>
        <Phone className="mr-2 mb-0.5" size={20} />
        Call Now: {phone}
      </a>
    </Button>
  )
}

// --- Lead Capture Form (Consistent Style) ---
function LeadCaptureForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setSubmitted(true)
    setFormData({ name: "", phone: "", address: "" })
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center mt-4 p-6 rounded-2xl border border-green-200 bg-green-50 text-green-700 text-base shadow-sm animate-fade-in">
        <svg width={48} height={48} fill="none" viewBox="0 0 48 48">
          <circle cx={24} cy={24} r={24} fill="#22C55E" opacity="0.2" />
          <path d="M15 25l6 6 12-12" stroke="#22C55E" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-bold mt-2 mb-1 text-lg">Thank you! Your details have been sent to Dave.</span>
        <span className="text-center">
          He'll call you back soon.<br />
          For urgent issues,{" "}
          <a href={`tel:08003202345`} className="underline text-green-900 font-bold">
            call now
          </a>
          .
        </span>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto mt-4 bg-white border border-gray-200 rounded-2xl shadow-md flex flex-col gap-5 p-6"
      style={{ minWidth: 320 }}
    >
      <Input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="h-12 rounded-xl border-gray-200 focus:border-blue-400 transition"
        autoComplete="name"
      />
      <Input
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="h-12 rounded-xl border-gray-200 focus:border-blue-400 transition"
        autoComplete="tel"
      />
      <Input
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        required
        className="h-12 rounded-xl border-gray-200 focus:border-blue-400 transition"
        autoComplete="street-address"
      />
      <Button
        type="submit"
        size="lg"
        className="w-full h-12 mt-2 rounded-full font-semibold text-lg bg-yellow-400 hover:bg-yellow-500 text-white transition"
        style={{
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.06)"
        }}
      >
        Submit
      </Button>
    </form>
  )
}


const SUGGESTED_QUESTIONS = [
  "What are your prices for boiler servicing?",
  "Do you offer emergency repairs?",
  "What areas of Birmingham do you cover?",
  "How can I contact you?",
  "Are you Gas Safe registered?",
]

const Chatbot = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ api: "/api/chat" })
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [forceShowForm, setForceShowForm] = useState(false)
  const [formShownForMessageId, setFormShownForMessageId] = useState<string | null>(null)
  const [buttonShownForMessageId, setButtonShownForMessageId] = useState<string | null>(null)
  const [whatsAppShownForMessageId, setWhatsAppShownForMessageId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    scrollToBottom()
    inputRef.current?.focus()
    if (messages.length > 0) setShowSuggestions(false)
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleLeadSubmit = (data: any) => {
    console.log("Lead form submitted:", data)
    // Add API/email/WhatsApp integration if needed
  }

  const handleSuggestionClick = (question: string) => {
    if (question.toLowerCase().includes("callback")) {
      setForceShowForm(true)
      return
    }
    const fakeEvent = {
      preventDefault: () => {},
      currentTarget: { elements: { message: { value: question } } },
    } as unknown as React.FormEvent<HTMLFormElement>
    handleSubmit(fakeEvent)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    setIsUserTyping(false)
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) form.requestSubmit()
    }
  }

  // --- AI triggers: form, call, WhatsApp ---
  useEffect(() => {
    const lastMsg = messages[messages.length - 1]
    if (!lastMsg || lastMsg.role !== "assistant") return

    const msgContent = lastMsg.content.toLowerCase()

    // Lead form trigger
    if (msgContent.includes("fill out") && msgContent.includes("form")) {
      setFormShownForMessageId(lastMsg.id)
      setButtonShownForMessageId(null)
      setWhatsAppShownForMessageId(null)
      setForceShowForm(false)
      return
    }
    // Call button trigger
    if (
      msgContent.includes("call now") ||
      msgContent.includes("give us a call") ||
      msgContent.includes("phone us") ||
      msgContent.includes("call us") ||
      msgContent.includes("call dave") ||
      msgContent.includes("call 0800") ||
      msgContent.includes("call 08003202345") ||
      msgContent.includes("call 0800 320 2345") ||
    ) {
      setButtonShownForMessageId(lastMsg.id)
      setFormShownForMessageId(null)
      setWhatsAppShownForMessageId(null)
      setForceShowForm(false)
      return
    }
    // WhatsApp button trigger (AI mentions WhatsApp as a contact channel)
    if (
      msgContent.includes("whatsapp") ||
      msgContent.includes("message us on whatsapp") ||
      msgContent.includes("chat on whatsapp") ||
      msgContent.includes("message dave on whatsapp") ||
      msgContent.includes("whatsapp us") ||
      msgContent.includes("whatsapp 0800") ||
      msgContent.includes("whatsapp 08003202345") ||
      msgContent.includes("whatsapp 0800 320 2345") ||
      msgContent.includes("whatsapp us on 0800") ||
      msgContent.includes("whatsapp us on 08003202345") ||
      msgContent.includes("whatsapp us on 0800 320 2345") ||
      msgContent.includes("whatsapp us on dave's number")
    ) {
      setWhatsAppShownForMessageId(lastMsg.id)
      setFormShownForMessageId(null)
      setButtonShownForMessageId(null)
      setForceShowForm(false)
      return
    }
    setFormShownForMessageId(null)
    setButtonShownForMessageId(null)
    setWhatsAppShownForMessageId(null)
    setForceShowForm(false)
  }, [messages])

  return (
    <div className="flex h-[100dvh] flex-col bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="relative border-b">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: "linear-gradient(90deg, #FF61D3, #FF5757, #FFBD59, #4CC9F0, #4895EF, #7B61FF)",
            backgroundSize: "300% 100%",
            animation: "gradient-shift 8s ease infinite",
          }}
        />
        <div className="relative flex items-center justify-between px-4 py-3 text-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white/50 bg-white/20 backdrop-blur-sm">
              <div className="flex h-full w-full items-center justify-center text-sm font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
            </Avatar>
            <div>
              <h2 className="text-base font-medium">Birmingham Boiler Repairs</h2>
              <p className="text-xs text-white/80">AI Assistant</p>
            </div>
          </div>
          <SheetClose className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
        <div className="space-y-6">
          {/* Manual form (forceShowForm) always renders above messages */}
          {forceShowForm && <LeadCaptureForm onSubmit={handleLeadSubmit} />}
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-3`}>
              {message.role === "assistant" && (
                <Avatar className="mt-1 h-8 w-8 bg-gradient-to-br from-[#7B61FF] to-[#4CC9F0] text-white">
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </Avatar>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#7B61FF] to-[#4895EF] text-white"
                    : "bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700"
                }`}
                style={{
                  animation: message.role === "assistant" ? "message-glow 3s ease-in-out infinite" : "none",
                }}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                {message.role === "assistant" && formShownForMessageId === message.id && (
                  <LeadCaptureForm onSubmit={handleLeadSubmit} />
                )}
                {message.role === "assistant" && buttonShownForMessageId === message.id && (
                  <>
                    <CallNowButton phone={DAVE_PHONE_NUMBER} />
                  </>
                )}
                {message.role === "assistant" && whatsAppShownForMessageId === message.id && (
                  <WhatsAppButton phone={DAVE_WA_NUMBER} message="Hi Dave, I need help with my boiler." />
                )}
              </div>
              {message.role === "user" && (
                <Avatar className="mt-1 h-8 w-8 bg-gradient-to-br from-[#FF61D3] to-[#FF5757] text-white">
                  <div className="flex h-full w-full items-center justify-center text-xs font-bold">You</div>
                </Avatar>
              )}
            </div>
          ))}

          {/* Welcome message if no messages */}
          {messages.length === 0 && (
            <div className="flex justify-start gap-3">
              <Avatar className="mt-1 h-8 w-8 bg-gradient-to-br from-[#7B61FF] to-[#4CC9F0] text-white">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold">
                  <Sparkles className="h-4 w-4" />
                </div>
              </Avatar>
              <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <p className="text-sm leading-relaxed">
                  Hello! I'm your Birmingham Boiler Repairs assistant. How can I help today?
                </p>
                <div className="mt-4 space-y-3">
                  <Button
                    onClick={() => setForceShowForm(true)}
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#7B61FF] to-[#4895EF] hover:opacity-90 rounded-xl font-semibold"
                  >
                    Request a Callback
                  </Button>
                  <CallNowButton phone={DAVE_PHONE_NUMBER} />
                  <WhatsAppButton phone={DAVE_WA_NUMBER} message="Hi Dave, I need help with my boiler." />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t p-4 bg-white dark:bg-gray-950">
        <form onSubmit={onSubmit} className="relative">
          <div
            className="absolute -inset-0.5 rounded-full opacity-80"
            style={{
              background: "linear-gradient(90deg, #FF61D3, #FF5757, #FFBD59, #4CC9F0, #4895EF, #7B61FF, #FF61D3)",
              backgroundSize: "200% 200%",
              animation: "gradient-shift 4s linear infinite",
            }}
          />
          <div className="relative flex items-center gap-2 rounded-full bg-white p-1 pl-4 dark:bg-gray-900">
            <Input
              ref={inputRef}
              name="message"
              value={input}
              onChange={(e) => {
                handleInputChange(e)
                setIsUserTyping(true)
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
                typingTimeoutRef.current = setTimeout(() => setIsUserTyping(false), 1500)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Message Birmingham Boiler Repairs..."
              className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={input.trim() === "" || isLoading}
              size="icon"
              className="h-10 w-10 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#4895EF] hover:opacity-90 transition-opacity"
            >
              <Send className="h-5 w-5 text-white" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
        <div className="mt-2 flex items-center justify-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Powered by Birmingham Boiler Repairs AI
          </p>
        </div>
      </div>

      {/* Global animations */}
      <style jsx global>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes message-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(76, 201, 240, 0.1); }
          50% { box-shadow: 0 0 15px rgba(76, 201, 240, 0.2); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Chatbot
