import React, { useState, useEffect } from 'react';
import styles from './RestaurantSelector.module.css';
import { Card, Title } from '../../common';

const RestaurantSelector = ({ onSelectRestaurant, selectedRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/restaurants');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <Card>
      <Title>Select Restaurant</Title>
      <div className={styles.restaurantList}>
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`${styles.restaurantItem} ${
              selectedRestaurant?.id === restaurant.id ? styles.selected : ''
            }`}
            onClick={() => onSelectRestaurant(restaurant)}
          >
            <div className={styles.restaurantName}>{restaurant.name}</div>
            <div className={styles.restaurantInfo}>
              <span className={styles.cuisine}>{restaurant.cuisine}</span>
              <span className={`${styles.status} ${styles[restaurant.status]}`}>
                {restaurant.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RestaurantSelector;
