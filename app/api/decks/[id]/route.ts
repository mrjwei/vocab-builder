import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: number } }
) => {
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
      id: Number((await params).id),
    },
  })
  return NextResponse.json(deck)
}
