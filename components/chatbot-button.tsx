"use client"

import { useState, useEffect, useRef } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Chatbot from "@/components/chatbot"
import Image from "next/image"

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const requestRef = useRef<number | undefined>(undefined)
  const previousTimeRef = useRef<number | undefined>(undefined)
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Reset unread indicator when chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
    }
  }, [isOpen])

  // Show tooltip after a short delay when user enters site
  useEffect(() => {
    if (!isOpen) {
      tooltipTimeoutRef.current = setTimeout(() => {
        setShowTooltip(true)
        // Auto-hide tooltip after 10 seconds
        setTimeout(() => {
          setShowTooltip(false)
        }, 10000)
      }, 1500) // Show after 1.5s for smoother experience

      return () => {
        if (tooltipTimeoutRef.current) {
          clearTimeout(tooltipTimeoutRef.current)
        }
      }
    }
  }, [isOpen])

  // Hide tooltip on hover or interaction
  const handleInteraction = () => {
    setShowTooltip(false)
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current)
    }
  }

  // Create a single sparkle with robot-themed colors
  const createSparkle = () => {
    if (!containerRef.current || !buttonRef.current || !isHovering) return

    const container = containerRef.current
    const button = buttonRef.current
    const buttonRect = button.getBoundingClientRect()

    // Calculate button center relative to container
    const buttonCenterX = buttonRect.width / 2
    const buttonCenterY = buttonRect.height / 2

    // Random position around the button's edge
    const angle = Math.random() * Math.PI * 2
    const buttonRadius = Math.min(buttonRect.width, buttonRect.height) / 2
    const startX = buttonCenterX + buttonRadius * 0.9 * Math.cos(angle)
    const startY = buttonCenterY + buttonRadius * 0.9 * Math.sin(angle)

    // Random sparkle properties
    const size = 2 + Math.random() * 4

    // Robot-themed color palette matching the orange robot
    const colorPalette = [
      "#FF9800", // Primary orange
      "#FFB74D", // Light orange
      "#F57C00", // Dark orange
      "#4FC3F7", // Light blue (for eyes)
      "#03A9F4", // Blue
      "#FFF176", // Light yellow
      "#FFEB3B", // Yellow
    ]
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]

    // Create sparkle element
    const sparkle = document.createElement("div")
    sparkle.className = "absolute rounded-full pointer-events-none"
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`
    sparkle.style.left = `${startX}px`
    sparkle.style.top = `${startY}px`
    sparkle.style.backgroundColor = color
    sparkle.style.boxShadow = `0 0 ${Math.floor(size / 2)}px ${color}`
    sparkle.style.zIndex = "0"

    // Create unique animation ID
    const animationId = `sparkle-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const duration = 0.8 + Math.random() * 1
    const distance = 30 + Math.random() * 20

    // Create keyframe animation
    const style = document.createElement("style")
    style.textContent = `
    @keyframes ${animationId} {
      0% { 
        transform: translate(0, 0) scale(0); 
        opacity: 0; 
      }
      15% { 
        opacity: 1; 
        transform: translate(${Math.cos(angle) * distance * 0.15}px, ${Math.sin(angle) * distance * 0.15}px) scale(1); 
      }
      70% {
        opacity: 0.7;
      }
      100% { 
        transform: translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0); 
        opacity: 0; 
      }
    }
  `

    document.head.appendChild(style)
    container.appendChild(sparkle)

    // Apply animation
    sparkle.style.animation = `${animationId} ${duration}s cubic-bezier(0.165, 0.84, 0.44, 1) forwards`

    // Clean up
    setTimeout(() => {
      sparkle.remove()
      style.remove()
    }, duration * 1000)
  }

  // Animation loop for consistent performance
  const animateSparkles = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current

      // Create sparkles at a controlled rate (every ~150ms)
      if (deltaTime > 150 && isHovering) {
        createSparkle()
        previousTimeRef.current = time
      }
    } else {
      previousTimeRef.current = time
    }

    requestRef.current = requestAnimationFrame(animateSparkles)
  }

  // Setup and cleanup animation loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateSparkles)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isHovering])

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50">
      {/* Main button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            ref={buttonRef}
            className={cn(
              "relative flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
              "hover:scale-105 active:scale-95",
              isHovering ? "scale-105 shadow-2xl" : "scale-100",
            )}
            aria-label="Chat with our friendly AI assistant robot"
            onMouseEnter={() => {
              setIsHovering(true)
              handleInteraction()
            }}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => {
              setIsHovering(true)
              handleInteraction()
            }}
            onBlur={() => setIsHovering(false)}
            onClick={handleInteraction}
          >
            {/* Robot image */}
            <div
              className={cn(
                "relative z-10 flex h-16 w-16 items-center justify-center transition-all duration-500",
                isHovering && "robot-wiggle",
              )}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%283%29-tLUry2Q4qKqaOuw4StXm7oPwd6Bkbb.png"
                alt="AI Robot Assistant"
                width={64}
                height={64}
                className={cn("transition-all duration-500", isHovering ? "scale-110" : "scale-100")}
              />
            </div>

            {/* Unread indicator */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 border-2 border-white pointer-events-none pulse-animation">
                <span className="sr-only">New messages</span>
              </span>
            )}
          </button>
        </SheetTrigger>

        <SheetContent className="w-full p-0 sm:max-w-md md:max-w-lg">
          <SheetTitle className="sr-only">Chat Assistant</SheetTitle>
          <Chatbot />
        </SheetContent>
      </Sheet>

      {/* Friendly tooltip popup */}
      {showTooltip && !isOpen && (
        <div
          className={cn(
            "absolute bottom-20 right-0 z-30 w-64 cursor-pointer",
            "animate-in slide-in-from-bottom-2 fade-in-0 duration-300",
          )}
          onClick={handleInteraction}
        >
          <div className="relative">
            <div className="bg-white rounded-xl shadow-xl border border-orange-200 p-4 hover:shadow-2xl transition-shadow duration-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse flex-shrink-0 mt-0.5"></div>
                <span className="text-gray-800 font-semibold text-base leading-relaxed">
                  Hello there! <span className="inline-block animate-wave">👋</span>
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed ml-6">
                I'm your friendly robot assistant! Click to chat with me anytime.
              </p>
              <div className="mt-3 text-xs text-gray-400 ml-6">Click anywhere to close</div>
            </div>
            {/* Tooltip arrow */}
            <div className="absolute -bottom-1 right-8 w-3 h-3 bg-white border-r border-b border-orange-200 transform rotate-45"></div>
          </div>
        </div>
      )}

      {/* Enhanced animations for robot theme */}
      <style jsx global>{`
      @keyframes wave {
        0%, 100% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(20deg);
        }
        75% {
          transform: rotate(-10deg);
        }
      }

      .animate-wave {
        animation: wave 1s ease-in-out infinite;
      }

      @keyframes robot-wiggle {
        0%, 100% {
          transform: rotate(0deg);
        }
        25% {
          transform: rotate(5deg);
        }
        75% {
          transform: rotate(-5deg);
        }
      }

      .robot-wiggle {
        animation: robot-wiggle 1s ease-in-out infinite;
      }

      @keyframes pulse-animation {
        0%, 100% {
          transform: scale(1);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.8;
        }
      }

      .pulse-animation {
        animation: pulse-animation 1.5s ease-in-out infinite;
      }
    `}</style>
    </div>
  )
}

export default ChatbotButton
