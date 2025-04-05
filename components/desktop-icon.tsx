"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

type DesktopIconProps = {
  icon: string
  label: string
  onClick: () => void
  position: {
    col: number
    row: number
  }
  iconType: string
}

export default function DesktopIcon({ icon, label, onClick, position, iconType }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSelected(true)
  }

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick()
    setIsSelected(false)
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-2 rounded cursor-pointer",
        "col-start-" + position.col,
        "row-start-" + position.row,
        isSelected ? "bg-blue-500/30" : "hover:bg-white/10",
      )}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      data-icon={iconType}
    >
      <div className="w-12 h-12 flex items-center justify-center mb-1">
        <img src={`/placeholder.svg?height=40&width=40`} alt={label} className="w-10 h-10 object-contain" />
      </div>
      <span className="text-white text-xs font-medium text-center px-1 py-0.5 bg-black/40 rounded">{label}</span>
    </div>
  )
}

