import prisma from '@/utils/prismaClient';
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
        <table className={styles.detailTable}>
          <tbody>
            <tr>
              <th>Brand</th>
              <td>{car?.brand.name}</td>
            </tr>
            <tr>
              <th>Model</th>
              <td>{car?.model.name}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>{car?.description}</td>
            </tr>
            <tr>
              <th>Location</th>
              <td>{car?.location}</td>
            </tr>
            <tr>
              <th>Price</th>
              <td>$ {car?.price}</td>
            </tr>
            <tr>
              <th>Color</th>
              <td>{car?.color}</td>
            </tr>
            <tr>
              <th>Year</th>
              <td>{car?.year}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default CarDetailPage;
