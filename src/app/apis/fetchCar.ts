import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prismaClient';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fetchCar = await prisma.car.findMany({
      include: {
        model: true,
        brand: true,
      },
    });
    res.status(200).json(fetchCar);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
};

export default handler;