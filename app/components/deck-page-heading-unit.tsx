"use client"
import React from "react"
import { redirect } from "next/navigation"
import { Category, Deck } from "@prisma/client"
import { PageHeading } from "@/app/components/page-heading"
import { OptionMenu } from "@/app/components/option-menu"
import { PopupMenuItem } from "@/app/components/popup-menu-item"
import { UpdateDeckForm } from "@/app/components/update-deck-form"
import { capitalize } from "@/lib/utils"
import { CategoryTag } from "@/app/components/category-tag"
import { deleteDeck } from "@/app/actions"

export const DeckPageHeadingUnit = ({ deck }: { deck: Deck }) => {
  const [isEditing, setIsEditing] = React.useState(false)

  const handleClickDelete = () => {
    deleteDeck(deck.id)
    redirect("/decks")
  }

  return isEditing ? (
    <UpdateDeckForm deck={deck} handleCancel={() => setIsEditing(false)} />
  ) : (
    <div>
      <PageHeading title={capitalize(deck.name)}>
        <OptionMenu>
          <PopupMenuItem
            label="Edit"
            isLink={false}
            onClick={() => setIsEditing(true)}
          />
          <PopupMenuItem
            label="Delete"
            isLink={false}
            onClick={handleClickDelete}
          />
        </OptionMenu>
      </PageHeading>
      <ul className="mt-2">
        {deck.categories.map((c: Category) => {
          const { id } = c
          return (
            <li key={id}>
              <CategoryTag category={c} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
