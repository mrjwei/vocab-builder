"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { NewTermForm } from "@/app/components/new-term-form"
import { Button } from "@/app/components/button"

type TProps = {
  userId: number
  deckId: number
  slug: string
}

export const CreateNewTermUnit = ({ userId, deckId, slug }: TProps) => {
  const [isVisible, setIsVisible] = React.useState(false)
  return (
    <div>
      {isVisible ? (
        <NewTermForm
          userId={userId}
          deckId={deckId}
          slug={slug}
          handleCancel={() => setIsVisible(false)}
        />
      ) : (
        <Button
          type="button"
          className="flex items-center gap-2 px-0 mt-8 bg-neutral-800 text-white hover:bg-neutral-600 transition-colors ease-in-out duration-300 -translate-y-2"
          onClick={() => setIsVisible(true)}
        >
          <PlusIcon className="size-4" />
          <span>New Term</span>
        </Button>
      )}
    </div>
  )
}
