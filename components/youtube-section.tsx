"use client"

import { useState } from "react"

const YouTubeSection = () => {
  const [activeTab, setActiveTab] = useState("repressurising")

  const videos = [
    {
      id: "repressurising",
      title: "How to Repressurise Your Boiler",
      embedId: "QjnwZWK0D_U", // Actual boiler repressurising video
    },
    {
      id: "clock",
      title: "Using Your Boiler Clock",
      embedId: "rKXJpzhoEfw", // Actual boiler clock programming video
    },
    {
      id: "pressure",
      title: "Topping Up Pressure",
      embedId: "nVHBYjGW-N0", // Actual boiler pressure video
    },
  ]

  return null // Section removed as requested
}

export default YouTubeSection
