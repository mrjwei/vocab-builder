"use client"

import React from "react"
import Link from "next/link"
import clsx from "clsx"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/components/button"
import { PopupMenu } from "@/app/components/popup-menu"
import { PopupMenuItem } from "@/app/components/popup-menu-item"
import { updateDeck, deleteDeck } from "@/app/actions"
import { usePopupMenu } from "@/app/hooks"

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
  const [isEditing, setIsEditing] = React.useState(false)
  const { isMenuVisible, setIsMenuVisible, menuRef } = usePopupMenu()

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
          <PopupMenu ref={menuRef}>
            <PopupMenuItem
              label="Edit"
              isLink={false}
              onClick={handleClickEdit}
            />
            <PopupMenuItem
              label="Delete"
              isLink={false}
              onClick={handleClickDelete}
            />
          </PopupMenu>
        )}
      </h3>
      <div className="px-6 py-4">{children}</div>
    </div>
  )
}
