"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Chatbot from "@/components/chatbot"

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-secondary p-0 shadow-lg hover:bg-secondary/90"
          aria-label="Open chatbot"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="text-left">Birmingham Boiler Repairs Assistant</SheetTitle>
        </SheetHeader>
        <Chatbot />
      </SheetContent>
    </Sheet>
  )
}

export default ChatbotButton
