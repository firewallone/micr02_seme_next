import { CarWithDeps } from '@/types/prismaTypes';
import CarItem from './CarItem';
import styles from './CarList.module.css';

const CarList = ({ cars }: { cars: CarWithDeps[] }) => {
  return (
    <div className={styles.carList}>
      {cars.map((car) => (
        <CarItem key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;
