import React, { createContext, useContext, useState, useCallback } from 'react';

const RestaurantContext = createContext();

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [restaurantFilters, setRestaurantFilters] = useState({
    category: '',
    status: '',
    search: ''
  });

  const fetchRestaurants = useCallback(async () => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/restaurants');
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  }, []);

  const createRestaurant = useCallback(async (restaurantData) => {
    try {
      // TODO: Implement API call
      const response = await fetch('/api/restaurants', {
        method: 'POST',
        body: JSON.stringify(restaurantData),
      });
      const newRestaurant = await response.json();
      setRestaurants(prev => [...prev, newRestaurant]);
      return newRestaurant;
    } catch (error) {
      console.error('Error creating restaurant:', error);
      throw error;
    }
  }, []);

  const updateRestaurant = useCallback(async (restaurantId, restaurantData) => {
    try {
      // TODO: Implement API call
      const response = await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'PUT',
        body: JSON.stringify(restaurantData),
      });
      const updatedRestaurant = await response.json();
      setRestaurants(prev => prev.map(restaurant => 
        restaurant.id === restaurantId ? updatedRestaurant : restaurant
      ));
      return updatedRestaurant;
    } catch (error) {
      console.error('Error updating restaurant:', error);
      throw error;
    }
  }, []);

  const deleteRestaurant = useCallback(async (restaurantId) => {
    try {
      // TODO: Implement API call
      await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE',
      });
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== restaurantId));
      if (selectedRestaurant?.id === restaurantId) {
        setSelectedRestaurant(null);
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      throw error;
    }
  }, [selectedRestaurant?.id]);

  const filterRestaurants = useCallback((filters) => {
    setRestaurantFilters(prev => ({ ...prev, ...filters }));
  }, []);

  const value = {
    restaurants,
    selectedRestaurant,
    restaurantFilters,
    setSelectedRestaurant,
    fetchRestaurants,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    filterRestaurants,
  };

  return <RestaurantContext.Provider value={value}>{children}</RestaurantContext.Provider>;
};

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider');
  }
  return context;
};

export default RestaurantContext;
