import React, { useState, useEffect } from 'react';
import './RestaurantSelector.css';
import { Card, Title } from '../../common';
import { useAppContext } from '../../../context/AppContext';

const RestaurantSelector = () => {
  const { selectedRestaurant, setSelectedRestaurant } = useAppContext();
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

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  if (loading) {
    return <div>Loading restaurants...</div>;
  }

  if (error) {
    return <div className="table-restaurant-error">{error}</div>;
  }

  return (
    <Card>
      <Title>Select Restaurant</Title>
      <div className="table-restaurant-list">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`table-restaurant-item ${
              selectedRestaurant?.id === restaurant.id ? 'table-restaurant-selected' : ''
            }`}
            onClick={() => handleRestaurantClick(restaurant)}
          >
            <div className="table-restaurant-name">{restaurant.name}</div>
            <div className="table-restaurant-info">
              <span className="table-restaurant-cuisine">{restaurant.cuisine}</span>
              <span className={`table-restaurant-status status-${restaurant.status}`}>
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
