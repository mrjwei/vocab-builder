"use client"
import React from "react"
import clsx from "clsx"

export function PopupMenu({
  ref,
  children,
  className,
}: {
  ref: React.RefObject<HTMLUListElement | null>
  children: React.ReactNode
  className?: string
}) {
  return (
    <ul
      ref={ref}
      className={clsx(
        "absolute top-full right-0 -translate-x-2 -translate-y-2 bg-white rounded shadow-card p-2",
        className
      )}
    >
      {children}
    </ul>
  )
}
