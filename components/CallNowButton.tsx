"use client";

import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  phone: string;
  label?: string; // E.g. "Location Hero", "Sticky CTA", etc.
  children?: React.ReactNode;
  className?: string;
};

export default function CallNowButton({
  phone,
  label = "Call CTA",
  children,
  className = "",
}: Props) {
  // Google Analytics event on click
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "call_click", {
        event_category: "engagement",
        event_label: label,
        value: 1,
      });
    }
  };

  return (
    <Button
      asChild
      className={className + " bg-primary text-primary-foreground hover:bg-yellow-400 py-4 px-8 rounded-xl text-base font-semibold shadow-lg transition-all duration-300 hover:scale-105"}
    >
      <a
        href={`tel:${phone.replace(/\s/g, "")}`}
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
