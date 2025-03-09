"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/app/components/button"

type TProps =
  | {
      label: string
      isLink: true
      href: string
    }
  | {
      label: string
      isLink: false
      onClick?:
        | ((e: React.MouseEvent<HTMLButtonElement>) => void)
        | (() => void)
    }

export function PopupMenuItem(props: TProps) {
  const { label, isLink } = props
  return (
    <li>
      {isLink ? (
        <Link
          href={props.href}
          className="w-full text-left hover:bg-neutral-100 transition-colors ease-in-out duration-300"
        >
          {label}
        </Link>
      ) : (
        <Button
          type="button"
          className="w-full text-left hover:bg-neutral-100 transition-colors ease-in-out duration-300"
          onClick={props.onClick}
        >
          {label}
        </Button>
      )}
    </li>
  )
}
