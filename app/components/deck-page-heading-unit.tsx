"use client"
import React from "react"
import { Category, Deck } from "@prisma/client"
import { PageHeading } from "@/app/components/page-heading"
import { OptionMenu } from "@/app/components/option-menu"
import { PopupMenuItem } from "@/app/components/popup-menu-item"
import { UpdateDeckForm } from "@/app/components/update-deck-form"
import { capitalize } from "@/lib/utils"
import { CategoryTag } from "@/app/components/category-tag"

export const DeckPageHeadingUnit = ({ deck }: { deck: Deck }) => {
  const [isEditing, setIsEditing] = React.useState(false)

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
          <PopupMenuItem label="Delete" isLink={false} onClick={() => {}} />
        </OptionMenu>
      </PageHeading>
      <ul>
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
