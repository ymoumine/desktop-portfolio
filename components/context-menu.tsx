"use client"

import { useEffect, useRef } from "react"

type ContextMenuOption = {
  label: string
  onClick: () => void
  disabled?: boolean
}

type ContextMenuProps = {
  x: number
  y: number
  onClose: () => void
  options: ContextMenuOption[]
}

export default function ContextMenu({ x, y, onClose, options }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Adjust position if menu would go off screen
  const adjustedPosition = {
    x: Math.min(x, window.innerWidth - (menuRef.current?.offsetWidth || 200) - 10),
    y: Math.min(y, window.innerHeight - (menuRef.current?.offsetHeight || 200) - 10),
  }

  return (
    <div
      ref={menuRef}
      className="absolute bg-white border border-gray-200 rounded shadow-lg z-[1001] min-w-[180px]"
      style={{ left: adjustedPosition.x, top: adjustedPosition.y }}
    >
      <div className="py-1">
        {options.map((option, index) => (
          <button
            key={index}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:hover:bg-white"
            onClick={() => {
              option.onClick()
              onClose()
            }}
            disabled={option.disabled}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

