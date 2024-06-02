import { CarWithDeps } from '@/types/prismaTypes';
import Link from 'next/link';
import styles from './CarItem.module.css';

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined);
};

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <Link href={`car/${car.id}`} className={styles.linkButton}>
      <div className={styles.carItem}>{car.brand.name} {car.model.name} {formatDate(car.createdAt)}</div>
    </Link>
  );
};

export default CarItem;
