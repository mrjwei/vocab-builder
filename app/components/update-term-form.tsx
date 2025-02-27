"use client"

import React from "react"
import { v4 as uuid } from "uuid"
import { updateTerm } from "@/app/actions"
import { FormControl } from "@/app/components/form-control"
import { Term } from "@prisma/client"

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
    <form action={updateTermWithData}>
      <div>
        <div>
          <label htmlFor="term">Term</label>
          <input type="text" id="term" name="term" defaultValue={term.text} />
        </div>
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
                hasBtn={i > 0}
                btnId={String(id)}
                btnLabel="Remove"
                onClick={handleClickRemoveDefinition}
              />
            )
          }
        )}
        <button type="button" onClick={handleClickAddDefinition}>
          New Definition
        </button>
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
                hasBtn={i > 0}
                btnId={String(id)}
                btnLabel="Remove"
                onClick={handleClickRemoveExample}
              />
            )
          }
        )}
        <button type="button" onClick={handleClickAddExample}>
          New Example
        </button>
        <div>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  )
}
