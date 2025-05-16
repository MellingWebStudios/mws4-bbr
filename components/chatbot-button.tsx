"use client"

import { useState, useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import Chatbot from "@/components/chatbot"
import { SheetTitle } from "@/components/ui/sheet"

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()

  // Reset unread indicator when chat is opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false)
    }
  }, [isOpen])

  // Create a single multicolored sparkle
  const createSparkle = () => {
    if (!containerRef.current || !buttonRef.current || !isHovering) return

    const container = containerRef.current
    const button = buttonRef.current
    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

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

    // Color palette inspired by ChatGPT's gradient but with better harmony
    const colorPalette = [
      "#FF61D3", // Vibrant pink
      "#FF5757", // Bright red
      "#FFBD59", // Golden yellow
      "#4CC9F0", // Sky blue
      "#4895EF", // Periwinkle
      "#7B61FF", // Purple
      "#C77DFF", // Lavender
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
    container.appendChild(sparkle) // Append to container instead of button

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
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 h-20 w-20 flex items-center justify-center"
    >
      {/* Refined rainbow glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-500",
          isHovering ? "opacity-70" : "opacity-30"
        )}
        style={{
          transform: "scale(1.35)",
          background:
            "conic-gradient(from 0deg, #FF61D3, #FF5757, #FFBD59, #4CC9F0, #4895EF, #7B61FF, #C77DFF, #FF61D3)",
          animation:
            "smooth-rotate 12s linear infinite, subtle-pulse 4s ease-in-out infinite",
          filter: "blur(10px)",
        }}
      />

      {/* Main button */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button
            ref={buttonRef}
            className={cn(
              "relative flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2",
              isHovering ? "scale-105" : "scale-100"
            )}
            aria-label="Open chatbot assistant"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onFocus={() => setIsHovering(true)}
            onBlur={() => setIsHovering(false)}
          >
            {/* Refined rainbow background with smoother gradient */}
            <div
              className="absolute inset-0 z-0 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #FF61D3, #FF5757, #FFBD59, #4CC9F0, #4895EF, #7B61FF, #C77DFF)",
                backgroundSize: "400% 400%",
                animation: "refined-gradient 12s ease infinite",
                opacity: 0.95,
              }}
            />

            {/* Subtle inner light effect */}
            <div
              className="absolute inset-0 z-1 opacity-25 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)",
              }}
            />

            {/* Fine sparkle pattern overlay */}
            <div className="absolute inset-0 z-1 overflow-hidden rounded-full">
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 30%, white 0.5px, transparent 0.5px), " +
                    "radial-gradient(circle at 60% 70%, white 0.3px, transparent 0.3px), " +
                    "radial-gradient(circle at 85% 15%, white 0.5px, transparent 0.5px), " +
                    "radial-gradient(circle at 35% 80%, white 0.3px, transparent 0.3px)",
                  backgroundSize: "100px 100px",
                  animation: "refined-twinkle 8s linear infinite",
                }}
              />
            </div>

            {/* Icon container with refined styling */}
            <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 backdrop-blur-sm">
              <Sparkles
                className={cn(
                  "h-5 w-5 transition-all duration-500",
                  isHovering
                    ? "text-[#7B61FF] scale-110"
                    : "text-secondary scale-100"
                )}
              />
            </div>
          </button>
        </SheetTrigger>

        <SheetContent className="w-full p-0 sm:max-w-md md:max-w-lg">
          <SheetTitle className="sr-only">Chat Assistant</SheetTitle>
          <Chatbot />
        </SheetContent>
      </Sheet>

      {/* Unread indicator - now positioned absolutely relative to the container */}
      {hasUnread && (
        <span className="absolute top-1 right-1 z-20 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 border-2 border-white">
          <span className="sr-only">New messages</span>
        </span>
      )}

      {/* Refined animations */}
      <style jsx global>{`
        @keyframes refined-gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes smooth-rotate {
          from {
            transform: scale(1.35) rotate(0deg);
          }
          to {
            transform: scale(1.35) rotate(360deg);
          }
        }

        @keyframes subtle-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1.35) rotate(0deg);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.4) rotate(180deg);
          }
        }

        @keyframes refined-twinkle {
          0% {
            transform: translateY(0px);
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100px);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

export default ChatbotButton
