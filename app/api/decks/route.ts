import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async () => {
  const decks = await prisma.deck.findMany()
  return NextResponse.json(decks)
}
