"use client"
import CallNowButton from "@/components/ui/CallNowButton"

export default function MobileHero() {
  return (
    <div className="text-center mt-6">
      <h1 className="text-3xl font-bold mb-4">
        Expert Boiler Service <br />& Repairs in Birmingham
      </h1>
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="flex-shrink-0">✓ Same-Day Service</span>
          <span className="flex-shrink-0">✓ No Call-Out Fee</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="flex-shrink-0">✓ Fixed Price</span>
          <span className="flex-shrink-0">✓ 12-Month Guarantee</span>
        </div>
      </div>
      <CallNowButton fullWidth label="Get Help Now" pulse />
    </div>
  )
}
