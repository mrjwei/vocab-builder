"use client"

import React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { Definition, Term } from "@prisma/client"
import { UpdateTermForm } from "@/app/components/update-term-form"
import { deleteTerm } from "@/app/actions"

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
  const deleteTermWithData = deleteTerm.bind(null, term.id, deckId, slug)
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
          <div className="flex">
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <form action={deleteTermWithData}>
              <button type="submit">Delete</button>
            </form>
          </div>
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
