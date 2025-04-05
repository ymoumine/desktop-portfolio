"use client"

import { useState, useEffect } from "react"
import Desktop from "@/components/desktop"
import Taskbar from "@/components/taskbar"
import BootScreen from "@/components/boot-screen"
import { WindowsProvider } from "@/components/windows-provider"
import Clippy from "@/components/clippy"

export default function Home() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // Simulate boot time
    const timer = setTimeout(() => {
      setBooting(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (booting) {
    return <BootScreen />
  }

  return (
    <WindowsProvider>
      <div className="h-screen w-screen overflow-hidden relative bg-gradient-to-br from-blue-900 to-gray-900">
        <Desktop />
        <Clippy />
        <Taskbar />
      </div>
    </WindowsProvider>
  )
}

