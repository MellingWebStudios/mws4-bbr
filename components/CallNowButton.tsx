"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCallClick, formatPhoneHref, type CallTrackingEvent } from "@/lib/call-tracking";

type Props = {
  phone: string;
  label?: string; // E.g. "Location Hero", "Sticky CTA", etc.
  children?: React.ReactNode;
  className?: string;
  trackingLocation?: string;
  trackingSource?: string;
};

export default function CallNowButton({
  phone,
  label = "Call CTA",
  children,
  className = "",
  trackingLocation,
  trackingSource,
}: Props) {
  // Enhanced Google Analytics tracking
  const handleClick = () => {
    const trackingEvent: CallTrackingEvent = {
      phone,
      call_location: trackingLocation || "call_button",
      call_source: trackingSource || "website",
      engagement_type: "call_intent",
      label: label || `Call ${phone}`
    };
    
    trackCallClick(trackingEvent);
  };

  return (
    <Button
      asChild
      className={className + " bg-primary text-primary-foreground hover:bg-yellow-400 py-4 px-8 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"}
    >
      <a
        href={formatPhoneHref(phone)}
        onClick={handleClick}
        className="flex items-center justify-center gap-2"
        aria-label={`Call Now: ${phone}`}
      >
        <Phone size={20} className="animate-pulse" />
        {children || `Call Now: ${phone}`}
      </a>
    </Button>
  );
}
