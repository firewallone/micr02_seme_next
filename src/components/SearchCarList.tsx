'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CarList from './CarList';
import CarSearchForm from './CarSearchForm';
import { CarWithDeps } from '@/types/prismaTypes';
import styles from '@/components/CarSearchForm.module.css';

const fetchCars = async (): Promise<CarWithDeps[]> => {
  const response = await fetch('/apis/fetchCars');
  if (!response.ok) {
    throw new Error('Failed to fetch cars');
  }
  return response.json();
};

const SearchCarList: React.FC = () => {
  const [cars, setCars] = useState<CarWithDeps[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarWithDeps[]>([]);

  const getCars = useCallback(async () => {
    try {
      const carList = await fetchCars();
      setCars(carList);
      setFilteredCars(carList); // Initially show all cars
    } catch (error) {
      console.error(error);
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
        <CarList cars={filteredCars} />
      </div>
    </div>
  );
};

export default SearchCarList;
