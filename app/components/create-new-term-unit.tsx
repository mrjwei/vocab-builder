"use client"

import React from "react"
import { NewTermForm } from "@/app/components/new-term-form"
import { NewItemButton } from "@/app/components/new-item-button"

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
        <NewItemButton label="New Term" onClick={() => setIsVisible(true)} />
      )}
    </div>
  )
}
