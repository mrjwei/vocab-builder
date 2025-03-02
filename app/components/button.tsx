import React from "react"
import clsx from "clsx"

type TProps = {
  type: "button" | "submit"
  size?: "normal" | "small"
  className?: string
  id?: string
  onClick?: ((e: React.MouseEvent<HTMLButtonElement>) => void) | (() => void)
  children: React.ReactNode
}

export const Button = ({
  type,
  size = "normal",
  className,
  id,
  onClick,
  children,
}: TProps) => {
  return (
    <button
      type={type}
      className={clsx(
        "block font-medium",
        {
          "py-2 px-4 rounded-md": size === "normal",
          "p-1 px-2 rounded text-sm": size === "small",
        },
        className
      )}
      id={id}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
