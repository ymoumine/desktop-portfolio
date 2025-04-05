"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import Window from "@/components/window"

export type WindowType = {
  id: string
  title: string
  icon: string
  component: ReactNode
  width: number
  height: number
  x: number
  y: number
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
}

type WindowsContextType = {
  windows: WindowType[]
  activeWindowId: string | null
  addWindow: (window: Omit<WindowType, "isMinimized" | "isMaximized" | "zIndex">) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  restoreWindow: (id: string) => void
  restoreMinimizedWindow: (id: string) => void
  setActiveWindow: (id: string) => void
  updateWindowPosition: (id: string, x: number, y: number) => void
  updateWindowSize: (id: string, width: number, height: number) => void
}

const WindowsContext = createContext<WindowsContextType | undefined>(undefined)

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowType[]>([])
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null)
  const [highestZIndex, setHighestZIndex] = useState(100)

  const addWindow = (window: Omit<WindowType, "isMinimized" | "isMaximized" | "zIndex">) => {
    // Check if window already exists
    const existingWindow = windows.find((w) => w.id === window.id)

    if (existingWindow) {
      // If minimized, restore it
      if (existingWindow.isMinimized) {
        setWindows(
          windows.map((w) => (w.id === window.id ? { ...w, isMinimized: false, zIndex: highestZIndex + 1 } : w)),
        )
        setHighestZIndex(highestZIndex + 1)
      }

      // Set as active window
      setActiveWindowId(window.id)
      return
    }

    // Calculate default position if not provided
    const newX = window.x ?? Math.abs(Math.random() * 600)
    const newY = window.y ?? Math.abs(Math.random() * 300)

    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)

    const newWindow: WindowType = {
      ...window,
      x: newX,
      y: newY,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZIndex,
    }

    setWindows([...windows, newWindow])
    setActiveWindowId(window.id)
  }

  const closeWindow = (id: string) => {
    setWindows(windows.filter((window) => window.id !== id))
    if (activeWindowId === id) {
      const remainingWindows = windows.filter((window) => window.id !== id)
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null)
    }
  }

  const minimizeWindow = (id: string) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, isMinimized: true } : window)))

    // Set active window to the next highest z-index window that isn't minimized
    const visibleWindows = windows.filter((w) => !w.isMinimized && w.id !== id)
    if (visibleWindows.length > 0) {
      const highestWindow = visibleWindows.reduce((prev, current) => (prev.zIndex > current.zIndex ? prev : current))
      setActiveWindowId(highestWindow.id)
    } else {
      setActiveWindowId(null)
    }
  }

  const maximizeWindow = (id: string) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, isMaximized: true } : window)))
  }

  const restoreWindow = (id: string) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, isMaximized: false } : window)))
  }

  const restoreMinimizedWindow = (id: string) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)

    setWindows(
      windows.map((window) => (window.id === id ? { ...window, isMinimized: false, zIndex: newZIndex } : window)),
    )

    setActiveWindowId(id)
  }

  const setActiveWindow = (id: string) => {
    const newZIndex = highestZIndex + 1
    setHighestZIndex(newZIndex)

    setWindows(windows.map((window) => (window.id === id ? { ...window, zIndex: newZIndex } : window)))

    setActiveWindowId(id)
  }

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, x, y } : window)))
  }

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows(windows.map((window) => (window.id === id ? { ...window, width, height } : window)))
  }

  return (
    <WindowsContext.Provider
      value={{
        windows,
        activeWindowId,
        addWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        restoreWindow,
        restoreMinimizedWindow,
        setActiveWindow,
        updateWindowPosition,
        updateWindowSize,
      }}
    >
      {children}
      {windows.map((window) => (
        <Window key={window.id} window={window} isActive={activeWindowId === window.id} />
      ))}
    </WindowsContext.Provider>
  )
}

export function useWindows() {
  const context = useContext(WindowsContext)
  if (context === undefined) {
    throw new Error("useWindows must be used within a WindowsProvider")
  }
  return context
}

