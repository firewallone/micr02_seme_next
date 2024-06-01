import prisma from '@/utils/prisma';
import Link from 'next/link';
import styles from './CarDetail.module.css';

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: { id },
    include: { model: true, brand: true },
  });
  return car;
};

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>Home</Link>
      </header>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>{car?.brand.name} {car?.model.name}</h1>
        <p>{car?.description}</p>
      </main>
    </div>
  );
};

export default CarDetailPage;
