"use client"
import React from "react"
import Link from "next/link"
import {
  UserCircleIcon as UserCircleOutlineIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline"
import { UserCircleIcon as UserCircleSolidIcon } from "@heroicons/react/24/solid"
import { Button } from "@/app/components/button"
import { PopupMenu } from "@/app/components/popup-menu"
import { LogoutButton } from "@/app/components/logout-button"
import { usePopupMenu } from "@/app/hooks"

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Decks",
    href: "/decks",
  },
]

export const Header = () => {
  const { isMenuVisible, setIsMenuVisible, menuRef } = usePopupMenu()
  return (
    <header className="bg-neutral-800 text-white py-4 px-8">
      <div className="container flex items-center justify-between relative">
        <h1>
          <Link href="/">VocabBuilder</Link>
        </h1>
        <nav>
          <ul className="flex items-center gap-8">
            {navItems.map((item) => {
              const { label, href } = item
              return (
                <li key={label}>
                  <Link
                    href={href}
                    className="p-2 rounded hover:bg-neutral-600 transition-colors ease-in-out duration-300"
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li>
              <Button
                type="button"
                className="flex items-center gap-2 p-2 rounded hover:bg-neutral-600 transition-colors ease-in-out duration-300"
                onClick={() => setIsMenuVisible(!isMenuVisible)}
              >
                {isMenuVisible ? (
                  <>
                    <UserCircleSolidIcon className="size-6" />
                    <ChevronUpIcon className="size-4 translate-y-[1px]" />
                  </>
                ) : (
                  <>
                    <UserCircleOutlineIcon className="size-6" />
                    <ChevronDownIcon className="size-4 translate-y-[1px]" />
                  </>
                )}
              </Button>
              {isMenuVisible && (
                <PopupMenu
                  ref={menuRef}
                  className="!translate-x-0 !translate-y-2"
                >
                  <li>
                    <LogoutButton className="w-full text-neutral-800 text-left hover:bg-neutral-100 transition-colors ease-in-out duration-300" />
                  </li>
                </PopupMenu>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
