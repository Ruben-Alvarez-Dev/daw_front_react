import React, { useState, useRef } from 'react';
import styles from './Restaurants.module.css';
import RestaurantList from './RestaurantList';
import RestaurantForm from './RestaurantForm';

const Restaurants = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const listRef = useRef();

  const handleRestaurantSelect = (restaurant) => {
    console.log('Restaurant selected:', restaurant);
    setSelectedRestaurant(restaurant);
  };

  const handleRestaurantSaved = (savedRestaurant) => {
    console.log('Restaurant saved:', savedRestaurant);
    setSelectedRestaurant(null);
    if (listRef.current) {
      listRef.current.fetchRestaurants();
    }
  };

  const handleRestaurantDeleted = () => {
    console.log('Restaurant deleted');
    setSelectedRestaurant(null);
    if (listRef.current) {
      listRef.current.fetchRestaurants();
    }
  };

  return (
    <div className={styles.restaurantsContainer}>
      <div className={styles.listSection}>
        <RestaurantList 
          ref={listRef}
          onSelectRestaurant={handleRestaurantSelect} 
        />
      </div>
      <div className={styles.formSection}>
        <RestaurantForm
          selectedRestaurant={selectedRestaurant}
          onRestaurantSaved={handleRestaurantSaved}
          onRestaurantDeleted={handleRestaurantDeleted}
        />
      </div>
    </div>
  );
};

export default Restaurants;
