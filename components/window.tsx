"use client"

import { useState, useRef, useEffect } from "react"
import { Rnd } from "react-rnd"
import { X, Minus, Square } from "lucide-react"
import { useWindows, type WindowType } from "@/components/windows-provider"
import { cn } from "@/lib/utils"
import { on } from "events"

type WindowProps = {
  window: WindowType
  isActive: boolean
}

export default function Window({ window, isActive }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    setActiveWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindows()

  const [prevDimensions, setPrevDimensions] = useState({
    width: window.width,
    height: window.height,
    x: window.x || 50,
    y: window.y || 50,
  })

  const windowRef = useRef<Rnd>(null)

  useEffect(() => {
    if (window.isMaximized && windowRef.current) {
      windowRef.current.updatePosition({ x: 0, y: 0 })
      windowRef.current.updateSize({ width: "100%", height: "100vh" })
    }
  }, [window.isMaximized])

  if (window.isMinimized) {
    return null
  }

  const handleMaximizeRestore = () => {
    if (window.isMaximized) {
      restoreWindow(window.id)
      if (windowRef.current) {
        windowRef.current.updatePosition({ x: prevDimensions.x, y: prevDimensions.y })
        windowRef.current.updateSize({ width: prevDimensions.width, height: prevDimensions.height })
      }
    } else {
      setPrevDimensions({
        width: window.width,
        height: window.height,
        x: window.x || 50,
        y: window.y || 50,
      })
      maximizeWindow(window.id)
    }
  }

  return (
    <Rnd
      ref={windowRef}
      style={{
        zIndex: window.zIndex,
        display: window.isMinimized ? "none" : "block",
      }}
      default={{
        x: window.x || 50,
        y: window.y || 50,
        width: window.width,
        height: window.height,
      }}
      size={
        window.isMaximized
          ? { width: "100%", height: "100vh" }
          : { width: window.width, height: window.height }
      }
      position={window.isMaximized ? { x: 0, y: 0 } : { x: window.x || 50, y: window.y || 50 }}
      minWidth={300}
      minHeight={200}
      maxHeight={window.isMaximized ? "calc(100vh - 40px)" : 600}
      maxWidth={window.isMaximized ? "100%" : 700}
      bounds="parent"
      dragHandleClassName="window-drag-handle"
      onDragStop={(e, d) => {
        if (!window.isMaximized) {
          updateWindowPosition(window.id, d.x, d.y)
        }
      }}
      onResize={(e, __, ref) => {
        const width = ref.offsetWidth
        const height = ref.offsetHeight
        updateWindowSize(window.id, width, height)
      }}
      onResizeStop={(e, _, __,___, position) => { 
        if (!window.isMaximized) {
          updateWindowPosition(window.id, position.x, position.y)
        }
      }}
      disableDragging={window.isMaximized}
      enableResizing={!window.isMaximized}
      onMouseDown={() => setActiveWindow(window.id)}
    >
      <div
        className={cn(
          "flex flex-col h-full rounded-md overflow-hidden border shadow-lg",
          isActive ? "border-blue-500" : "border-gray-300",
          "bg-white",
        )}
      >
        <div
          className={cn(
            "window-drag-handle flex items-center justify-between px-2 py-1",
            isActive ? "bg-blue-600" : "bg-gray-200",
          )}
        >
          <div className="flex items-center gap-2">
            <img src={window.icon || "/placeholder.svg"} alt="" className="w-4 h-4" />
            <span className={cn("text-sm font-medium", isActive ? "text-white" : "text-gray-700")}>{window.title}</span>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => minimizeWindow(window.id)}
              className={cn(
                "p-1 hover:bg-opacity-20 rounded window-control",
                isActive ? "hover:bg-white" : "hover:bg-gray-300",
              )}
            >
              <Minus className={cn("w-3 h-3", isActive ? "text-white" : "text-gray-700")} />
            </button>
            <button
              onClick={handleMaximizeRestore}
              className={cn(
                "p-1 hover:bg-opacity-20 rounded window-control",
                isActive ? "hover:bg-white" : "hover:bg-gray-300",
              )}
            >
              <Square className={cn("w-3 h-3", isActive ? "text-white" : "text-gray-700")} />
            </button>
            <button
              onClick={() => closeWindow(window.id)}
              className={cn(
                "p-1 hover:bg-opacity-20 rounded window-control",
                isActive ? "hover:bg-red-500" : "hover:bg-gray-300",
              )}
            >
              <X className={cn("w-3 h-3", isActive ? "text-white" : "text-gray-700")} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-2 bg-white">{window.component}</div>
      </div>
    </Rnd>
  )
}

