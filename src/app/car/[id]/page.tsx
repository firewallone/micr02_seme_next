import prisma from '@/utils/prisma'
import Link from 'next/link'

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  })
  return car
}

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id);

  return (
    <div className={`${styles.carDetailPage} container`}>
      <Link href="/" className={styles.link}>Home</Link>
      <div className={styles.header}>
        <h1>{car?.brand.name} {car?.model.name}</h1>
      </div>
      <div className={styles.detail}>
        <div><strong>Brand:</strong> {car?.brand.name}</div>
        <div><strong>Model:</strong> {car?.model.name}</div>
        <div><strong>Description:</strong> {car?.description}</div>
      </div>
    </div>
  );
};
export default CarDetailPage
