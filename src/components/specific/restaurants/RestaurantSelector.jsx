import React, { useState, useEffect } from 'react';
import { Title, Select } from '../../common';
import { useAppContext } from '../../../context/AppContext';
import './RestaurantSelector.css';

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
        throw new Error('Failed to fetch restaurants');
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

  const handleRestaurantChange = (e) => {
    const restaurantId = e.target.value;
    const selected = restaurants.find(r => r.id === parseInt(restaurantId));
    setSelectedRestaurant(selected || null);
  };

  return (
    <div className="selector-container">
      <Title>Restaurant</Title>
      
      {loading ? (
        <div className="selector-message">Loading restaurants...</div>
      ) : error ? (
        <div className="selector-error">{error}</div>
      ) : (
        <div className="select-wrapper">
          <Select
            value={selectedRestaurant?.id || ''}
            onChange={handleRestaurantChange}
            label="Select Restaurant"
          >
            <option value="">Select a restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </Select>
        </div>
      )}
    </div>
  );
};

export default RestaurantSelector;
