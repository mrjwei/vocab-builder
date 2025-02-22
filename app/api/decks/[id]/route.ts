import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
  const deck = await prisma.deck.findUnique({
    include: {
      terms: true,
    },
    where: {
      id: Number(params.id),
    },
  })
  return NextResponse.json(deck)
}
