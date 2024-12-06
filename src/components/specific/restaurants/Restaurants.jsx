import React, { useState, useRef, useEffect } from 'react';
import styles from './Restaurants.module.css';
import RestaurantList from './RestaurantList';
import RestaurantForm from './RestaurantForm';
import { useAppContext } from '../../../context/AppContext';

const Restaurants = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { selectedRestaurant: contextRestaurant, setSelectedRestaurant: setGlobalRestaurant } = useAppContext();
  const listRef = useRef();

  // Sincronizar con el contexto al montar
  useEffect(() => {
    if (contextRestaurant) {
      setSelectedRestaurant(contextRestaurant);
    }
  }, [contextRestaurant]);

  const handleRestaurantSelect = (restaurant) => {
    console.log('Restaurant selected:', restaurant);
    setSelectedRestaurant(restaurant);
    setGlobalRestaurant(restaurant);
  };

  const handleRestaurantSaved = (savedRestaurant) => {
    console.log('Restaurant saved:', savedRestaurant);
    setSelectedRestaurant(null);
    setGlobalRestaurant(null);
    if (listRef.current) {
      listRef.current.fetchRestaurants();
    }
  };

  const handleRestaurantDeleted = () => {
    console.log('Restaurant deleted');
    setSelectedRestaurant(null);
    setGlobalRestaurant(null);
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
