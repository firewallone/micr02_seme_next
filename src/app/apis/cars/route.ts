import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prismaClient';
import { NextResponse } from 'next/server';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fetchCar = await prisma.car.findMany({
      include: {
        model: true,
        brand: true,
      },
    });
    return NextResponse.json(fetchCar); 
  } catch (error) {
    return NextResponse.error();
  }
};