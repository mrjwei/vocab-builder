import React from "react"
import clsx from "clsx"

export const Card = ({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={clsx("bg-white rounded-lg shadow-card", className)}>
      <h3 className="text-xl font-semibold px-6 py-2 border-b-2 border-neutral-100">
        {title}
      </h3>
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}
