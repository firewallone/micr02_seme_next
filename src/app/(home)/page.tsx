import CarList from "@/components/CarList";
import prisma from "@/utils/prismaClient";
import styles from "./HomePage.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense } from "react";

const SearchCarList = dynamic(() => import("@/components/SearchCarList"), {
  ssr: false,
});

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
    },
  });
  return cars;
};

const HomePage = async () => {
  const cars = await getCars();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>My Car App</h1>
          <Link href="/car/new" className={styles.addButton}>
            Add New Car
          </Link>
        </header>
        <main className={styles.mainContent}>
          <div className={styles.title}></div>
          <div className={styles.title}>List</div>
          <div className={styles.carListContainer}>
            <SearchCarList />
          </div>
        </main>
      </div>
    </Suspense>
  );
};

export default HomePage;
