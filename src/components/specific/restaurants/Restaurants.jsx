import React from 'react';
import styles from './Restaurants.module.css';
import { Card, Title, List } from '../../common';

const Restaurants = () => {
  return (
    <div className={styles.restaurantsContainer}>
      <Card>
        <Title>Restaurants Management</Title>
        {/* Aquí irá el contenido específico de restaurantes */}
      </Card>
    </div>
  );
};

export default Restaurants;
