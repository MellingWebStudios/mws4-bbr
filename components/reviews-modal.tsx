"use client"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ReviewsDisplay from "@/components/reviews-display"

interface ReviewsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ReviewsModal({ open, onOpenChange }: ReviewsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Customer Reviews</DialogTitle>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>See what our customers are saying about our services</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <ReviewsDisplay limit={6} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
