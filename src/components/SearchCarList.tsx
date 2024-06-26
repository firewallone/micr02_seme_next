"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import CarList from "./CarList";
import CarSearchForm from "./CarSearchForm";
import { CarWithDeps } from "@/types/prismaTypes";
import styles from "@/components/CarSearchForm.module.css";

const fetchCars = async (): Promise<CarWithDeps[]> => {
  const response = await fetch("/apis/cars");
  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  return response.json();
};

const SearchCarList: React.FC = () => {
  const [cars, setCars] = useState<CarWithDeps[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarWithDeps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCars = useCallback(async () => {
    try {
      const carList = await fetchCars();
      setCars(carList);
      setFilteredCars(carList); // Initially show all cars
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCars();
  }, [getCars]);

  const handleSearchResult = useCallback((filteredCars: CarWithDeps[]) => {
    setFilteredCars(filteredCars);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <CarSearchForm cars={cars} onSearchResult={handleSearchResult} />
      <div className={styles.carListContainer}>
        <CarList cars={filteredCars} />
      </div>
    </div>
  );
};

export default SearchCarList;
