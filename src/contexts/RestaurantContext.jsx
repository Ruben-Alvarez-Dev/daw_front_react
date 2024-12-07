import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const RestaurantContext = createContext();

const API_URL = 'http://localhost:3000';

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within a RestaurantContextProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch restaurants
  const fetchRestaurants = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/restaurants`);
      if (!response.ok) throw new Error('Failed to fetch restaurants');
      const data = await response.json();
      setRestaurants(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load restaurants on mount
  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Create restaurant
  const createRestaurant = useCallback(async (restaurantData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/restaurants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });
      if (!response.ok) throw new Error('Failed to create restaurant');
      const newRestaurant = await response.json();
      setRestaurants(prev => [...prev, newRestaurant]);
      setSelectedRestaurant(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error creating restaurant:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update restaurant
  const updateRestaurant = useCallback(async (id, restaurantData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/restaurants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantData),
      });
      if (!response.ok) throw new Error('Failed to update restaurant');
      const updatedRestaurant = await response.json();
      setRestaurants(prev => 
        prev.map(restaurant => 
          restaurant.id === id ? updatedRestaurant : restaurant
        )
      );
      setSelectedRestaurant(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating restaurant:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete restaurant
  const deleteRestaurant = useCallback(async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/restaurants/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete restaurant');
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
      setSelectedRestaurant(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting restaurant:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    loading,
    error,
    fetchRestaurants
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
