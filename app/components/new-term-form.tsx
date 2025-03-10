"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { v4 as uuid } from "uuid"
import { createTerm } from "@/app/actions"
import { FormControl } from "@/app/components/form-control"
import { Button } from "@/app/components/button"
import { ibm } from "@/lib/fonts"

export const NewTermForm = ({
  userId,
  deckId,
  slug,
  handleCancel,
}: {
  userId: number
  deckId: number
  slug: string
  handleCancel: () => void
}) => {
  const [definitions, setDefinitions] = React.useState<
    { id: string; text: string }[]
  >([
    {
      id: uuid(),
      text: "",
    },
  ])
  const [examples, setExamples] = React.useState<
    { id: string; text: string }[]
  >([
    {
      id: uuid(),
      text: "",
    },
  ])

  const handleClickAddDefinition = () => {
    setDefinitions((prev) => [...prev, { id: uuid(), text: "" }])
  }

  const handleClickRemoveDefinition = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setDefinitions((prev) =>
      prev.filter((d) => d.id !== (event.target as HTMLButtonElement).id)
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
        (example) => example.id !== (event.target as HTMLButtonElement).id
      )
    )
  }

  const createTermWithDeckId = createTerm.bind(null, userId, deckId, slug)

  return (
    <form
      action={createTermWithDeckId}
      className="bg-white rounded-lg mb-4 shadow-card"
    >
      <div>
        <h3
          className={`text-lg font-bold pt-8 pb-4 px-12 border-b-2 border-neutral-100 ${ibm.className}`}
        >
          New Term
        </h3>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-4 pb-8 px-12">
          <div className="mb-6">
            <label htmlFor="term" className="font-bold text-neutral-600 mb-2">
              New Term
            </label>
            <input type="text" id="term" name="term" />
          </div>
          <div className="mb-6">
            {definitions.map((d: { id: string; text: string }, i: number) => {
              const { id } = d
              return (
                <FormControl
                  key={id}
                  htmlFor={id}
                  name="definitions"
                  labelText={`Definition ${i + 1}`}
                  type="text"
                  className="mb-4"
                  hasBtn={i > 0}
                  btnId={id}
                  btnLabel="Remove"
                  onClick={handleClickRemoveDefinition}
                />
              )
            })}
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
              (example: { id: string; text: string }, i: number) => {
                const { id } = example
                return (
                  <FormControl
                    key={id}
                    htmlFor={id}
                    name="examples"
                    labelText={`Example ${i + 1}`}
                    type="text"
                    className="mb-4"
                    hasBtn={i > 0}
                    btnId={id}
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
