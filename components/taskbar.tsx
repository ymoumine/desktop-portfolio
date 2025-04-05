"use client"

import { useState, useEffect } from "react"
import { useWindows } from "@/components/windows-provider"
import { cn } from "@/lib/utils"

export default function Taskbar() {
  const { windows, activeWindowId, setActiveWindow, restoreMinimizedWindow } = useWindows()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })
  }

  const handleTaskbarItemClick = (windowId: string) => {
    const clickedWindow = windows.find((w) => w.id === windowId)

    if (clickedWindow) {
      if (clickedWindow.isMinimized) {
        // Restore the window if it's minimized
        restoreMinimizedWindow(windowId)
      } else if (activeWindowId === windowId) {
        // Minimize the window if it's already active
        // minimizeWindow(windowId);
      } else {
        // Set as active window
        setActiveWindow(windowId)
      }
    }
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gray-800/90 backdrop-blur-sm flex items-center px-2 z-[1000]">
      <div className="flex items-center">
        <button className="w-8 h-8 rounded-full overflow-hidden hover:bg-blue-500/20 flex items-center justify-center">
          <img src="/icons/start.png" alt="Start" className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex items-center px-2 space-x-1 overflow-x-auto">
        {windows.map((window) => (
          <button
            key={window.id}
            className={cn(
              "h-8 px-2 flex items-center rounded hover:bg-white/10 min-w-[120px] max-w-[200px] taskbar-item",
              activeWindowId === window.id ? "bg-white/20" : "",
              window.isMinimized ? "opacity-70" : "",
            )}
            onClick={() => handleTaskbarItemClick(window.id)}
          >
            <img src={window.icon || "/placeholder.svg?height=16&width=16"} alt="" className="w-4 h-4 mr-2" />
            <span className="text-white text-xs truncate">{window.title}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <div className="text-white text-xs px-2 py-1 rounded hover:bg-white/10">
          <div>{formatTime(currentTime)}</div>
          <div className="text-[10px]">{formatDate(currentTime)}</div>
        </div>
      </div>
    </div>
  )
}

