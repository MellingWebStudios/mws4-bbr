"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  content:
    "Hello! I'm your Birmingham Boiler Repairs assistant. How can I help you today? You can ask about our services, pricing, or booking an appointment.",
  role: "assistant",
  timestamp: new Date(),
}

// Simple responses based on keywords
const RESPONSES: Record<string, string> = {
  pricing:
    "Our standard boiler service is £55, full service is £120, and repairs start at £99 with no call-out fee. We don't charge VAT on our services.",
  service:
    "We offer boiler servicing, repairs, gas safety inspections, and are specialists in Ferroli boilers. All our engineers are Gas Safe registered (No. 520077).",
  repair:
    "We provide same-day repairs when booked before 12pm, with prices starting at £99 with no call-out fee. We stock parts for major brands like Worcester, Vaillant and Baxi.",
  contact:
    "You can reach us at 0800 320 2345 or 07807 776 411. Our email is boilers.birmingham@yahoo.com and we're based at 18 Camino Rd, Birmingham B32 3XE.",
  hours: "We're open Monday to Friday from 9:00 AM to 5:00 PM.",
  areas:
    "We cover Birmingham, Bromsgrove, Redditch, Dudley, Stourbridge, Kingswinford, Wolverhampton, Alvechurch, Halesowen, West Bromwich and surrounding areas.",
  gas: "Yes, we are Gas Safe registered, number 520077.",
  payment: "We accept both card and cash payments. We don't charge VAT on our services.",
  emergency:
    "For emergency repairs, please call us directly at 0800 320 2345 or 07807 776 411. We offer same-day service when booked before 12pm.",
  ferroli:
    "We are approved specialists for Ferroli boiler repair & maintenance with expert knowledge of Ferroli systems and components.",
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase())
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const generateResponse = (query: string): string => {
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(RESPONSES)) {
      if (query.includes(keyword)) {
        return response
      }
    }

    // Default response if no keywords match
    return "I'm not sure about that. For specific questions, please call us at 0800 320 2345 or email us at boilers.birmingham@yahoo.com."
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-secondary text-white"
                    : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="mb-1 flex items-center">
                    <Avatar className="mr-2 h-6 w-6">
                      <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-black">
                        BBR
                      </div>
                    </Avatar>
                    <span className="text-xs font-medium">Boiler Assistant</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="mt-1 text-right text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-75"></div>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400 delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-secondary hover:bg-secondary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
