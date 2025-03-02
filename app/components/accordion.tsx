"use client"

import React from "react"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { Definition, Term } from "@prisma/client"
import { UpdateTermForm } from "@/app/components/update-term-form"
import { deleteTerm } from "@/app/actions"
import { capitalize } from "@/lib/utils"
import clsx from "clsx"

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
    <div className="bg-white shadow-card rounded-lg mb-4">
      <div
        className={clsx("w-full flex justify-between items-center p-4", {
          "border-b-2 border-neutral-100": isOpen,
        })}
      >
        <button
          type="button"
          className="flex items-center gap-4"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronUpIcon className="size-4 text-neutral-400 translate-y-[1px]" />
          ) : (
            <ChevronDownIcon className="size-4 text-neutral-400 translate-y-[1px]" />
          )}
          <span className="font-semibold">{text}</span>
        </button>
        {!isEditing && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-1"
              onClick={() => setIsEditing(true)}
            >
              <PencilIcon className="size-4 text-neutral-600" />
            </button>
            <form action={deleteTermWithData}>
              <button type="submit" className="p-1">
                <TrashIcon className="size-4 text-neutral-600 translate-y-[2px]" />
              </button>
            </form>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="py-4 px-12">
          <div className="mb-2">
            <h4 className="font-bold text-neutral-600">Definitions</h4>
            <ul>
              {definitions.map((d: Definition, i: number) => {
                return (
                  <li key={d.id}>
                    {definitions.length > 1
                      ? `${i + 1}. ${capitalize(d.text)}`
                      : `${capitalize(d.text)}`}
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="">
            <h4 className="font-bold text-neutral-600">Examples</h4>
            <ul>
              {examples.map((example: Definition, i: number) => {
                return (
                  <li key={example.id}>
                    {examples.length > 1
                      ? `${i + 1}. ${capitalize(example.text)}`
                      : `${capitalize(example.text)}`}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
