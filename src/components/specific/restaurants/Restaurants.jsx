import React, { useState, useEffect } from 'react';
import './Restaurants.css';
import RestaurantList from './RestaurantList';
import RestaurantForm from './RestaurantForm';
import { useAppContext } from '../../../context/AppContext';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedRestaurant, setSelectedRestaurant } = useAppContext();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/restaurants');
      if (!response.ok) {
        throw new Error('Failed to load restaurants');
      }
      const data = await response.json();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantSaved = async () => {
    setSelectedRestaurant(null);
    await fetchRestaurants();
  };

  const handleRestaurantDeleted = async () => {
    setSelectedRestaurant(null);
    await fetchRestaurants();
  };

  if (loading) {
    return <div className="restaurants-message">Loading restaurants...</div>;
  }

  if (error) {
    return <div className="restaurants-error">{error}</div>;
  }

  return (
    <div className="restaurants-container">
      <div className="list-section">
        <RestaurantList 
          restaurants={restaurants}
          onSelectRestaurant={() => {}} 
        />
      </div>
      <div className="form-section">
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
