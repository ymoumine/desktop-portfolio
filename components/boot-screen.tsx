"use client"

import { useState, useEffect } from "react"

export default function BootScreen() {
  const [progress, setProgress] = useState(0)
  const [bootMessage, setBootMessage] = useState("Initializing system...")

  useEffect(() => {
    const messages = [
      "Initializing system...",
      "Loading kernel...",
      "Starting services...",
      "Checking hardware...",
      "Loading desktop environment...",
      "Welcome to YassineOS",
    ]

    let currentMessage = 0

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + Math.random() * 15

        if (newProgress >= 100) {
          clearInterval(interval)
          return 100
        }

        // Update boot message at certain progress points
        if (newProgress > currentMessage * 20 && currentMessage < messages.length - 1) {
          currentMessage++
          setBootMessage(messages[currentMessage])
        }

        return newProgress
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Play boot sound
  useEffect(() => {
    const audio = new Audio("/boot-sound.mp3")
    audio.volume = 0.3
    audio.play().catch((e) => console.log("Audio play failed:", e))

    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="w-16 h-16 mb-8">
        <img src="/icons/windows-logo.png" alt="Windows Logo" className="w-full h-full" />
      </div>

      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-blue-500 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="text-gray-400 text-sm">{bootMessage}</div>
    </div>
  )
}

