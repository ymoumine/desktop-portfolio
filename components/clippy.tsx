"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { X } from "lucide-react"

type ClippyMessage = {
  text: string
  duration: number
}

const messages: ClippyMessage[] = [
  // show messages for 5 seconds each
  { text: "Hi there! I'm Clippy 2.0. Need help with anything?", duration: 5000 },
  { text: "Want to see my projects? Double-click on the Projects icon!", duration: 5000 },
  { text: "You can download my resume from the Resume icon.", duration: 5000 },
  { text: "Try right-clicking on the desktop for more options!", duration: 5000 },
  { text: "Check out my GitHub by clicking on the GitHub icon.", duration: 5000 },
  { text: "Did you know? You can resize and move windows just like in a real OS!", duration: 6000 },
]

export default function Clippy() {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 200, y: 250 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [currentMessage, setCurrentMessage] = useState<ClippyMessage | null>(messages[0])
  const [showMessage, setShowMessage] = useState(true)
  const [messageIndex, setMessageIndex] = useState(1)

  useEffect(() => {
    if (!visible) return

    const messageInterval = setInterval(() => {
      if (!showMessage) {
        setCurrentMessage(messages[messageIndex])
        setShowMessage(true)
        setMessageIndex((messageIndex + 1) % messages.length)
      }
    }, 10) // Show a new message every 10 seconds

    return () => clearInterval(messageInterval)
  }, [visible, showMessage])

  useEffect(() => {
    if (!currentMessage || !showMessage) return

    const timer = setTimeout(() => {
      setShowMessage(false)
    }, currentMessage.duration)

    return () => clearTimeout(timer)
  }, [currentMessage, showMessage])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  if (!visible) return null

  // Add these state variables to track viewport dimensions
const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
const [elementSize, setElementSize] = useState({ width: 0, height: 0 });
const elementRef = useRef<HTMLDivElement>(null);

// Add this effect to update viewport dimensions on resize
useEffect(() => {
  const handleResize = () => {
    setViewportWidth(window.innerWidth);
    setViewportHeight(window.innerHeight);
  };
  
  // Measure the element's size
  if (elementRef.current) {
    const rect = elementRef.current.getBoundingClientRect();
    setElementSize({ width: rect.width, height: rect.height });
  }
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Update your mouse move handler
const handleMouseMove = useCallback((e:any) => {
  if (isDragging) {
    // Calculate new position
    let newX = e.clientX - dragOffset.x;
    let newY = e.clientY - dragOffset.y;
    
    // Constrain position to viewport boundaries
    newX = Math.max(0, Math.min(newX, viewportWidth - elementSize.width));
    newY = Math.max(0, Math.min(newY, viewportHeight - elementSize.height));
    
    setPosition({ x: newX, y: newY });
  }
}, [isDragging, dragOffset, viewportWidth, viewportHeight, elementSize]);


return (
// Component JSX
<div className="relative">
  <div 
    ref={elementRef}
    className="absolute z-[1000]" 
    style={{ left: `${position.x}px`, top: `${position.y}px` }}
  >
    <div className="">
      <div className="w-16 h-16 cursor-move" onMouseDown={handleMouseDown}>
        <img src="/icons/clippy.png" alt="Clippy" className="w-full h-full object-contain" />
      </div>

      <button
        className="absolute top-0 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
        onClick={() => setVisible(false)}
      >
        <X className="w-3 h-3 text-white" />
      </button>

      {showMessage && currentMessage && (
        <div className="absolute right-0 top-0 w-64 sm:w-80 md:w-96 bg-yellow-100 border border-yellow-300 rounded-md p-3 shadow-lg transform -translate-x-1/2 translate-y-[-50%]">
          <div className="text-sm text-gray-800">{currentMessage.text}</div>
          <div className="absolute left-full top-4 w-0 h-0 border-t-[8px] border-t-transparent border-l-[8px] border-l-yellow-100 border-b-[8px] border-b-transparent"></div>
        </div>
      )}
    </div>
  </div>
</div>
)}