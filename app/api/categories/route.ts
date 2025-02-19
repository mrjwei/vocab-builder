import {NextResponse} from 'next/server';
import prisma from '@/lib/prisma';

export const GET = async () => {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories)
}

