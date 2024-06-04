// components/CarSearchForm.tsx

import React, { useState, useEffect } from "react";
import { CarWithDeps } from "@/types/prismaTypes";

interface CarSearchFormProps {
  cars: CarWithDeps[];
  onSearchResult: (filteredCars: CarWithDeps[]) => void;
}

const CarSearchForm: React.FC<CarSearchFormProps> = ({
  cars,
  onSearchResult,
}) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = cars.filter(
      (car) =>
        car.brand.name.toLowerCase().includes(lowercasedQuery) ||
        car.model.name.toLowerCase().includes(lowercasedQuery),
    );
    onSearchResult(filtered);
  }, [query, cars, onSearchResult]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search by brand or model"
      />
    </form>
  );
};

export default CarSearchForm;
