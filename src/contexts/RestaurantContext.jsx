import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';

const RestaurantContext = createContext();

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurantContext must be used within a RestaurantProvider');
  }
  return context;
};

export const RestaurantProvider = ({ children }) => {
  // Estado local
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  // Obtener setSelectedRestaurant del AppContext para mantener sincronizado
  const { setSelectedRestaurant: setAppSelectedRestaurant } = useAppContext();

  // Función para mantener sincronizado el restaurante seleccionado en ambos contextos
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setAppSelectedRestaurant(restaurant);
  };

  const value = {
    selectedRestaurant,
    setSelectedRestaurant: handleSelectRestaurant,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContext;
