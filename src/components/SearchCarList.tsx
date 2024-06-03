'use client';

import React, { useState, useEffect, useCallback,Suspense  } from 'react';
import CarList from './CarList';
import CarSearchForm from './CarSearchForm';
import { CarWithDeps } from '@/types/prismaTypes';
import styles from '@/components/CarSearchForm.module.css';

const fetchCars = async (): Promise<CarWithDeps[]> => {
  const response = await fetch('/apis/cars');
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }
  return response.json();
};

const SearchCarList: React.FC = () => {
  const [cars, setCars] = useState<CarWithDeps[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarWithDeps[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getCars = useCallback(async () => {
    try {
      const carList = await fetchCars();
      setCars(carList);
      setFilteredCars(carList); // Initially show all cars
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }, []);

  useEffect(() => {
    getCars();
  }, [getCars]);

  const handleSearchResult = useCallback((filteredCars: CarWithDeps[]) => {
    setFilteredCars(filteredCars);
  }, []);

  return (
    <div>
      <CarSearchForm cars={cars} onSearchResult={handleSearchResult} />
      <div className={styles.carListContainer}>
      <Suspense fallback={<div>Loading...</div>}>
        <CarList cars={filteredCars} />
        </Suspense>
      </div>
    </div>
  );
};

export default SearchCarList;
