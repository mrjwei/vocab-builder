"use client"
import React from "react"
import { Button } from "@/app/components/button"
import { NewItemButton } from "@/app/components/new-item-button"
import { FormControl } from "@/app/components/form-control"
import { ibm } from "@/lib/fonts"
import { createDeck } from "@/app/actions"

export const CreateNewDeckUnit = ({ userId }: { userId: number }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false)

  const handleSave = (formData: FormData) => {
    createDeck(userId, formData)
    setIsModalVisible(false)
  }
  return (
    <>
      <NewItemButton label="New Deck" onClick={() => setIsModalVisible(true)} />
      {isModalVisible && (
        <div className="w-full h-full px-8 bg-neutral-800/50 absolute top-0 left-0 flex items-center justify-center">
          <div className="w-full bg-white rounded-lg">
            <h3
              className={`bg-neutral-100 py-4 px-8 rounded-t-lg text-xl font-bold ${ibm.className}`}
            >
              New Deck
            </h3>
            <form action={handleSave}>
              <FormControl
                htmlFor="deckName"
                name="deckName"
                labelText="Deck Name"
                type="text"
                hasBtn={false}
                className="pt-4 pb-2 px-8"
              />
              <div className="pt-4 pb-8 px-8 flex justify-end gap-4">
                <Button
                  type="submit"
                  className="bg-neutral-800 text-white hover:bg-neutral-600 transition-colors ease-in-out duration-300"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="border-2 border-neutral-600 text-neutral-600 hover:border-neutral-400 hover:text-neutral-400 transition-colors ease-in-out duration-300"
                  onClick={() => setIsModalVisible(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
