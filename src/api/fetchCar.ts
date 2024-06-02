import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req.query;

  if (!query) {
    const cars = await prisma.car.findMany({
      include: { brand: true, model: true },
    });
    res.status(200).json(cars);
    return;
  }

  const queryString = String(query);

  const cars = await prisma.car.findMany({
    where: {
      OR: [
        { description: { contains: queryString } },
        { location: { contains: queryString } },
        { color: { contains: queryString } },
        { brand: { name: { contains: queryString } } },
        { model: { name: { contains: queryString } } },
        { year: { equals: parseInt(queryString) } },
        { price: { equals: parseFloat(queryString) } },
      ],
    },
    include: { brand: true, model: true },
  });

  res.status(200).json(cars);
};

export default handler;
