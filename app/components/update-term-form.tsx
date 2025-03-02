"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { v4 as uuid } from "uuid"
import { updateTerm } from "@/app/actions"
import { FormControl } from "@/app/components/form-control"
import { Button } from "@/app/components/button"
import { Term } from "@prisma/client"
import { ibm } from "@/lib/fonts"

export const UpdateTermForm = ({
  term,
  deckId,
  slug,
  handleCancel,
}: {
  term: Term
  deckId: number
  slug: string
  handleCancel: () => void
}) => {
  const existingDefinitions = term.definitions.map(
    (d: { id: number; text: string }) => ({
      id: d.id,
      text: d.text,
    })
  )
  const existingExamples = term.examples.map(
    (example: { id: number; text: string }) => ({
      id: example.id,
      text: example.text,
    })
  )
  const [definitions, setDefinitions] = React.useState<
    { id: string | number; text: string }[]
  >(
    existingDefinitions.length > 0
      ? existingDefinitions
      : [
          {
            id: uuid(),
            text: "",
          },
        ]
  )
  const [examples, setExamples] = React.useState<
    { id: string | number; text: string }[]
  >(
    existingExamples.length > 0
      ? existingExamples
      : [
          {
            id: uuid(),
            text: "",
          },
        ]
  )

  const handleClickAddDefinition = () => {
    setDefinitions((prev) => [...prev, { id: uuid(), text: "" }])
  }

  const handleClickRemoveDefinition = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDefinitions((prev) =>
      prev.filter(
        (d) => d.id !== Number((event.target as HTMLButtonElement).id)
      )
    )
  }

  const handleClickAddExample = () => {
    setExamples((prev) => [...prev, { id: uuid(), text: "" }])
  }

  const handleClickRemoveExample = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setExamples((prev) =>
      prev.filter(
        (example) =>
          example.id !== Number((event.target as HTMLButtonElement).id)
      )
    )
  }

  const updateTermWithData = updateTerm.bind(null, term.id, deckId, slug)

  return (
    <form
      action={updateTermWithData}
      className="bg-white rounded-lg mb-4 shadow-card"
    >
      <div>
        <h3
          className={`text-lg font-bold pt-8 pb-4 px-12 border-b-2 border-neutral-100 ${ibm.className}`}
        >
          Edit Term
        </h3>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-4 pb-8 px-12">
          <div className="mb-6">
            <label htmlFor="term" className="font-bold text-neutral-600 mb-2">
              Term
            </label>
            <input type="text" id="term" name="term" defaultValue={term.text} />
          </div>
          <div className="mb-6">
            {definitions.map(
              (d: { id: number | string; text: string }, i: number) => {
                const { id, text } = d
                return (
                  <FormControl
                    key={id}
                    htmlFor={String(id)}
                    name="definitions"
                    labelText={`Definition ${i + 1}`}
                    type="text"
                    defaultValue={text}
                    className="mb-4"
                    hasBtn={i > 0}
                    btnId={String(id)}
                    btnLabel="Remove"
                    onClick={handleClickRemoveDefinition}
                  />
                )
              }
            )}
            <Button
              type="button"
              className="flex items-center gap-2 px-0 text-sky-600 hover:bg-sky-100 transition-colors ease-in-out duration-300 -translate-y-2"
              onClick={handleClickAddDefinition}
            >
              <PlusIcon className="size-4" />
              <span>New Definition</span>
            </Button>
          </div>
          <div className="mb-6">
            {examples.map(
              (example: { id: string | number; text: string }, i: number) => {
                const { id, text } = example
                return (
                  <FormControl
                    key={id}
                    htmlFor={String(id)}
                    name="examples"
                    labelText={`Example ${i + 1}`}
                    type="text"
                    defaultValue={text}
                    className="mb-4"
                    hasBtn={i > 0}
                    btnId={String(id)}
                    btnLabel="Remove"
                    onClick={handleClickRemoveExample}
                  />
                )
              }
            )}
            <Button
              type="button"
              className="flex items-center gap-2 px-0 text-sky-600 hover:bg-sky-100 transition-colors ease-in-out duration-300 -translate-y-2"
              onClick={handleClickAddExample}
            >
              <PlusIcon className="size-4" />
              <span>New Example</span>
            </Button>
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-neutral-800 text-white hover:bg-neutral-600 transition-colors ease-in-out duration-300"
            >
              Save
            </Button>
            <Button
              type="button"
              className="border-2 border-neutral-600 text-neutral-600 hover:border-neutral-400 hover:text-neutral-400 transition-colors ease-in-out duration-300"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
