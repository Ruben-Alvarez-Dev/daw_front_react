import React, { createContext, useContext, useState, useCallback } from 'react';
import { userService } from '../services/users';

const AppContext = createContext();

// Mock data for restaurants
const mockRestaurants = [
  {
    id: 1,
    name: "Restaurant One",
    address: "123 Main St",
    phone: "123-456-7890",
    status: "open"
  },
  {
    id: 2,
    name: "Restaurant Two",
    address: "456 Oak Ave",
    phone: "098-765-4321",
    status: "closed"
  },
  {
    id: 3,
    name: "Restaurant Three",
    address: "789 Pine Rd",
    phone: "555-555-5555",
    status: "temporarily_closed"
  }
];

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  // User state
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Restaurant state
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  // Common state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // User functions
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = useCallback(async (userData) => {
    try {
      setLoading(true);
      const newUser = await userService.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id, userData) => {
    try {
      setLoading(true);
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id) => {
    try {
      setLoading(true);
      await userService.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
      setSelectedUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Restaurant functions
  const createRestaurant = useCallback((restaurantData) => {
    const newRestaurant = {
      id: restaurants.length + 1,
      ...restaurantData
    };
    setRestaurants(prev => [...prev, newRestaurant]);
    setSelectedRestaurant(null);
  }, [restaurants]);

  const updateRestaurant = useCallback((id, restaurantData) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === id ? { ...restaurant, ...restaurantData } : restaurant
      )
    );
    setSelectedRestaurant(null);
  }, []);

  const deleteRestaurant = useCallback((id) => {
    setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
    setSelectedRestaurant(null);
  }, []);

  const value = {
    // User context
    users,
    selectedUser,
    setSelectedUser,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,

    // Restaurant context
    restaurants,
    selectedRestaurant,
    setSelectedRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,

    // Common state
    loading,
    error
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
