"use client"
import React from "react"

export const usePopupMenu = () => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false)
  const menuRef = React.useRef<HTMLUListElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuVisible(false)
      }
    }
    if (isMenuVisible) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuVisible])

  return { isMenuVisible, setIsMenuVisible, menuRef }
}
