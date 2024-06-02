'use client'
import { useState } from 'react';
import styles from './CarSearchForm.module.css';

const CarSearchForm = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search cars..."
        className={styles.input}
      />
      <button onClick={handleSearch} className={styles.button}>Search</button>
    </div>
  );
};

export default CarSearchForm;
