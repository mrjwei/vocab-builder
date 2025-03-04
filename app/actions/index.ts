"use server"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"

export const createTerm = async (
  deckId: number,
  slug: string,
  formData: FormData
) => {
  noStore()
  const text = formData.get("term") as string
  const definitions = formData.getAll("definitions") as string[]
  const examples = formData.getAll("examples") as string[]
  await prisma.term.create({
    data: {
      text,
      definitions: {
        create: definitions.map((d) => ({
          text: d,
        })),
      },
      examples: {
        create: examples.map((e) => ({
          text: e,
        })),
      },
      deckId,
    },
    include: {
      definitions: true,
      examples: true,
    },
  })
  revalidatePath(`/decks/${deckId}/${slug}`)
}

export const updateTerm = async (
  termId: number,
  deckId: number,
  slug: string,
  formData: FormData
) => {
  noStore()
  await prisma.term.delete({
    where: {
      id: termId,
    },
  })
  await createTerm(deckId, slug, formData)
  revalidatePath(`/decks/${deckId}/${slug}`)
}

export const deleteTerm = async (
  termId: number,
  deckId: number,
  slug: string
) => {
  await prisma.term.delete({
    where: {
      id: termId,
    },
  })
  revalidatePath(`/decks/${deckId}/${slug}`)
}

export const createDeck = async (formData: FormData) => {
  noStore()
  const name = formData.get("deckName") as string
  await prisma.deck.create({
    data: {
      name,
    },
  })
  revalidatePath(`/decks`)
}
