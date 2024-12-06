import React from 'react';
import RestaurantsComponent from '../../components/specific/restaurants/Restaurants';
import styles from './Restaurants.module.css';

const RestaurantsPage = () => {
  return (
    <div className={styles.restaurantsPage}>
      <h1>Gestión de Restaurantes</h1>
      <RestaurantsComponent />
    </div>
  );
};

export default RestaurantsPage;
