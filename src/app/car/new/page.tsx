import NewCarForm from "@/components/NewCarForm";
import prisma from "@/utils/prismaClient";
import Link from "next/link";
import styles from "./NewCar.module.css";

const fetchBrands = async () => {
  const brands = await prisma.brand.findMany();
  return brands;
};

const fetchModels = async () => {
  const models = await prisma.carModel.findMany();
  return models;
};

const NewCarPage = async () => {
  const brands = await fetchBrands();
  const models = await fetchModels();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backButton}>
          Home
        </Link>
      </header>
      <main className={styles.mainContent}>
        <h1 className={styles.title}>New Car</h1>
        <NewCarForm brands={brands} models={models} />
      </main>
    </div>
  );
};

export default NewCarPage;
