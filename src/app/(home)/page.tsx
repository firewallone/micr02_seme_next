import styles from './HomePage.module.css';
import CarList from '@/components/CarList';
import prisma from '@/utils/prisma';
import Link from 'next/link';
import CarSearchForm from '@/components/CarSearchForm';

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
    },
  });
  return cars;
};

// eslint-disable-next-line @next/next/no-async-client-component
const HomePage = async () => {
  const cars = await getCars();
  
  const handleSearch = (query: string) => {
    // Handle search functionality here
    console.log('Search query:', query);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>My Car App</h1>
        <Link href="/car/new" className={styles.addButton}>
          Add New Car
        </Link>
      </header>
      <main className={styles.mainContent}>
      <div className={styles.title}>
      </div>
        <div className={styles.title}>List</div>
        <div className={styles.carListContainer}>
          <CarList cars={cars} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
