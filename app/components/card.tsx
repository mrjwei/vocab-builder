"use client"

import React from "react"
import Link from "next/link"
import clsx from "clsx"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/components/button"
import { updateDeck, deleteDeck } from "@/app/actions"

export const Card = ({
  title,
  deckId,
  href,
  children,
  className,
}: {
  title: string
  deckId: number
  href: string
  children: React.ReactNode
  className?: string
}) => {
  const [isMenuVisible, setIsMenuVisible] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)

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

  const handleClickEdit = () => {
    setIsEditing(true)
    setIsMenuVisible(false)
  }

  const handleClickDelete = () => {
    deleteDeck(deckId)
    setIsMenuVisible(false)
  }

  const handleSubmit = (formData: FormData) => {
    updateDeck(deckId, formData)
    setIsEditing(false)
    setIsMenuVisible(false)
  }

  const handleClickCancel = () => {
    setIsEditing(false)
    setIsMenuVisible(false)
  }

  return (
    <div className={clsx("bg-white rounded-lg shadow-card", className)}>
      <h3 className="px-6 py-2 border-b-2 border-neutral-100 relative min-h-[58px] flex flex-col justify-center">
        {isEditing ? (
          <form action={handleSubmit} className="flex items-center">
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={title}
              className="block"
            />
            <div className="flex">
              <Button
                type="submit"
                size="small"
                className="translate-x-2 text-sky-600 hover:bg-sky-100 transition-colors ease-in-out duration-300"
              >
                Save
              </Button>
              <Button
                type="submit"
                size="small"
                className="translate-x-2 text-neutral-600 hover:bg-neutral-100 transition-colors ease-in-out duration-300"
                onClick={handleClickCancel}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex items-center justify-between text-xl font-semibold">
            <Link href={href}>{title}</Link>
            <Button
              type="button"
              size="small"
              className="translate-x-2 text-neutral-400"
              onClick={() => setIsMenuVisible(!isMenuVisible)}
            >
              <EllipsisHorizontalIcon className="size-8" />
            </Button>
          </div>
        )}
        {isMenuVisible && (
          <ul
            ref={menuRef}
            className="absolute top-full right-0 -translate-x-2 -translate-y-2 bg-white rounded shadow-card p-2"
          >
            <li>
              <Button
                type="button"
                onClick={handleClickEdit}
                className="w-full text-left hover:bg-neutral-100 transition-colors ease-in-out duration-300"
              >
                Edit
              </Button>
              <Button
                type="button"
                onClick={handleClickDelete}
                className="w-full text-left hover:bg-neutral-100 transition-colors ease-in-out duration-300"
              >
                Delete
              </Button>
            </li>
          </ul>
        )}
      </h3>
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}
