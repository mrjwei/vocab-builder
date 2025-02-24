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
