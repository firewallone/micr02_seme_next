import { CarWithDeps } from '@/types/prismaTypes';
import Link from 'next/link';
import styles from './CarItem.module.css';

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <Link href={`car/${car.id}`} className={styles.linkButton}>
      <div className={styles.carItem}>{car.model.name}</div>
    </Link>
  );
};

export default CarItem;
