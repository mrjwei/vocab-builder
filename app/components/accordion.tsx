"use client"

import React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { Definition, Term } from "@prisma/client"
import { UpdateTermForm } from "./update-term-form"

export const Accordion = ({
  term,
  deckId,
  slug,
}: {
  term: Term
  deckId: number
  slug: string
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const { text, definitions, examples } = term
  return isEditing ? (
    <UpdateTermForm
      term={term}
      deckId={deckId}
      slug={slug}
      handleCancel={() => setIsEditing(false)}
    />
  ) : (
    <div>
      <div className="w-full flex justify-between items-center">
        <button
          type="button"
          className="flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronUpIcon className="size-5" />
          ) : (
            <ChevronDownIcon className="size-5" />
          )}
          <span>{text}</span>
        </button>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
      {isOpen && (
        <div>
          <div>
            <div>Definitions</div>
            <ul>
              {definitions.map((d: Definition) => {
                return <li key={d.id}>{d.text}</li>
              })}
            </ul>
          </div>
          <div>
            <div>Examples</div>
            <ul>
              {examples.map((d: Definition) => {
                return <li key={d.id}>{d.text}</li>
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
