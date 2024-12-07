import React, { useState, useEffect } from 'react';
import { Title, Select, Card } from '../../common';
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

  if (loading) {
    return (
      <Card
        card-header={<Title>Select Restaurant</Title>}
        card-body={<div className="selector-message">Loading restaurants...</div>}
        card-footer={<div>Loading...</div>}
      />
    );
  }

  if (error) {
    return (
      <Card
        card-header={<Title>Select Restaurant</Title>}
        card-body={<div className="selector-error">{error}</div>}
        card-footer={<div>Error loading restaurants</div>}
      />
    );
  }

  const header = (
    <Title>Select Restaurant</Title>
  );

  const body = (
    <div className="selector-content">
      <Select
        value={selectedRestaurant?.id || ''}
        onChange={(e) => {
          const restaurantId = e.target.value;
          const selected = restaurants.find(r => r.id === parseInt(restaurantId));
          setSelectedRestaurant(selected || null);
        }}
      >
        <option value="">Select a restaurant</option>
        {restaurants.map(restaurant => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </Select>
    </div>
  );

  const footer = (
    <div className="selector-info">
      {selectedRestaurant ? (
        <div>
          <p>Selected: {selectedRestaurant.name}</p>
          <p>Location: {selectedRestaurant.location}</p>
        </div>
      ) : (
        <p>No restaurant selected</p>
      )}
    </div>
  );

  return (
    <Card
      card-header={header}
      card-body={body}
      card-footer={footer}
    />
  );
};

export default RestaurantSelector;
