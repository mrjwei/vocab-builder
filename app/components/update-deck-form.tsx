"use client"

import React from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
import { Button } from "@/app/components/button"
import { Deck } from "@prisma/client"
import { ibm } from "@/lib/fonts"

export const UpdateDeckForm = ({
  deck,
  handleCancel,
}: {
  deck: Deck
  handleCancel: () => void
}) => {
  return (
    <form className="bg-white rounded-lg mb-4 shadow-card">
      <div>
        <h3
          className={`text-lg font-bold pt-8 pb-4 px-12 border-b-2 border-neutral-100 ${ibm.className}`}
        >
          Edit Deck
        </h3>
        <div className="w-full md:w-1/2 xl:w-1/3 pt-4 pb-8 px-12">
          <div className="mb-6">
            <label
              htmlFor="deckName"
              className="font-bold text-neutral-600 mb-2"
            >
              Deck Name
            </label>
            <input
              type="text"
              id="deckName"
              name="deckName"
              defaultValue={deck.name}
            />
          </div>
          <div className="mb-6">
            {deck.categories.map((c: { id: number; name: string }) => {
              const { id, name } = c
              return <div key={id}>{name}</div>
            })}
            <Button
              type="button"
              className="flex items-center gap-2 px-0 text-sky-600 hover:bg-sky-100 transition-colors ease-in-out duration-300 -translate-y-2"
              onClick={() => {}}
            >
              <PlusIcon className="size-4" />
              <span>Add to Categories</span>
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
