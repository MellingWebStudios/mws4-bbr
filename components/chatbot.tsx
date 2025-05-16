"use client"

import { useChat } from 'ai/react'
import { useState, useRef, useEffect } from "react"
import { Send, X, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar } from "@/components/ui/avatar"
import { SheetClose } from "@/components/ui/sheet"

// Suggested questions to help users get started
const SUGGESTED_QUESTIONS = [
  "What are your prices for boiler servicing?",
  "Do you offer emergency repairs?",
  "What areas of Birmingham do you cover?",
  "How can I contact you?",
  "Are you Gas Safe registered?",
]

const Chatbot = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  })
  
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isUserTyping, setIsUserTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    scrollToBottom()
    // Focus the input when the component mounts
    inputRef.current?.focus()
    
    // Hide suggestions after first message
    if (messages.length > 0) {
      setShowSuggestions(false)
    }
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSuggestionClick = (question: string) => {
    // Use the AI SDK's handleSubmit with a custom form event
    const fakeEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: {
          message: { value: question }
        }
      }
    } as unknown as React.FormEvent<HTMLFormElement>
    
    handleSubmit(fakeEvent)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(e)
    setIsUserTyping(false)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form) form.requestSubmit()
    }
  }

  return (
    <div className="flex h-[100dvh] flex-col bg-white dark:bg-gray-950">
      {/* Rainbow gradient header */}
      <div className="relative border-b">
        {/* Rainbow gradient background */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: "linear-gradient(90deg, #FF61D3, #FF5757, #FFBD59, #4CC9F0, #4895EF, #7B61FF)",
            backgroundSize: "300% 100%",
            animation: "gradient-shift 8s ease infinite",
          }}
        />

        {/* Header content */}
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
                  Hello! I'm your Birmingham Boiler Repairs assistant. How can I help you today? You can ask about our services, pricing, or booking an appointment.
                </p>
              </div>
            </div>
          )}

          {/* Suggested questions */}
          {showSuggestions && messages.length === 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(question)}
                    className="rounded-full bg-white px-3 py-1.5 text-xs border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors shadow-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* User typing indicator */}
          {isUserTyping && messages.length > 0 && !isLoading && (
            <div className="flex justify-end mb-2">
              <div className="max-w-[85%] rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-500 dark:bg-gray-800 dark:text-gray-400 flex items-center gap-2 animate-fade-in">
                <div className="flex space-x-1">
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FF61D3] delay-0"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#FFBD59] delay-150"></div>
                  <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#4895EF] delay-300"></div>
                </div>
                <span>You are typing...</span>
              </div>
            </div>
          )}

          {/* AI typing indicator */}
          {isLoading && (
            <div className="flex justify-start gap-3">
              <Avatar className="mt-1 h-8 w-8 bg-gradient-to-br from-[#7B61FF] to-[#4CC9F0] text-white">
                <div className="flex h-full w-full items-center justify-center text-xs font-bold">
                  <Sparkles className="h-4 w-4" />
                </div>
              </Avatar>
              <div className="max-w-[85%] rounded-2xl bg-white px-4 py-3 shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#7B61FF] delay-0"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#4895EF] delay-150"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-[#4CC9F0] delay-300"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area with rainbow gradient border */}
      <div className="border-t p-4 bg-white dark:bg-gray-950">
        <form onSubmit={onSubmit} className="relative">
          {/* Rainbow gradient border */}
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

                // Clear any existing timeout
                if (typingTimeoutRef.current) {
                  clearTimeout(typingTimeoutRef.current)
                }

                // Set a new timeout to detect when user stops typing
                typingTimeoutRef.current = setTimeout(() => {
                  setIsUserTyping(false)
                }, 1500)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Message Birmingham Boiler Repairs..."
              className="flex-1 border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={input.trim() === '' || isLoading}
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