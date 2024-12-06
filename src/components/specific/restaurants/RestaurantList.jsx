import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styles from './RestaurantList.module.css';
import { Card, Title } from '../../common';

const RestaurantList = forwardRef(({ onSelectRestaurant }, ref) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/restaurants');
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

  useImperativeHandle(ref, () => ({
    fetchRestaurants
  }));

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const renderStatus = (status) => {
    const statusClass = status === 'open' ? styles.statusOpen : styles.statusClosed;
    return <span className={`${styles.status} ${statusClass}`}>{status}</span>;
  };

  const renderRating = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <Card>
      <Title>Restaurant List</Title>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant.id}
                onClick={() => onSelectRestaurant(restaurant)}
                className={styles.tableRow}
              >
                <td>{restaurant.name}</td>
                <td>{restaurant.cuisine}</td>
                <td>{restaurant.address}</td>
                <td>{restaurant.phone}</td>
                <td>{renderStatus(restaurant.status)}</td>
                <td>{renderRating(restaurant.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.totalCount}>
        Total Restaurants: {restaurants.length}
      </div>
    </Card>
  );
});

RestaurantList.displayName = 'RestaurantList';

export default RestaurantList;
