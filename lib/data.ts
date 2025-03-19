import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma"

export const allCategories = async (userId: number) => {
  const categories = await prisma.category.findMany({
    where: {
      userId,
    },
    include: {
      decks: {
        include: {
          terms: true,
        },
      },
    },
  })
  return categories
}

export const allDecks = async (userId: number) => {
  const decks = await prisma.deck.findMany({
    where: {
      userId,
    },
    include: {
      terms: true,
    },
  })
  return decks
}

export const decksByCategory = async (userId: number, categoryName: string) => {
  const decks = await prisma.deck.findMany({
    where: {
      userId,
      categories: {
        some: {
          name: categoryName,
        },
      },
    },
    include: {
      terms: true,
      categories: true,
    },
  })
  return decks
}

export const deckById = async (userId: number, deckId: number) => {
  const deck = await prisma.deck.findUnique({
    include: {
      terms: {
        include: {
          definitions: true,
          examples: true,
        },
      },
      categories: true,
    },
    where: {
      userId,
      id: deckId,
    },
  })
  return deck
}

export const userFromCookie = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return decoded
  } catch {
    return null
  }
}

export const userInfoById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  return { username: user?.username ?? String(userId) }
}
