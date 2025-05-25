"use client"

import { useState } from "react"
import LiteYouTubeEmbed from "./LiteYouTubeEmbed"

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

  return (
    <section className="my-8">
      <div className="flex space-x-2 mb-4">
        {videos.map((video) => (
          <button
            key={video.id}
            className={`px-4 py-2 rounded ${activeTab === video.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setActiveTab(video.id)}
          >
            {video.title}
          </button>
        ))}
      </div>
      <div>
        {videos.map((video) => (
          activeTab === video.id && (
            <LiteYouTubeEmbed
              key={video.id}
              id={video.embedId}
              title={video.title}
              className="mx-auto max-w-2xl"
            />
          )
        ))}
      </div>
    </section>
  )
}

export default YouTubeSection
