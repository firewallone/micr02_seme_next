import { Car } from '@prisma/client'

const CarItem = ({ car }: { car: Car }) => {
  return <div>{car.id}</div>
}

export default CarItem
