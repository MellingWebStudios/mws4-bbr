"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
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
          <DialogTitle>Customer Reviews</DialogTitle>
          <DialogDescription>See what our customers are saying about our services</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ReviewsDisplay limit={6} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
