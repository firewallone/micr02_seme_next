import styles from './home.module.css';
import CarList from '@/components/CarList'
import prisma from '@/utils/prisma'

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
    },
  })
  return cars
}

const HomePage = async () => {
  const cars = await getCars();
  return (
    <div className={`${styles.homePage} container`}>
      <div className={styles.header}>
        <h1>Home Page</h1>
      </div>
      <hr className={styles.divider} />
      <div className={styles.carList}>
        <CarList cars={cars} />
      </div>
    </div>
  );
};

export default HomePage;
