import prisma from "@/lib/prisma"

export const allCategories = async () => {
  const categories = await prisma.category.findMany({
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

export const allDecks = async () => {
  const decks = await prisma.deck.findMany({
    include: {
      terms: true,
    },
  })
  return decks
}

export const deckById = async (deckId: number) => {
  const deck = await prisma.deck.findUnique({
    include: {
      terms: {
        include: {
          definitions: true,
          examples: true,
        },
      },
    },
    where: {
      id: deckId,
    },
  })
  return deck
}
