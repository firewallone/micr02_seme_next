import prisma from '@/utils/prisma'
import CarList from '@/components/CarList'

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true
    }
  });
  return cars;
}

const HomePade = async () => {
  const cars = await getCars()
  return
  (
    <div>
      Home page
      </CarList cars={cars}>
    </div>
  )
}