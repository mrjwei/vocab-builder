"use client"
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/components/button"
import { PopupMenu } from "@/app/components/popup-menu"
import { usePopupMenu } from "@/app/hooks"

export const OptionMenu = ({ children }: { children?: React.ReactNode }) => {
  const { isMenuVisible, setIsMenuVisible, menuRef } = usePopupMenu()
  return (
    <>
      <Button type="button" onClick={() => setIsMenuVisible(!isMenuVisible)}>
        <EllipsisHorizontalCircleIcon className="size-6" />
      </Button>
      {isMenuVisible && (
        <PopupMenu ref={menuRef} className="z-50">
          {children}
        </PopupMenu>
      )}
    </>
  )
}
