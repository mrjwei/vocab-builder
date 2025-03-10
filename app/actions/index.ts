"use server"
import { unstable_noStore as noStore, revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"

export const createTerm = async (
  userId: number,
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
      userId,
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
  userId: number,
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
  await createTerm(userId, deckId, slug, formData)
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

export const createDeck = async (userId: number, formData: FormData) => {
  noStore()
  const name = formData.get("deckName") as string
  await prisma.deck.create({
    data: {
      userId,
      name,
    },
  })
  revalidatePath(`/decks`)
}

export const updateDeck = async (deckId: number, formData: FormData) => {
  noStore()
  const name = formData.get("name") as string
  await prisma.deck.update({
    where: {
      id: deckId,
    },
    data: {
      name,
    },
  })
  revalidatePath(`/decks`)
  revalidatePath(`/`)
}

export const deleteDeck = async (deckId: number) => {
  noStore()
  await prisma.deck.delete({
    where: {
      id: deckId,
    },
  })
  revalidatePath(`/decks`)
  revalidatePath(`/`)
}

export const createUser = async (formData: FormData) => {
  noStore()
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  })
  revalidatePath(`/`)
  redirect("/login")
}
