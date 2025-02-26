"use client"

import React from "react"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { Definition, Term } from "@prisma/client"

export const Accordion = ({ term }: { term: Term }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { text, definitions, examples } = term
  return (
    <div>
      <button
        type="button"
        className="w-full flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{text}</span>
        {isOpen ? (
          <ChevronUpIcon className="size-5" />
        ) : (
          <ChevronDownIcon className="size-5" />
        )}
      </button>
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
