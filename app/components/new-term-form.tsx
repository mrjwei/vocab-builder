"use client"

import React from "react"
import { v4 as uuid } from "uuid"
import { createTerm } from "@/app/actions"
import { FormControl } from "@/app/components/form-control"

export const NewTermForm = ({
  deckId,
  slug,
}: {
  deckId: number
  slug: string
}) => {
  const [isFormVisible, setIsFormVisible] = React.useState(false)

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

  const createTermWithDeckId = createTerm.bind(null, deckId, slug)

  return (
    <form action={createTermWithDeckId}>
      {isFormVisible ? (
        <div>
          <div>
            <label htmlFor="term">Term</label>
            <input type="text" id="term" name="term" />
          </div>
          {definitions.map((d: { id: string; text: string }, i: number) => {
            const { id } = d
            return (
              <FormControl
                key={id}
                htmlFor={id}
                name="definitions"
                labelText={`Definition ${i + 1}`}
                type="text"
                hasBtn={i > 0}
                btnId={id}
                btnLabel="Remove"
                onClick={handleClickRemoveDefinition}
              />
            )
          })}
          <button type="button" onClick={handleClickAddDefinition}>
            New Definition
          </button>
          {examples.map((example: { id: string; text: string }, i: number) => {
            const { id } = example
            return (
              <FormControl
                key={id}
                htmlFor={id}
                name="examples"
                labelText={`Example ${i + 1}`}
                type="text"
                hasBtn={i > 0}
                btnId={id}
                btnLabel="Remove"
                onClick={handleClickRemoveExample}
              />
            )
          })}
          <button type="button" onClick={handleClickAddExample}>
            New Example
          </button>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsFormVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button type="button" onClick={() => setIsFormVisible(true)}>
          Add New
        </button>
      )}
    </form>
  )
}
